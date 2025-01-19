const { formidable } = require('formidable');
const fs = require('fs');
const path = require('path');
const newsModel = require('../models/newsModel');
const authModel = require('../models/authModel');
const galleryModel = require('../models/galleryModel');
const { mongo: { ObjectId } } = require('mongoose');
const moment = require('moment');

class newsControllers {

    add_news = async (req, res) => {
        const { id, name } = req.userInfo;
        const form = formidable({ multiples: true });

        try {
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    return res.status(400).json({ message: 'Form parsing error' });
                }

                const { title, description, bigCategory, category } = fields;
                if (!files.image || files.image.length === 0) {
                    return res.status(400).json({ message: 'Resim dosyası gerekli' });
                }
                const image = files.image[0];

                // Define the upload path
                const uploadDir = path.join(__dirname, '..', 'client', 'src', 'assets', 'news_images');
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }

                // Generate a unique filename
                const fileName = `${Date.now()}-${image.originalFilename}`;
                const filePath = path.join(uploadDir, fileName);

                // Move the file to the upload directory
                fs.renameSync(image.filepath, filePath);

                // Generate the URL for the uploaded image
                const imageUrl = `/src/assets/news_images/${fileName}`;

                const news = await newsModel.create({
                    writerId: id,
                    writerName: name,
                    title: title[0].trim(),
                    slug: title[0].trim().split(' ').join('-'),
                    category: category[0].trim(),
                    bigCategory: bigCategory[0].trim(),
                    description: description[0].trim(),
                    date: moment().format('LL'),
                    image: imageUrl,
                    status: 'onayBekliyor'
                });

                return res.status(201).json({ message: 'Haber Başarıyla Eklendi', news });
            });
        } catch (error) {
            return res.status(500).json({ message: 'Sunucu Hatası' });
        }
    };
    //End Method 

    get_images = async (req, res) => {
        const { id } = req.userInfo;
        try {
            const images = await newsModel.find({ writerId: id }).select('image');
            return res.status(200).json({ images });
        } catch (error) {
            return res.status(500).json({ message: 'Sunucu Hatası' });
        }
    };

    get_dashboard_news = async (req, res) => {
        const { id, role } = req.userInfo;
        try {
            let news;
            if (role === 'admin') {
                news = await newsModel.find().sort({ createdAt: -1 });
            } else {
                news = await newsModel.find({ writerId: id }).sort({ createdAt: -1 });
            }
            return res.status(200).json({ news });
        } catch (error) {
            return res.status(500).json({ message: 'Sunucu Hatası' });
        }
    };

    get_edit_dashboard_news = async (req, res) => {
        const { news_id } = req.params;
        try {
            const news = await newsModel.findById(news_id);
            return res.status(200).json({ news });
        } catch (error) {
            return res.status(500).json({ message: 'Sunucu Hatası' });
        }
    };

    update_news = async (req, res) => {
        const { news_id } = req.params;
        const form = formidable({ multiples: true });

        try {
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    return res.status(400).json({ message: 'Form parsing error' });
                }
                console.log(fields);


                const { title, description, category, bigCategory, status } = fields;
                let imageUrl = '';

                if (files.image && files.image.length > 0) {
                    const image = files.image[0];
                    const uploadDir = path.join(__dirname, '..', 'client', 'src', 'assets', 'news_images');
                    if (!fs.existsSync(uploadDir)) {
                        fs.mkdirSync(uploadDir, { recursive: true });
                    }

                    const fileName = `${Date.now()}-${image.originalFilename}`;
                    const filePath = path.join(uploadDir, fileName);

                    fs.copyFileSync(image.filepath, filePath);
                    imageUrl = `/src/assets/news_images/${fileName}`;
                }

                const news = await newsModel.findByIdAndUpdate(news_id, {
                    title: title[0].trim(),
                    slug: title[0].trim().split(' ').join('-'),
                    description: description[0].trim(),
                    image: imageUrl,
                    category: category[0].trim(),
                    bigCategory: bigCategory[0].trim(),
                    status: status[0].trim()
                });

                return res.status(200).json({ message: 'Haber Başarıyla Güncellendi', news });
            });
        } catch (error) {
            return res.status(500).json({ message: 'Sunucu Hatası' });
        }
    };

    delete_news = async (req, res) => {
        const { news_id } = req.params;
        try {
            await newsModel.findByIdAndDelete(news_id);
            return res.status(200).json({ message: 'Haber Başarıyla Silindi' });
        } catch (error) {
            return res.status(500).json({ message: 'Sunucu Hatası' });
        }
    };

    update_news_status = async (req, res) => {
        const{role} = req.userInfo;
        const { news_id } = req.params;
        const { status } = req.body;
        try {
            if(role === 'admin'){
                const news = await newsModel.findByIdAndUpdate(news_id, { status });
                return res.status(200).json({ message: 'Haber Durumu Güncellendi', news });
            }
            return res.status(401).json({ message: 'Yetkiniz yok' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Sunucu Hatası' });
        }
    };

    get_all_news = async (req,res) => {

        try {
            const category_news = await newsModel.aggregate([
                {
                    $sort: { createdAt: -1 }
                },
                {
                    $match: {
                        status: 'active'
                    }
                },
                {
                    $group: {
                        _id: "$category",
                        news: {
                            $push: {
                                _id: '$_id',
                                title: '$title',
                                slug: '$slug',
                                writerName: '$writerName',
                                image: '$image',
                                description: '$description',
                                date: '$date',
                                category: '$category',
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: '$_id',
                        news: {
                            $slice: ['$news', 5]
                        }
                    }
                }
            ])
     
        const news = {}
        for (let i = 0; i < category_news.length; i++) {
            news[category_news[i].category] = category_news[i].news 
        }
        return res.status(200).json({ news }) 
    
        } catch (error) {
            return res.status(500).json({message: 'Internal server Error'})
        } 
        
    }
    //End Method 
    
    get_categories = async(req,res) => {
    
        try {
            const categories = await newsModel.aggregate([
                {
                    $group: {
                        _id: '$category',
                        count: {$sum: 1}
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: "$_id", 
                        count: 1
                    }
                }
            ])
            return res.status(200).json({categories})
        } catch (error) {
            return res.status(500).json({message: 'Internal server Error'})
        }
    
    }
    
    //End Method 
    
    
    get_details_news = async (req, res) => {
        const { slug } = req.params
    
        try {
         const news = await newsModel.findOneAndUpdate({ slug } , {
            $inc: { count:1 }
         }, { new: true})
    
         const relatedNews = await newsModel.find({
            $and: [
                {
                    slug: {
                        $ne: slug
                    }
                }, {
                    category: {
                        $eq: news.category
                    }
                }
            ]
         }).limit(4).sort({ createAt: -1 })
    
            return res.status(200).json({ news: news ? news: {}, relatedNews})
    
        } catch (error) {
            return res.status(500).json({message: 'Internal server Error'})
        }
         
    }
    //End Method 
    
    get_category_news = async (req, res) => {
        const {category} =  req.params
    
        try {
            const news = await newsModel.find({
                $and: [
                    {
                        category: {
                            $eq: category
                        }
                    },
                    {
                        status: {
                            $eq: 'active'
                        }
                    }
                ]
            })
    
            return res.status(201).json({ news })
        } catch (error) {
            return res.status(500).json({message: 'Internal server Error'})
        }
        
    }
    //End Method 
    
    get_popular_news = async (req, res) => {
    
        try {
            const popularNews = await newsModel.find({ status: 'active' }).sort({count: -1 }).limit(4)
            return res.status(200).json({ popularNews })
        } catch (error) {
            return res.status(500).json({message: 'Internal server Error'})
        }
    
    }
    //End Method 
    
    get_latest_news = async (req, res) => {
        try {
            const news = await newsModel.find({ status: 'active' }).sort({createdAt: -1 }).limit(5)
            return res.status(200).json({ news })
        } catch (error) {
            return res.status(500).json({message: 'Internal server Error'})
        }
    }
    //End Method 
    
    get_recent_news = async (req, res) => {
        try {
            const news = await newsModel.find({ status: 'active' }).sort({createdAt: -1 }).skip(6).limit(5)
            return res.status(200).json({ news })
        } catch (error) {
            return res.status(500).json({message: 'Internal server Error'})
        }
    }
    //End Method 
    
    get_images_news = async (req, res) => {
    
        try {
            const images = await newsModel.aggregate([
                {
                    $match:{
                        status: 'active'
                    }
                },
                {
                    $sample: {
                        size: 9
                    }
                },
                {
                    $project: {
                        image: 1
                    }
                }
            ])
            return res.status(200).json({ images })
        } catch (error) {
            return res.status(500).json({message: 'Internal server Error'})
        }
    
    }
    //End Method 
    
    news_search = async (req, res) => {
        const { value } =  req.query;
    
        try {
            if (!value) {
                return res.status(400).json({ message: 'Search value is required'})
            }
    
            const news = await newsModel.find({
                status: 'active',
                title: { $regex: value, $options: 'i' }
            })
            return res.status(200).json({ news })
            
        } catch (error) {
            return res.status(500).json({message: 'Internal server Error'})
        }
         
    }
    
    //End Method 
    
    news_statistics = async (req, res) => {
        try {
            const totalNews = await newsModel.countDocuments();
            const pendingNews = await newsModel.countDocuments({ status: 'onayBekliyor' });
            const activeNews = await newsModel.countDocuments({ status: 'aktif' });
            const deactiveNews = await newsModel.countDocuments({ status: 'deaktif' });
            const totalWriters = await authModel.countDocuments({ role: 'yazar' });
    
            console.log('Statistics:', {
                totalNews,
                pendingNews,
                activeNews,
                deactiveNews,
                totalWriters
            });
    
            return res.status(200).json({
                totalNews,
                pendingNews,
                activeNews,
                deactiveNews,
                totalWriters
            });
        } catch (error) {
            console.error('Statistics Error:', error);
            return res.status(500).json({ 
                message: 'İstatistikler yüklenirken bir hata oluştu',
                error: error.message 
            });
        }
    };
    //End Method 


    // ...existing code...

writer_news_statistics = async (req, res) => {
    try {
        const { id } = req.userInfo;
        
        const totalNews = await newsModel.countDocuments({ writerId: id });
        const pendingNews = await newsModel.countDocuments({ writerId: id, status: 'onayBekliyor' });
        const activeNews = await newsModel.countDocuments({ writerId: id, status: 'aktif' });
        const deactiveNews = await newsModel.countDocuments({ writerId: id, status: 'deaktif' });

        return res.status(200).json({
            totalNews,
            pendingNews,
            activeNews,
            deactiveNews
        });
    } catch (error) {
        console.error('Writer Statistics Error:', error);
        return res.status(500).json({ 
            message: 'İstatistikler yüklenirken bir hata oluştu',
            error: error.message 
        });
    }
};

get_writer_news = async (req, res) => {
    try {
        const { id } = req.userInfo;
        
        const news = await newsModel.find({ writerId: id })
            .sort({ createdAt: -1 })
            .populate('writerId', 'name');

        return res.status(200).json({ news });
    } catch (error) {
        console.error('Get Writer News Error:', error);
        return res.status(500).json({ 
            message: 'Haberler yüklenirken bir hata oluştu',
            error: error.message 
        });
    }
};

// ...existing code...
    
}

module.exports = new newsControllers();