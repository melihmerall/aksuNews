"use client";

import React, { createContext, useContext } from 'react';

// Günleri, ayları Türkçe olarak belirle
const localeOptions = {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
};

// Global tarih formatlama fonksiyonu
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('tr-TR', localeOptions);
};

// Context oluştur
const DateContext = createContext(formatDate);

// Hook ile erişim sağlayalım
export const useDate = () => useContext(DateContext);

// Sağlayıcıyı (Provider) tanımlayalım
export const DateProvider = ({ children }) => {
  return (
    <DateContext.Provider value={formatDate}>
      {children}
    </DateContext.Provider>
  );
};
