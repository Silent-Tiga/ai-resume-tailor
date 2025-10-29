import { useEffect, useState } from 'react';
import { lsGet, lsSet } from '../utils/localStorage';
import { verifyLicenseKey } from '../utils/licenseVerifier';

export default function useLicense() {
  const [licenseKey, setLicenseKey] = useState(lsGet('licenseKey', ''));
  const [isPro, setIsPro] = useState(lsGet('isPro', false));
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{ lsSet('licenseKey', licenseKey); }, [licenseKey]);
  useEffect(()=>{ lsSet('isPro', isPro); }, [isPro]);

  async function check(key) {
    setChecking(true); setError(null);
    try {
      const ok = await verifyLicenseKey(key);
      setIsPro(ok);
      setLicenseKey(key);
      return ok;
    } catch (e) {
      setError(e?.message || '验证失败');
      return false;
    } finally {
      setChecking(false);
    }
  }

  return { licenseKey, setLicenseKey, isPro, checking, error, check };
}