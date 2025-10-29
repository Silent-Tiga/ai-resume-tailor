import React from 'react';

export default function JobDescriptionInput({ value, onChange }) {
  return (
    <div style={{display:'flex', flexDirection:'column', gap:8}}>
      <label style={{fontWeight:600}}>职位描述（JD）</label>
      <textarea
        placeholder="粘贴招聘页面的岗位描述..."
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        style={{minHeight:160, padding:12, border:'1px solid #ddd', borderRadius:8}}
      />
    </div>
  );
}