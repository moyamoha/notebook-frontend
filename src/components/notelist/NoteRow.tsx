import { htmlToText } from 'html-to-text';
import React from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { addToFavorites, removeFromFavorites } from '../../state/api/notes.api';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { Note } from '../../state/types';
import { getTwoFirstWords } from '../../utils/functions';
import '../../styles/note-list.css';
import HeartIcon from '../common/HeartIcon';
import { setCurrentNote } from '../../state/slices/note.slice';

type NoteRowPropsType = {
  note: Note;
};

export default function NoteRow({ note }: NoteRowPropsType) {
  const currentNote = useAppSelector((s) => s.note.currentNote);
  const dispatch = useAppDispatch();

  const handleNoteClick = () => {
    dispatch(setCurrentNote(note));
  };

  console.log(getTwoFirstWords(htmlToText(note.content)));
  return (
    <div
      className={
        currentNote && currentNote._id === note._id
          ? 'note-row selected'
          : 'note-row'
      }
      onClick={handleNoteClick}
    >
      <span>
        {note.content ? getTwoFirstWords(htmlToText(note.content)) : 'new note'}
      </span>
      <HeartIcon note={note}></HeartIcon>
    </div>
  );
}
