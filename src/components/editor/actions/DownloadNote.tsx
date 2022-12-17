import { htmlToText } from 'html-to-text';
import { BiDownload } from 'react-icons/bi';
import { useAppSelector } from '../../../state/hooks';
import { Note } from '../../../state/types';
import {
  generateHtmlContentFromNote,
  getNFirstWords,
} from '../../../utils/functions';

export default function DownloadNote({ note }: { note: Note }) {
  const downloadNoteAsHtmlFile = useAppSelector(
    (s) => s.user.profile.downloadNoteAsHtml,
  );

  const downloadNote = () => {
    const text = htmlToText(note.content);
    const blob = new Blob(
      [downloadNoteAsHtmlFile ? generateHtmlContentFromNote(note) : text],
      { type: downloadNoteAsHtmlFile ? 'text/html' : 'text/plain' },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${getNFirstWords(text, downloadNoteAsHtmlFile ? 1 : 3)}.${
      downloadNoteAsHtmlFile ? 'html' : 'txt'
    }`;
    link.href = url;
    link.click();
    link.remove();
  };
  return (
    <div className="note-option" onClick={downloadNote}>
      <BiDownload></BiDownload>
    </div>
  );
}
