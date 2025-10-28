# AI Resume Tailor (MVP)

一个纯前端的简历智能适配工具：粘贴职位描述（JD）与当前简历，一键生成优化后的简历片段，并支持下载 PDF。无需后端，支持密钥激活。

## 新定位
- 完全免费：用户自带 API Key 即可使用（不持久化）。
- Pro 功能解锁：通过 Paddle License 激活，获得专业 PDF 模板、ATS 关键词报告、多语言导出等。

## 功能
- 粘贴 JD 与简历文本，或上传 PDF 自动解析为文本
- 选择模型（OpenAI/Claude/Gemini/Groq）并输入你的 API Key（当前会话生效）
- 一键生成优化结果，支持下载为 PDF
- Pro：模板切换（默认/现代/技术）、更多高级功能占位

## 启动
```
npm install
npm run dev
```
浏览器打开 `http://localhost:5173/`。

## 配置说明
- AI：支持 OpenAI/Groq（OpenAI兼容）/Claude/Gemini。你需要在页面内输入你的 `API Key`。
- PDF：解析使用 `pdfjs-dist`，导出 PDF 使用 `jsPDF` + `html2canvas`。
- 存储：不再限制使用次数；关键状态仅在当前会话保存或使用 `localStorage` 存储非敏感信息。
- License：前端为占位逻辑；生产需后端代理（下文）。

## 生产就绪：Paddle License 验证
Paddle 的 License 验证需要私密凭据，出于安全与 CORS 限制，不应直接在浏览器调用。推荐用极轻服务代替：

- 选项 A：Cloudflare Worker / Vercel Serverless
  - 暴露一个 `/verify` 接口，后端用 Paddle API 校验 License Key，返回 `true/false`。
  - 前端在 `src/utils/licenseVerifier.js` 中改为调用该接口。
- 选项 B：仅前端（不推荐）
  - 会暴露 Vendor 凭据且容易被滥用，不建议在生产使用。

## 文件结构
```
src/
  components/
    layout/{Header, Footer}
    inputs/{JobDescriptionInput, ResumeInput}
    ai/{ModelSelector, AIOutputPanel}
    billing/{LicenseGate, UpgradeBanner}
  features/
    pro/{PdfTemplateSelector}
  hooks/{useAI, useLicense, useUsageCounter}
  utils/{aiClient, licenseVerifier, localStorage, pdfExtractor, pdfExporter}
  App.jsx, main.jsx
```

## 定价（Paddle 建议）
| 计划 | 价格 | 功能 |
|------|------|------|
| Free | $0 | AI 优化 + 基础 PDF |
| Pro | $4.99/月 | 多模板 PDF + ATS 报告 + 多语言 + 优先支持 |

## 部署
- 推荐：Vercel、Netlify、GitHub Pages（静态托管）
- 部署后将你的 Worker 验证接口域名填入 `licenseVerifier.js`

## 路线图
- PDF 模板增强（样式、布局块）
- ATS 关键词高亮与覆盖率报告
- 多语言输出与导出（Markdown/Word）
- 历史记录与对比（localStorage）

## 许可与隐私
- 数据停留在用户浏览器，不做存储。
- API Key 仅当前会话使用，不持久化保存。
