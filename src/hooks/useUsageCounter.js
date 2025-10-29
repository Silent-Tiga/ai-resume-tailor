// 完全免费方案：不再限制调用次数
export default function useUsageCounter() {
  return { count: 0, usageLeft: Infinity, inc: () => {}, FREE_LIMIT: Infinity };
}