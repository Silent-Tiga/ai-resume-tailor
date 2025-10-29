import React, { useState } from 'react';

export default function LicenseGate({ checking, error, onVerify, isPro }) {
  const [key, setKey] = useState('');
  if (isPro) return null;
  return (
    <div style={{
      padding:12, border:'1px dashed #bbb', borderRadius:8, background:'#fffef8', marginBottom:12
    }}>
      <div style={{fontWeight:600, marginBottom:8}}>解锁 Pro（License Key）</div>
      <div style={{display:'flex', gap:8}}>
        <input
          placeholder="输入 Paddle License Key（例如：PADDLE-xxxx）"
          value={key}
          onChange={(e)=>setKey(e.target.value)}
          style={{flex:1, padding:10, border:'1px solid #ddd', borderRadius:8}}
        />
        <button onClick={()=>onVerify(key)} disabled={checking}>
          {checking ? '验证中...' : '验证'}
        </button>
      </div>
      {error && <div style={{color:'#b00', fontSize:12, marginTop:6}}>验证失败：{error}</div>}
    </div>
  );
}