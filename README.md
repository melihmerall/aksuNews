# AksuNews Proje Dosya Yapısı

AksuNews projesi, modern bir haber platformu olarak tasarlanmış bir uygulamadır. Proje, **Frontend (React)** ve **Backend (Node.js + Express)** olmak üzere iki ana bölümden oluşmaktadır.

## Klasör Yapısı

```plaintext
aksuNews/
├── client/                 # Frontend kodları
│   ├── public/             # Statik dosyalar
│   └── src/                # React bileşenleri ve stiller
│       ├── assets/         # Statik varlıklar (resimler, ikonlar vb.)
│       ├── components/     # Yeniden kullanılabilir React bileşenleri
│       ├── context/        # React context dosyaları
│       ├── pages/          # Sayfa bileşenleri
│       ├── App.jsx         # Ana uygulama bileşeni
│       ├── index.jsx       # Giriş noktası
│       └── styles/         # Stil dosyaları (CSS, SCSS vb.)
├── server/                 # Backend kodları
│   ├── controllers/        # API kontrolörleri
│   ├── models/             # Mongoose modelleri
│   ├── routes/             # API rotaları
│   ├── middlewares/        # Orta katman yazılımları
│   ├── config/             # Konfigürasyon dosyaları
│   ├── server.js           # Sunucu başlangıç dosyası
│   └── utils/              # Yardımcı fonksiyonlar
├── .env                    # Ortam değişkenleri
├── .gitignore              # Git için ihmal edilecek dosyalar
├── package.json            # Proje bağımlılıkları ve betikler
├── README.md               # Proje dokümantasyonu
└── LICENSE                 # Lisans dosyası
