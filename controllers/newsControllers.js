const { formidable } = require('formidable');
const fs = require('fs');
const path = require('path');
const newsModel = require('../models/newsModel');
const adsModel = require('../models/adsModel');

const authModel = require('../models/authModel');
const categoryModel = require('../models/categoryModel');
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

            const { title,slug, description, bigCategory, category } = fields;
            if (!files.image || files.image.length === 0) {
                return res.status(400).json({ message: 'Resim dosyası gerekli' });
            }
            const image = files.image[0];

            // Resim için upload path oluştur
            const uploadDir = path.join(__dirname, '..', 'client', 'src', 'assets', 'news_images');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Resim dosyasını kaydet
            const fileName = `${Date.now()}-${image.originalFilename}`;
            const filePath = path.join(uploadDir, fileName);
            fs.renameSync(image.filepath, filePath);
            const imageUrl = `/src/assets/news_images/${fileName}`;

            // **Video Yükleme İşlemi**
            let videoUrl = null;
            if (files.video && files.video.length > 0) {
                const video = files.video[0];
                const videoDir = path.join(__dirname, '..', 'client', 'src', 'assets', 'news_videos');
                if (!fs.existsSync(videoDir)) {
                    fs.mkdirSync(videoDir, { recursive: true });
                }
                const videoFileName = `${Date.now()}-${video.originalFilename}`;
                const videoFilePath = path.join(videoDir, videoFileName);
                fs.renameSync(video.filepath, videoFilePath);
                videoUrl = `/src/assets/news_videos/${videoFileName}`;
            }

            const news = await newsModel.create({
                writerId: id,
                writerName: name,
                title: title[0].trim(),
                slug: slug[0].trim(),
                category: category[0].trim(),
                description: description[0].trim(),
                date: moment().format('LL'),
                image: imageUrl,
                video: videoUrl, // **Video linkini kaydet**
                status: 'onayBekliyor'
            });

            return res.status(201).json({ message: 'Haber Başarıyla Eklendi', news });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Sunucu Hatası' });
    }
};
get_popular_news_by_category = async (req, res) => {
    const { category } = req.params;
    try {
      const news = await newsModel.find({
        status: 'aktif',
        category: { $regex: new RegExp(category, "i") } // 👈 case insensitive
      })
      .sort({ count: -1 })
      .limit(5);
  
      return res.status(200).json({ news });
    } catch (error) {
      console.error("Popüler kategori haberleri hata:", error);
      return res.status(500).json({ message: 'Sunucu Hatası' });
    }
  };
update_ads = async (req, res) => {
    const { id } = req.params;
    const form = formidable({ multiples: true });
  
    try {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(400).json({ message: "Form verisi işlenemedi" });
        }
  
        let updateData = {};
  
        // Header Ads
        if (files.headerAds) {
          const image = files.headerAds[0];
          const uploadDir = path.join(__dirname, '..', 'client', 'src', 'assets', 'ads');
          if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
          const fileName = `${Date.now()}-header-${image.originalFilename}`;
          fs.renameSync(image.filepath, path.join(uploadDir, fileName));
          updateData.headerAdsImageUrl = `/src/assets/ads/${fileName}`;
        }
  
        // Banner Ads
        if (files.bannerAds) {
          const image = files.bannerAds[0];
          const uploadDir = path.join(__dirname, '..', 'client', 'src', 'assets', 'ads');
          if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
          const fileName = `${Date.now()}-banner-${image.originalFilename}`;
          fs.renameSync(image.filepath, path.join(uploadDir, fileName));
          updateData.bannerAdsImageUrl = `/src/assets/ads/${fileName}`;
        }
  
        const updatedAd = await adsModel.findByIdAndUpdate(id, updateData, { new: true });
  
        if (!updatedAd) {
          return res.status(404).json({ message: "Reklam bulunamadı" });
        }
  
        return res.status(200).json({ message: "Reklam güncellendi", ads: updatedAd });
      });
    } catch (error) {
      console.error("Reklam güncelleme hatası:", error);
      return res.status(500).json({ message: "Sunucu hatası" });
    }
  };
get_single_ad = async (req, res) => {
    const { id } = req.params;

    try {
        // Mongo ObjectId geçerli mi kontrol et
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Geçersiz ID formatı" });
        }

        const ad = await adsModel.findById(id);
        if (!ad) {
            return res.status(404).json({ message: "Reklam bulunamadı" });
        }

        return res.status(200).json({ ads: ad });
    } catch (error) {
        console.error("Reklam çekme hatası:", error);
        return res.status(500).json({ message: "Sunucu hatası" });
    }
};
edit_ads = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ message: 'Form verisi işlenemedi' });
      }

      const existingAds = await adsModel.findOne();

      let updateData = {};

      // Header Ads
      if (files.headerAdsImage) {
        const image = files.headerAdsImage[0];
        const uploadDir = path.join(__dirname, '..', 'client', 'src', 'assets', 'ads');
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        const fileName = `${Date.now()}-header-${image.originalFilename}`;
        fs.renameSync(image.filepath, path.join(uploadDir, fileName));
        updateData.headerAdsImageUrl = `/src/assets/ads/${fileName}`;
      }

      // Banner Ads
      if (files.bannerAdsImage) {
        const image = files.bannerAdsImage[0];
        const uploadDir = path.join(__dirname, '..', 'client', 'src', 'assets', 'ads');
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        const fileName = `${Date.now()}-banner-${image.originalFilename}`;
        fs.renameSync(image.filepath, path.join(uploadDir, fileName));
        updateData.bannerAdsImageUrl = `/src/assets/ads/${fileName}`;
      }

      if (!existingAds) {
        const newAds = new adsModel(updateData);
        await newAds.save();
        return res.status(201).json({ message: 'Reklam kaydı oluşturuldu', ads: newAds });
      }

      const updated = await adsModel.findByIdAndUpdate(existingAds._id, updateData, {
        new: true,
      });

      return res.status(200).json({ message: 'Reklam güncellendi', ads: updated });
    });
  };
  get_ads = async (req, res) => {
    try {
      const ads = await adsModel.findOne();
      return res.status(200).json({ ads });
    } catch (error) {
      return res.status(500).json({ message: 'Reklam verisi alınamadı' });
    }
  };
add_ads = async (req, res) => {
    const form = formidable({ multiples: true });
    try {
        form.parse(req, async (err, fields, files) => {
            if (err) return res.status(400).json({ message: "Form verisi hatalı" });

            const headerAds = files.headerAds?.[0];
            const bannerAds = files.bannerAds?.[0];

            const uploadDir = path.join(__dirname, '..', 'client', 'src', 'assets', 'ads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const saveImage = (file) => {
                const fileName = `${Date.now()}-${file.originalFilename}`;
                const filePath = path.join(uploadDir, fileName);
                fs.renameSync(file.filepath, filePath);
                return `/src/assets/ads/${fileName}`;
            };

            const newAds = {
                headerAdsImageUrl: headerAds ? saveImage(headerAds) : null,
                bannerAdsImageUrl: bannerAds ? saveImage(bannerAds) : null,
            };

            const created = await adsModel.create(newAds);
            return res.status(201).json({ message: "Reklam başarıyla eklendi", ads: created });
        });
    } catch (error) {
        console.error("Reklam ekleme hatası:", error);
        return res.status(500).json({ message: "Sunucu hatası" });
    }
};
add_category = async (req, res) => {
    try {
        const { name, slug } = req.body; // Kategori adı ve slug al

        if (!name || !slug) {
            return res.status(400).json({ message: "Kategori adı ve slug gereklidir." });
        }

        // 1️⃣ Aynı isimde kategori olup olmadığını kontrol et
        const existingCategory = await categoryModel.findOne({ $or: [{ name }, { slug }] });

        if (existingCategory) {
            return res.status(400).json({ message: "Bu kategori zaten mevcut." });
        }

        // 2️⃣ Yeni kategoriyi kaydet
        const newCategory = new categoryModel({ name, slug });
        await newCategory.save();

        return res.status(201).json({ message: "Kategori başarıyla eklendi.", category: newCategory });

    } catch (error) {
        console.error("Kategori ekleme hatası:", error);
        return res.status(500).json({ message: "Sunucu hatası." });
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
    
                const { title, slug, description, category, status, old_image, old_video } = fields;
                let imageUrl = old_image?.[0] || '';
                let videoUrl = old_video?.[0] || '';
    
                // Yeni resim yüklendiyse güncelle
                if (files.image && files.image.length > 0) {
                    const image = files.image[0];
                    const uploadDir = path.join(__dirname, '..', 'client', 'src', 'assets', 'news_images');
                    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    
                    const fileName = `${Date.now()}-${image.originalFilename}`;
                    const filePath = path.join(uploadDir, fileName);
                    fs.copyFileSync(image.filepath, filePath);
                    imageUrl = `/src/assets/news_images/${fileName}`;
                }
    
                // Yeni video yüklendiyse güncelle
                if (files.video && files.video.length > 0) {
                    const video = files.video[0];
                    const uploadDir = path.join(__dirname, '..', 'client', 'src', 'assets', 'news_videos');
                    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    
                    const fileName = `${Date.now()}-${video.originalFilename}`;
                    const filePath = path.join(uploadDir, fileName);
                    fs.copyFileSync(video.filepath, filePath);
                    videoUrl = `/src/assets/news_videos/${fileName}`;
                }
    
                const updatedNews = await newsModel.findByIdAndUpdate(news_id, {
                    title: title[0].trim(),
                    slug: slug?.[0].trim(),
                    description: description[0].trim(),
                    image: imageUrl,
                    video: videoUrl,
                    category: category[0].trim(),
                    status: status[0].trim()
                });
    
                return res.status(200).json({ message: 'Haber başarıyla güncellendi', news: updatedNews });
            });
        } catch (error) {
            console.error('Update error:', error);
            return res.status(500).json({ message: 'Sunucu hatası' });
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
                        status: 'aktif'
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
    
    get_categories = async (req, res) => {
        try {
            // 1️⃣ Kategorileri categoryModel'den çekiyoruz
            const categories = await categoryModel.find({}, { name: 1, slug: 1 });
    
            // 2️⃣ Her kategorinin haber sayısını hesaplıyoruz
            const categoryCounts = await newsModel.aggregate([
                {
                    $group: {
                        _id: '$category',
                        count: { $sum: 1 }
                    }
                }
            ]);
    
            // 3️⃣ Haber sayısını kategoriye ekle
            const updatedCategories = categories.map(cat => {
                const matchedCategory = categoryCounts.find(c => c._id === cat.name);
                return {
                    category: cat.name,
                    slug: cat.slug,
                    count: matchedCategory ? matchedCategory.count : 0 // Eğer haber yoksa 0 yap
                };
            });
    
            return res.status(200).json({ categories: updatedCategories });
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };
    
//End Method 
get_category_news = async (req, res) => {
    const { category } = req.params; 

    try {

        // 2️⃣ Kategoriye göre haberleri getir
        const news = await newsModel.find({
            category: category, // Kategorinin gerçek adı
        });


        return res.status(200).json({ news });

    } catch (error) {
        console.error("Hata oluştu:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
    
    
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
    

    
    //End Method 
    
    get_popular_news = async (req, res) => {
    
        try {
            const popularNews = await newsModel.find({ status: 'aktif' }).sort({count: -1 }).limit(4)
            return res.status(200).json({ popularNews })
        } catch (error) {
            return res.status(500).json({message: 'Internal server Error'})
        }
    
    }

    get_latest_eleven_news = async (req, res) => {
        try {
            const latestNews = await newsModel.find({ status: 'aktif', video: null }) // Video değeri null olan haberleri getir
            .sort({ createdAt: -1 }) // En yeni haberleri almak için azalan sıralama
            .limit(11); // En son eklenen 11 haberi getir
            
            return res.status(200).json({ latestNews });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server Error' });
        }
    };
    //End Method 
    get_video_news = async (req, res) => {
        try {
            const videoNews = await newsModel.find({ 
                status: 'aktif', 
                video: { $ne: null } // Video değeri NULL OLMAYAN haberleri getir
            })
            .sort({ createdAt: -1 }) // En yeni videolu haberleri sıralayarak getir
            .limit(4); // Sadece 4 tane haber getir
    
            return res.status(200).json({ videoNews });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };
    get_latest_news = async (req, res) => {
        try {
            const news = await newsModel.find({ status: 'aktif' }).sort({createdAt: -1 }).limit(5)
            return res.status(200).json({ news })
        } catch (error) {
            return res.status(500).json({message: 'Internal server Error'})
        }
    }
    //End Method 
    get_top_rated_news = async (req, res) => {
        try {
            const news = await newsModel.find({ status: 'aktif' })
                .sort({ count: -1 }) // rating alanı en yüksek olanlar
                .limit(4);
    
            return res.status(200).json({ news });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
    
    get_tranding_news = async (req, res) => {
        try {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Son 7 gün içinde eklenmiş haberler
    
            const news = await newsModel.find({
                status: 'aktif',
                createdAt: { $gte: oneWeekAgo }
            })
                .sort({ count: -1 }) // en çok okunanlar
                .limit(4);
    
            return res.status(200).json({ news });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
    
    get_recent_news = async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
      
        try {
          const total = await newsModel.countDocuments({ status: 'aktif' });
          const news = await newsModel.find({ status: 'aktif' })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
      
          return res.status(200).json({
            news,
            total,
            hasMore: skip + limit < total
          });
        } catch (error) {
          return res.status(500).json({ message: 'Internal server Error' });
        }
      };
    //End Method 
    
    get_images_news = async (req, res) => {
    
        try {
            const images = await newsModel.aggregate([
                {
                    $match:{
                        status: 'aktif'
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
                status: 'aktif',
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