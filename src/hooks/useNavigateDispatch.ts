import React from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../state/hooks';

export default function useNavigateDispatch() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return [navigate, dispatch];
}
