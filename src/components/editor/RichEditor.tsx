import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Note } from '../../state/types';
import { useAppSelector } from '../../state/hooks';
import { formats, module } from './editor-config';
import NoteOptions from './NoteOptions';

import '../../styles/editor.css';

export default function RichEditor() {
  const note = useAppSelector((s) => s.note.currentNote) as Note;
  const [editorValue, setEditorValue] = useState(note.content);
  React.useEffect(() => {
    setEditorValue(note.content);
  }, [note]);
  return (
    <div className="editor">
      <div
        style={{
          fontSize: '1.2rem',
          overflowY: 'scroll',
        }}
      >
        <ReactQuill
          theme="snow"
          value={editorValue}
          onChange={setEditorValue}
          formats={formats}
          modules={module}
        />
      </div>
      <NoteOptions editorValue={editorValue}></NoteOptions>
    </div>
  );
}
