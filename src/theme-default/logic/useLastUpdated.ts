import { useState } from 'react';

function formatTimeStamp(timeStamp: number | string): string {
  return new Date(timeStamp).toLocaleString('zh');
}

export function useLastUpdated(lastUpdatedTimeStamp: number | undefined) {
  const [state, setState] = useState(
    formatTimeStamp(lastUpdatedTimeStamp || '')
  );
  const setLastUpdated = (timeStamp: number) =>
    setState(formatTimeStamp(timeStamp));
  return [state, setLastUpdated] as const;
}
