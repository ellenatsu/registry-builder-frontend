import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownPage: React.FC<{ filePath: string }> = ({ filePath }) => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    fetch(filePath)
      .then((response) => response.text())
      .then((text) => setContent(text));
  }, [filePath]);

  return (
    <div className="prose mx-auto p-4">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownPage;
