import { useEffect } from 'react';

export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    if (!description) return;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = 'description';
      document.head.appendChild(tag);
    }
    tag.content = description;
  }, [title, description]);
}
