const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const db_connect = require('./utils/db');

dotenv.config();

// ✅ CORS Middleware (Önerilen Ayarlar)
const allowedOrigins = [
    'http://localhost:3000', // Next.js geliştirme sunucusu
    'http://localhost:5173', // Vite veya Next.js

    'http://192.168.18.183:3000', // Mobil veya ağ içi erişim
    'https://your-production-domain.com' // Canlı ortam
];

app.use(cors({
    origin: allowedOrigins, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true // Çerezleri ve kimlik doğrulama başlıklarını destekler
}));

// 📌 Body Parser Middleware
app.use(bodyParser.json());

// 📌 API Rotaları
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/newsRoutes'));

app.get('/', (req, res) => res.send("Hello Easy"));

// 📌 Veritabanı Bağlantısı
db_connect();

// 📌 Sunucuyu Başlat
const port = process.env.PORT || 5137;
app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
