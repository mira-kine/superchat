import { useEffect, useState } from 'react';

// set up a prefix so that your local storages won't conflict
const PREFIX = 'superchat';

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  // parsing json is slow so we only want to run this once
  // take what is in local storage and set it into state
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === 'function') {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  // take the value and set it to local storage
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
