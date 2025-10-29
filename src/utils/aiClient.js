function buildPrompt(resumeText, jdText) {
  return `你是一名资深简历教练。根据职位描述优化用户的简历，使其更贴合JD关键词与要求。保留事实，不杜撰。输出结构化、可直接粘贴到简历中的中文文本。\n\n职位描述：\n${jdText}\n\n当前简历：\n${resumeText}\n\n请：\n1）提取JD核心关键词；\n2）重写与JD强相关的经历要点（项目/成果/数据）；\n3）输出一个“优化后的简历片段”，包括：个人简介、核心技能、工作经历3-5条（突出量化成果）、教育经历；\n4）语气专业简洁，避免夸大；`;
}

async function callOpenAI({ model, apiKey, prompt, signal }) {
  const body = {
    model,
    messages: [
      { role: 'system', content: '你是一名资深简历教练' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7
  };
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body),
    signal
  });
  const text = await resp.text();
  if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${text}`);
  const data = JSON.parse(text);
  return data.choices?.[0]?.message?.content || '';
}

async function callGroq({ model, apiKey, prompt, signal }) {
  const body = {
    model,
    messages: [
      { role: 'system', content: '你是一名资深简历教练' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7
  };
  const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body),
    signal
  });
  const text = await resp.text();
  if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${text}`);
  const data = JSON.parse(text);
  return data.choices?.[0]?.message?.content || '';
}

async function callClaude({ model, apiKey, prompt, signal }) {
  const body = {
    model,
    max_tokens: 1024,
    messages: [
      { role: 'user', content: [ { type: 'text', text: prompt } ] }
    ]
  };
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify(body),
    signal
  });
  const text = await resp.text();
  if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${text}`);
  const data = JSON.parse(text);
  const content = data.content?.[0]?.text || '';
  return content;
}

async function callGemini({ model, apiKey, prompt, signal }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${apiKey}`;
  const body = {
    contents: [
      { role: 'user', parts: [ { text: prompt } ] }
    ]
  };
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal
  });
  const text = await resp.text();
  if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${text}`);
  const data = JSON.parse(text);
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return content;
}

export async function tailorResume({ provider, model, apiKey, resumeText, jdText, signal }) {
  const prompt = buildPrompt(resumeText, jdText);
  if (!provider) throw new Error('未选择模型提供商');
  if (!apiKey) throw new Error('API Key 为空');

  switch (provider) {
    case 'openai':
      return await callOpenAI({ model, apiKey, prompt, signal });
    case 'groq':
      return await callGroq({ model, apiKey, prompt, signal });
    case 'claude':
      return await callClaude({ model, apiKey, prompt, signal });
    case 'gemini':
      return await callGemini({ model, apiKey, prompt, signal });
    default:
      throw new Error('暂不支持该提供商');
  }
}