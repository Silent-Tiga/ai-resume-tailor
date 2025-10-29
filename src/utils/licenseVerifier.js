export async function verifyLicenseKey(key) {
  await new Promise(r => setTimeout(r, 400));
  const ok = typeof key === 'string' && key.trim().toUpperCase().startsWith('PADDLE-') && key.trim().length >= 12;
  return ok;
}