import { editProfile } from '../../../state/api/user.api';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import Toggle from '../../common/Toggle';

export default function Preferences() {
  const dispatch = useAppDispatch();
  const copyOnlyText = useAppSelector((s) => s.user.profile.copyNoteAsTextOnly);

  const handleSetCopyOnlyTextToggleClick = () => {
    dispatch(editProfile('copyNoteAsTextOnly', !copyOnlyText));
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
