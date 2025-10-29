import React, { useState } from 'react';
import './App.css';

import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import JobDescriptionInput from './components/inputs/JobDescriptionInput.jsx';
import ResumeInput from './components/inputs/ResumeInput.jsx';
import ModelSelector from './components/ai/ModelSelector.jsx';
import AIOutputPanel from './components/ai/AIOutputPanel.jsx';
import LicenseGate from './components/billing/LicenseGate.jsx';
import UpgradeBanner from './components/billing/UpgradeBanner.jsx';

import useAI from './hooks/useAI.js';
import useLicense from './hooks/useLicense.js';

function App() {
  const [jd, setJd] = useState('');
  const [resume, setResume] = useState('');
  const [provider, setProvider] = useState('openai');
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [apiKey, setApiKey] = useState('');
  const [template, setTemplate] = useState('default');

  const { isPro, checking, error, check } = useLicense();
  const { loading, output, error: aiError, run } = useAI();

  function onModelChange(changes) {
    if (changes.provider) setProvider(changes.provider);
    if (changes.model) setModel(changes.model);
    if (changes.apiKey !== undefined) setApiKey(changes.apiKey);
  }

  async function onGenerate() {
    if (!jd.trim() || !resume.trim()) { alert('请先粘贴 JD 与简历'); return; }
    if (!apiKey.trim()) { alert('请先填写 API Key'); return; }
    const text = await run({ provider, model, apiKey, resumeText: resume, jdText: jd });
    return text;
  }

  function onUpgrade() {
    const ev = new CustomEvent('upgrade-click');
    window.dispatchEvent(ev);
    window.location.hash = 'upgrade';
  }

  return (
    <div style={{maxWidth:900, margin:'0 auto'}}>
      <Header isPro={isPro} />

      <div style={{padding:16}}>
        <LicenseGate checking={checking} error={error} onVerify={check} isPro={isPro} />
        <UpgradeBanner onUpgradeClick={onUpgrade} isPro={isPro} />

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
          <JobDescriptionInput value={jd} onChange={setJd} />
          <ResumeInput value={resume} onChange={setResume} />
        </div>

        <div style={{marginTop:16}}>
          <ModelSelector provider={provider} model={model} apiKey={apiKey} onChange={onModelChange} />
        </div>

        <div style={{display:'flex', gap:8, marginTop:16}}>
          <button onClick={onGenerate} disabled={loading}>
            {loading ? '正在优化...' : '一键优化简历'}
          </button>
        </div>

        <div style={{marginTop:16}}>
          <AIOutputPanel
            loading={loading}
            error={aiError}
            output={output}
            onRetry={onGenerate}
            provider={provider}
            isPro={isPro}
            template={template}
            onTemplateChange={setTemplate}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
