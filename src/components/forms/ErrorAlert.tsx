import React from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setError } from '../../state/slices/ui.slice';

export default function ErrorAlert() {
  const error = useAppSelector((s) => s.ui.error);
  const dispatch = useAppDispatch();
  const closeError = () => {
    dispatch(setError(''));
  };
  return (
    <>
      {error !== '' ? (
        <div className="error-alert">
          <span>{error}</span>
          <span onClick={closeError} className="error-alert-closer">
            X
          </span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
