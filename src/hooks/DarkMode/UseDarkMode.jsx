// src/hooks/DarkMode/UseDarkMode.jsx
import { useState, useEffect } from 'react';

export function UseDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute('data-theme', 'dark');  // 👈 DaisyUI way
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light'); // 👈 DaisyUI way
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return [isDark, setIsDark];
}