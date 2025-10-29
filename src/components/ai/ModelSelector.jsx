import React from 'react';

const PROVIDERS = [
  { id: 'openai', name: 'OpenAI' },
  { id: 'claude', name: 'Claude' },
  { id: 'gemini', name: 'Gemini' },
  { id: 'groq', name: 'Groq' },
];

const MODELS = {
  openai: [
    { id: 'gpt-3.5-turbo', name: 'gpt-3.5-turbo' },
  ],
  claude: [
    { id: 'claude-3-haiku-20240307', name: 'claude-3-haiku' },
  ],
  gemini: [
    { id: 'gemini-1.5-flash', name: 'gemini-1.5-flash' },
  ],
  groq: [
    { id: 'llama3-8b-8192', name: 'llama3-8b-8192' },
  ],
};

export default function ModelSelector({ provider, model, apiKey, onChange }) {
  const models = MODELS[provider] || [];
  return (
    <div style={{display:'flex', flexDirection:'column', gap:8}}>
      <label style={{fontWeight:600}}>模型选择</label>
      <div style={{display:'flex', gap:8}}>
        <select value={provider} onChange={(e)=>onChange({ provider: e.target.value })}>
          {PROVIDERS.map(p=> <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={model} onChange={(e)=>onChange({ model: e.target.value })}>
          {models.map(m=> <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>
      <input
        type="password"
        placeholder={`输入 ${PROVIDERS.find(p=>p.id===provider)?.name} API Key（仅当前会话）`}
        value={apiKey}
        onChange={(e)=>onChange({ apiKey: e.target.value })}
        style={{padding:10, border:'1px solid #ddd', borderRadius:8}}
      />
      <div style={{fontSize:12, color:'#666'}}>
        本工具完全免费：你自带 Key 即可使用（不持久化保存，刷新后需重填）。
        常见调用成本约 $0.002/次，新账号可能有 ~$5 免费额度。
      </div>
    </div>
  );
}