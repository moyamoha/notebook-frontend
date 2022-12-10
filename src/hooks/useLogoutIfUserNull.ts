import React from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../state/hooks';
import { IUser } from '../state/types';

export default function useLogoutIfUserNull(user: IUser | null) {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);
}
