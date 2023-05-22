import React, { useState, useEffect } from 'react';

function Image({ blob, fileName }) {
  const [mediaSrc, setMediaSrc] = useState('');
  const [mediaType, setMediaType] = useState('');

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const type = getFileType(blob.type);
      setMediaType(type);

      if (type === 'image' || type === 'video' || type === 'audio') {
        setMediaSrc(result);
      }
    };
    reader.readAsDataURL(blob);
  }, [blob]);

  const getFileType = (fileType) => {
    if (fileType.includes('video')) {
      return 'video';
    } else if (fileType.includes('audio')) {
      return 'audio';
    } else if (fileType.includes('gif')) {
      return 'image';
    } else {
      return 'image';
    }
  };

  return (
    <div>
      {mediaType === 'video' && (
        <video style={{ width: 300, height: 'auto' }} src={mediaSrc} controls>
          Sorry, your browser doesn't support embedded videos.
        </video>
      )}

      {mediaType === 'audio' && (
        <audio style={{ width: 300 }} src={mediaSrc} controls>
          Sorry, your browser doesn't support embedded audio.
        </audio>
      )}

      {mediaType === 'image' && (
        <img style={{ width: 300, height: 'auto' }} src={mediaSrc} alt={fileName} />
      )}
    </div>
  );
}

export default Image;
