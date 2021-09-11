import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addNoticeRequest } from '../../../libs/modules/notices';

export default function useAddNotice() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id }: { id?: string } = router.query;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  }, []);

  const onChangeBody = useCallback((text: string) => {
    setBody(text);
  }, []);

  const onThumbnail = () => {
    const upload = document.createElement('input');

    upload.type = 'file';
    upload.onchange = async (e) => {
      if (!upload.files) return;

      const file = upload.files[0];
      const formData = new FormData();

      formData.append('file', file);

      const response = await fetch(`http://localhost:4000/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response) {
        alert('업로드 에러!');
        return;
      }

      const data = await response.json();

      setThumbnail(`https://image.dnkdream.com/${data.key}`);
    };

    upload.click();
  };

  const onChangeTags = useCallback((nextTags: string[]) => {
    setTags(nextTags);
  }, []);

  const onBack = () => {
    router.back();
  };

  const onAddNotice = async (e: React.MouseEvent) => {
    e.preventDefault();

    if ([title, body, tags].includes('')) {
      alert('빈 칸 없이 작성해 주세요');
      return;
    }

    try {
      let overlapTags = tags === [] ? [] : [...new Set(tags.map((tag) => tag.trim()))];

      dispatch(addNoticeRequest({ title, body, thumbnail, tags: overlapTags }));

      router.push('/');
    } catch (err) {
      alert(err);
    }
  };

  return {
    title,
    body,
    thumbnail,
    tags,
    onChangeTitle,
    onChangeBody,
    onThumbnail,
    onChangeTags,
    onBack,
    onAddNotice,
  };
}
