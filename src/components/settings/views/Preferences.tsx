import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { setCopyNoteAsTextOnly } from '../../../state/slices/preferences.slice';
import Toggle from '../../common/Toggle';

export default function Preferences() {
  const dispatch = useAppDispatch();
  const copyOnlyText = useAppSelector((s) => s.preferences.copyNoteAsTextOnly);

  const handleSetCopyOnlyTextToggleClick = () => {
    dispatch(setCopyNoteAsTextOnly(!copyOnlyText));
  };

  return (
    <div>
      <div className="preference-row">
        <span>Copy note as plain text</span>
        <Toggle
          data={copyOnlyText}
          setData={handleSetCopyOnlyTextToggleClick}
        ></Toggle>
      </div>
    </div>
  );
}
