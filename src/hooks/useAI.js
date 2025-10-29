import { useState } from 'react';
import { tailorResume } from '../utils/aiClient';

export default function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [output, setOutput] = useState('');

  async function run({ provider, model, apiKey, resumeText, jdText }) {
    setLoading(true); setError(null);
    try {
      const text = await tailorResume({ provider, model, apiKey, resumeText, jdText });
      setOutput(text);
      return text;
    } catch (e) {
      const msg = String(e?.message || 'AI 调用失败');
      if (msg.includes('401')) setError('API Key 无效，请检查');
      else if (msg.includes('429')) setError('API 调用频率超限，请稍后重试');
      else if (msg.includes('403')) setError('API 权限不足或未开通该模型');
      else setError('AI 服务异常，请稍后重试');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  function reset() { setOutput(''); setError(null); }

  return { loading, error, output, run, reset };
}