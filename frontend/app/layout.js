import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html className="no-js" data-theme="light" lang="tr">
      <head>
        {/* SEO & Metadata */}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/public/assets/img/favicons/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <Header />
        {children}
        <Footer />

        {/* jQuery ve Plugin Scriptleri */}
        <Script src="/assets/js/vendor/jquery-3.6.0.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/bootstrap.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/slick.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/jquery.magnific-popup.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/jquery.counterup.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/jquery-ui.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/imagesloaded.pkgd.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/isotope.pkgd.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/vimeo_player.js" strategy="lazyOnload" />
        <Script src="/assets/js/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
