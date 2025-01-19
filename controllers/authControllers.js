const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { formidable } = require("formidable");
const fs = require("fs");
const path = require("path");

class authController {
  login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Alanları Doldurunuz." });
    }
    try {
      const user = await authModel.findOne({ email }).select("+password");
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const obj = {
            id: user._id,
            role: user.role,
            name: user.name,
            category: user.category,
            email: user.email,
            image: user.image,
          };
          const token = await jwt.sign(obj, process.env.secret, {
            expiresIn: process.env.exp_time,
          });

          res.status(200).json({
            message: 'Giriş başarılı',
            token,
            userInfo: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
        } else {
          return res.status(400).json({ message: "Hatalı Giriş" });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  add_writer = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Alanları Doldurunuz." });
    }
    try {
      const user = await authModel.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "Kullanıcı Mevcut" });
      }
      const newUser = await authModel.create({
        name: name.trim(),
        email: email.trim(),
        password: await bcrypt.hash(password.trim(), 10),
        role: "yazar",
      });
      await newUser.save();
      return res
        .status(201)
        .json({ message: "Yazar Eklendi", writer: newUser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  get_writers = async (req, res) => {
    try {
      const writers = await authModel.find({ role: "yazar" });
      return res.status(200).json({ writers });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  getWriterById = async (req, res) => {
    const { id } = req.params;
    try {
      const writer = await authModel.findById(id);
      return res.status(200).json({ writer });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  update_writer = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    if (!name || !email ) {
      return res.status(400).json({ message: "Alanları Doldurunuz." });
    }
    try {
      const writer = await authModel.findByIdAndUpdate(
        id,
        {
          name: name.trim(),
          email: email.trim(),
          role: "yazar",
        },
        { new: true }
      );
      return res.status(200).json({ message: "Yazar Güncellendi", writer });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  delete_writer = async (req, res) => {
    const { id } = req.params;
    try {
      await authModel.findByIdAndDelete(id);
      return res.status(200).json({ message: "Yazar Silindi" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  get_profile = async (req, res) => {
    const { id } = req.params;
    try {
      const writer = await authModel.findById(id);
      return res.status(200).json({ writer });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  update_profile = async (req, res) => {
    const form = formidable({ multiples: true });

    try {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(400).json({ message: "Form parsing error" });
        }

        console.log("Received fields:", fields);
        console.log("Received files:", files);

        const { name, email } = fields;

        if (!name?.[0] || !email?.[0]) {
          return res.status(400).json({ message: "Alanları Doldurunuz." });
        }

        const updateData = {
          name: name[0].trim(),
          email: email[0].trim(),
        };

        if (files?.image?.[0]) {
          const image = files.image[0];
          const uploadDir = path.join(
            __dirname,
            "..",
            "client",
            "src",
            "assets",
            "profile_images"
          );

          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }

          const fileName = `${Date.now()}-${image.originalFilename}`;
          const filePath = path.join(uploadDir, fileName);

          fs.copyFileSync(image.filepath, filePath);
          updateData.image = `/src/assets/profile_images/${fileName}`;
        }

        const writer = await authModel.findByIdAndUpdate(
          req.params.id,
          updateData,
          { new: true }
        );

        return res.status(200).json({
          message: "Profil Güncellendi",
          writer,
        });
      });
    } catch (error) {
      console.error("Server Error:", error);
      return res.status(500).json({ message: error.message });
    }
  };

  changePassword = async (req, res) => {
    const form = formidable({ multiples: true });

    try {
      form.parse(req, async (err, fields) => {
        if (err) {
          return res.status(400).json({ message: "Form parsing error" });
        }

        const { old_password, new_password } = fields;

        if (!old_password?.[0] || !new_password?.[0]) {
          return res
            .status(400)
            .json({ message: "Lütfen eski ve yeni şifrenizi giriniz." });
        }

        const writer = await authModel
          .findById(req.params.id)
          .select("+password");

        if (!writer) {
          return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        const isMatch = await bcrypt.compare(old_password[0], writer.password);

        if (isMatch) {
          writer.password = await bcrypt.hash(new_password[0], 10);
          await writer.save();
          return res
            .status(200)
            .json({ message: "Şifre başarıyla değiştirildi." });
        } else {
          return res.status(400).json({ message: "Eski şifreniz hatalı." });
        }
      });
    } catch (error) {
      console.error("Password Change Error:", error);
      return res
        .status(500)
        .json({ message: "Şifre değiştirme işlemi başarısız." });
    }
  };


}
module.exports = new authController();
