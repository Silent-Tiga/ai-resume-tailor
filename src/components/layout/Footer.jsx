import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #eee', marginTop: 24, padding: '12px 16px', textAlign: 'center', fontSize: 13
    }}>
      <div>
        💡 本工具完全免费！使用你自己的 API Key 即可生成优化简历。
        想要更专业的 PDF 模板、ATS 关键词报告、多语言导出？
        <a href="#upgrade" onClick={(e)=>{
          e.preventDefault();
          const ev = new CustomEvent('upgrade-click');
          window.dispatchEvent(ev);
        }}>升级 Pro</a>
      </div>
      <div style={{color:'#777', marginTop: 6}}>
        © {new Date().getFullYear()} AI Resume Tailor
      </div>
    </footer>
  );
}