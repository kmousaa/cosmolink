import React, { useState, useEffect } from 'react';

function Image({ blob, fileName }) {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(blob);
  }, [blob]);

  return <img style={{ width: 300, height: 'auto' }} src={imageSrc} alt={fileName} />;
  
}

export default Image;

