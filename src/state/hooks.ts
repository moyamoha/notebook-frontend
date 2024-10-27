import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, IStore } from './types';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { fetchProfile, login, logout } from './api/user.api';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<IStore> = useSelector;

export const useRouteQueryHandler: () => void = () => {
    const dispatch = useAppDispatch();
    const goto = useNavigate();
    const [urlSearchParams, _] = useSearchParams();

    const token = urlSearchParams.get('token')
    const shouldLogout = urlSearchParams.get('logout')
    const refetch = urlSearchParams.get('refetch_profile')

    if (token && token.length > 0) {
      goto('/');
      dispatch(login(urlSearchParams.get('token') as string, goto));
    }
    if ( shouldLogout && shouldLogout === 'true') {
      dispatch(logout());
    }
    if (refetch && refetch === 'true') {
        dispatch(fetchProfile())
    }
    return;
}
