import React from 'react';

export default function Header({ isPro }) {
  return (
    <header style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 16px', borderBottom: '1px solid #eee'
    }}>
      <div style={{display:'flex', alignItems:'center', gap: 8}}>
        <span style={{fontWeight: 700}}>AI Resume Tailor</span>
        <span style={{fontSize: 12, color: '#666'}}>MVP</span>
      </div>
      <div style={{fontSize: 13}}>
        {isPro ? (
          <span style={{color: '#1a7f37'}}>Pro：已解锁高级功能</span>
        ) : (
          <span>完全免费 · 使用你的 API Key</span>
        )}
      </div>
    </header>
  );
}