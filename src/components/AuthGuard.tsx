import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { COLORS } from '../misc/Colors';

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const storedUserId = sessionStorage.getItem('user_id');
      if (storedUserId) {
        setIsAuthorized(true);

        // Stale Token Cleanup Logic
        const urlParams = new URLSearchParams(location.search);
        if (urlParams.has('token')) {
          urlParams.delete('token');
          const cleanSearch = urlParams.toString() ? `?${urlParams.toString()}` : "";
          window.history.replaceState(null, "", location.pathname + cleanSearch + location.hash);
        }
      } else {
        // If session is lost during active usage, wait for root App to handle or reload
        const timer = setTimeout(checkAuth, 100);
        return () => clearTimeout(timer);
      }
    };

    checkAuth();
  }, [location]);

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC]">
        <Loader size={45} color={COLORS.blueDark} />
      </div>
    );
  }

  return <>{children}</>;
};
