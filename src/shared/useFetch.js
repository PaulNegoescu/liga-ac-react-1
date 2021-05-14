import { useEffect, useReducer } from 'react';
import { useAuthContext } from '../Auth/AuthContext';
import { apiUrl } from './config';

const headers = {
  'Content-Type': 'application/json',
};

// useFetch('/users');
export function useFetch(endpoint, auth = false, runImmediately = false) {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: runImmediately,
    errors: null,
  });
  const { token } = useAuthContext();

  function reducer(oldState, action) {
    const newState = { ...oldState };
    switch (action.type) {
      case 'REQUESTED_DATA':
        newState.isLoading = true;
        break;
      case 'RECEIVED_DATA':
        newState.data = action.payload;
        newState.isLoading = false;
        break;
      case 'SET_ERRORS':
        newState.errors = action.payload;
        newState.isLoading = false;
        break;
      default:
        return oldState;
    }

    return newState;
  }

  if (auth) {
    headers.Authorization = `Bearer: ${token}`;
  }

  useEffect(() => {
    if (runImmediately) {
      fetch(apiUrl + endpoint, {
        method: 'GET',
        headers,
      })
        .then(handleResponse)
        .then((stuff) => {
          dispatch({ type: 'RECEIVED_DATA', payload: stuff });
        });
    }
  }, [runImmediately, endpoint]);

  function handleResponse(res) {
    console.log(res);
    return res.json();
  }

  async function mutate(data, method = 'PUT') {
    dispatch({ type: 'REQUESTED_DATA' });
    const res = await fetch(apiUrl + endpoint, {
      method,
      headers,
      body: data && JSON.stringify(data),
    }).then(handleResponse);

    dispatch({ type: 'RECEIVED_DATA', payload: res });

    return res;
  }

  return {
    ...state,
    mutate,
  };
}
