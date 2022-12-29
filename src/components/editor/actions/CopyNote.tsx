import { htmlToText } from 'html-to-text';
import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { BiCopy } from 'react-icons/bi';
import { useAppSelector } from '../../../state/hooks';

export default function CopyNote({ editorValue }: { editorValue: string }) {
  const copyNoteAsTextOnly = useAppSelector(
    (s) => s.user.profile.copyNoteAsTextOnly,
  );

  const [showCopied, setShowCopied] = React.useState(false);

  const handleCopyNote = () => {
    if (showCopied) return;
    const textToCopy = copyNoteAsTextOnly
      ? htmlToText(editorValue)
      : editorValue;
    window.navigator.clipboard.writeText(textToCopy);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  return (
    <div className="note-option" onClick={handleCopyNote}>
      {showCopied ? (
        <>
          <AiOutlineCheck></AiOutlineCheck>
          <span style={{ fontSize: '0.7rem' }}>Copied</span>
        </>
      ) : (
        <BiCopy></BiCopy>
      )}
    </div>
  );
}
