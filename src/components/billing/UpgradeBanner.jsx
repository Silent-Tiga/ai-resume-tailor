import React from 'react';

export default function UpgradeBanner({ onUpgradeClick, isPro }) {
  if (isPro) return null;
  return (
    <div style={{
      padding:12, border:'1px solid #eee', borderRadius:8, background:'#f8fbff', margin:'12px 0'
    }}>
      <div>
        💡 本工具完全免费！你只需提供自己的 OpenAI / Claude / Groq API Key（调用费用约 $0.002/次）。
        需要更专业的简历模板、ATS 关键词报告、多语言导出？
        <a href="#" onClick={(e)=>{ e.preventDefault(); onUpgradeClick?.(); }}>升级 Pro</a>
      </div>
    </div>
  );
}