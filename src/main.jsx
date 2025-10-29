// 版本迁移：清理旧前缀一次
(function migrateStorage(){
  try {
    const verKey = 'ai-resume-tailor-version';
    const current = localStorage.getItem(verKey);
    const target = 'v1';
    if (current !== target) {
      // 清理旧前缀
      const oldPrefix = 'art_v1_';
      const keys = Object.keys(localStorage);
      keys.forEach(k => { if (k.startsWith(oldPrefix)) localStorage.removeItem(k); });
      localStorage.setItem(verKey, target);
    }
  } catch {}
})();

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
