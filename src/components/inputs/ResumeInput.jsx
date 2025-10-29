import React, { useState } from 'react';
import { extractTextFromPdf } from '../../utils/pdfExtractor';

export default function ResumeInput({ value, onChange }) {
  const [loading, setLoading] = useState(false);

  async function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type?.includes('pdf')) {
      alert('请上传 PDF 文件');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('PDF 文件不能超过 5MB');
      return;
    }
    setLoading(true);
    try {
      const text = await extractTextFromPdf(file);
      onChange(text);
    } catch (err) {
      alert('PDF 解析失败，请改用文本粘贴');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{display:'flex', flexDirection:'column', gap:8}}>
      <label style={{fontWeight:600}}>当前简历</label>
      <div style={{display:'flex', gap:8}}>
        <input type="file" accept="application/pdf" onChange={onFile} />
        {loading && <span style={{fontSize:12}}>正在解析 PDF...</span>}
      </div>
      <textarea
        placeholder="或直接粘贴简历文本..."
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        style={{minHeight:200, padding:12, border:'1px solid #ddd', borderRadius:8}}
      />
    </div>
  );
}