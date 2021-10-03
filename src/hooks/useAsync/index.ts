import { useState, useCallback } from "react";

const useAsync = <V = any, E = any>(asyncCallback: (...args: any[]) => Promise<V>) => {
  const [data, setData] = useState<V | null>(null);
  const [error, setError] = useState<E | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(async () => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
      const response = await asyncCallback();
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [asyncCallback]);

  return {
    data,
    error,
    loading,
    execute
  }
};

export default useAsync;
