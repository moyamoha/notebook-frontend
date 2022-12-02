import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formats, module } from './editor-config';

import '../../styles/editor.css';
import NoteOptions from './NoteOptions';

export default function RichEditor() {
  const [convertedText, setConvertedText] = useState('');
  return (
    <div className="editor">
      <ReactQuill
        theme="snow"
        value={convertedText}
        onChange={setConvertedText}
        formats={formats}
        modules={module}
        style={{ height: 'calc(100vh - 82px)' }}
      />
      <NoteOptions></NoteOptions>
    </div>
  );
}
