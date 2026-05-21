import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface IframeWrapperProps {
  src: string;
  title?: string;
}

export const IframeWrapper: React.FC<IframeWrapperProps> = ({ src, title }) => {
  const navigate = useNavigate();
  
  const iframeSrc = useMemo(() => {
    try {
      const url = new URL(src);
      const userId = sessionStorage.getItem('user_id');
      const token = sessionStorage.getItem('token');
      
      if (userId && !url.searchParams.has('user_id')) {
        url.searchParams.append('user_id', userId);
      }
      if (token && !url.searchParams.has('token')) {
        url.searchParams.append('token', token);
      }
      return url.toString();
    } catch (e) {
      return src;
    }
  }, [src]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.action === 'exit') {
        navigate(-1);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  return (
    <div className="w-full h-screen bg-white">
      <iframe src={iframeSrc} className="w-full h-full border-none" title={title || "Activity"} />
    </div>
  );
};
