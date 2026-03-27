// src/lib/hooks/use-utm.ts

'use client';

import { useEffect, useState } from 'react';

export function useUTM() {
  const [utm, setUtm] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setUtm({
        utm_source: params.get('utm_source') || '',
        utm_medium: params.get('utm_medium') || '',
        utm_campaign: params.get('utm_campaign') || '',
      });
    }
  }, []);

  return utm;
}
