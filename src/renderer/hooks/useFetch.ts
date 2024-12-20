import React, { useEffect, useState } from 'react';
import useLoading from './useLoading';

const useFetch = ({
  id,
  callback,
  refetch = false,
  setRefetch = () => {},
}: {
  id?: string | null | undefined;
  callback: any;
}) => {
  const { loading, setStatus } = useLoading();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const fetchById = async (id: string) => {
    try {
      setStatus(true);
      const res = await callback(id);
      setResponse(res);
    } catch (err: any) {
      setError(err);
    } finally {
      setStatus(false);
      setRefetch(false);
    }
  };

  const fetchAll = async () => {
    try {
      setStatus(true);
      const res = await callback();
      setResponse(res);
    } catch (err: any) {
      setError(err);
    } finally {
      setStatus(false);
      setRefetch(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchById(id);
      console.log('fetch by id');
    } else {
      fetchAll();
      console.log('fetch all');
    }
  }, [id, refetch]);

  return { response, loading, error };
};

export default useFetch;
