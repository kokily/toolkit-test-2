import React, { useCallback, useState } from 'react';

export default function useSearch() {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const onTag = (name: string) => {
    setTag(name);
  };

  return {
    title,
    tag,
    onChange,
    onTag,
  };
}
