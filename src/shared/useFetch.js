import { useEffect, useMemo, useState } from 'react';
import { useAuthContext } from '../Auth/AuthContext';
import { apiUrl } from './config';

// useFetch('/users');
export function useFetch(endpoint, auth = false, dependencies = null) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(Array.isArray(dependencies));
  const [errors, setErrors] = useState({});
  const { token } = useAuthContext();

  let deps = [];

  if (Array.isArray(dependencies)) {
    deps = [...dependencies];
  }

  const headers = {
    'Content-Type': 'application/json',
  };
  if (auth) {
    headers.Authorization = `Bearer: ${token}`;
  }

  useEffect(() => {
    if (dependencies) {
      fetch(apiUrl + endpoint, {
        method: 'GET',
        headers,
      })
        .then(handleResponse)
        .then((stuff) => {
          setData(stuff);
          setIsLoading(false);
        });
    }
  }, [...deps, endpoint]);

  function handleResponse(res) {
    console.log(res);
    return res.json();
  }

  const ret = useMemo(() => {
    const stuff = {
      data,
      isLoading,
      errors,
      mutate,
    };

    const headers = {
      'Content-Type': 'application/json',
    };
    if (auth) {
      headers.Authorization = `Bearer: ${token}`;
    }

    async function mutate(data, method = 'PUT') {
      setIsLoading(true);
      const res = await fetch(apiUrl + endpoint, {
        method,
        headers,
        body: data && JSON.stringify(data),
      }).then(handleResponse);

      setData(res);
      setIsLoading(false);

      return res;
    }

    return stuff;
  }, [data, isLoading, errors, endpoint, auth, token]);

  return ret;
}
