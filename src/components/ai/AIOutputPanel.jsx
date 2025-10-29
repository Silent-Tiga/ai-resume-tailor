import React, { useRef } from 'react';
import { exportElementToPdf } from '../../utils/pdfExporter';
import PdfTemplateSelector from '../../features/pro/PdfTemplateSelector.jsx';

export default function AIOutputPanel({ loading, error, output, onRetry, provider, isPro, template, onTemplateChange }) {
  const ref = useRef(null);
  const loadingText = loading ? `AI 正在生成（${provider}）...` : '';
  const panelClass = `resume-template-${template}`;

  return (
    <div style={{display:'flex', flexDirection:'column', gap:8}}>
      <label style={{fontWeight:600}}>优化结果</label>
      {isPro && (
        <PdfTemplateSelector template={template} onChange={onTemplateChange} />
      )}
      <div ref={ref} className={panelClass} style={{
        minHeight:180, padding:12, border:'1px solid #ddd', borderRadius:8,
        whiteSpace:'pre-wrap', background:'#fafafa'
      }}>
        {loading ? loadingText : (error ? `错误：${error}` : (output || '结果将显示在这里'))}
      </div>
      <div style={{display:'flex', gap:8}}>
        <button onClick={()=>exportElementToPdf(ref.current)} disabled={!output}>
          下载 PDF
        </button>
        <button onClick={()=>navigator.clipboard.writeText(output || '')} disabled={!output}>
          复制
        </button>
        <button onClick={onRetry} disabled={loading}>
          重新生成
        </button>
      </div>
    </div>
  );
}