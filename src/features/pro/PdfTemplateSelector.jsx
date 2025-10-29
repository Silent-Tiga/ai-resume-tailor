import React from 'react';

export default function PdfTemplateSelector({ template, onChange }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap:8}}>
      <label style={{fontSize:13}}>PDF 模板：</label>
      <select value={template} onChange={e => onChange(e.target.value)}>
        <option value="default">默认</option>
        <option value="modern">现代风</option>
        <option value="tech">技术简历</option>
      </select>
    </div>
  );
}