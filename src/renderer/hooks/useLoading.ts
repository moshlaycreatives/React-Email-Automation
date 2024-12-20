import { useState } from 'react';

const useLoading = () => {
  const [loading, setLoading] = useState("");
  const setStatus = (name: any) => {
    setLoading(name);
  };

  return { loading, setLoading, setStatus };
};

export default useLoading;
