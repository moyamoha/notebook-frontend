import { editProfile } from '../../../state/api/user.api';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import Toggle from '../../common/Toggle';

export default function Preferences() {
  const dispatch = useAppDispatch();
  const copyOnlyText = useAppSelector((s) => s.user.profile.copyNoteAsTextOnly);
  const downloadAsHtml = useAppSelector(
    (s) => s.user.profile.downloadNoteAsHtml,
  );

  const handleSetCopyOnlyTextToggleClick = () => {
    dispatch(editProfile('copyNoteAsTextOnly', !copyOnlyText));
  };

  const handleSetDownloadTypeToggleClick = () => {
    dispatch(editProfile('downloadNoteAsHtml', !downloadAsHtml));
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

      <div className="preference-row">
        <span>Download note as html file</span>
        <Toggle
          data={downloadAsHtml}
          setData={handleSetDownloadTypeToggleClick}
        ></Toggle>
      </div>
    </div>
  );
}
