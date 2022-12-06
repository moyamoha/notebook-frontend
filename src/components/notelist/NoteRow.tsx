import { htmlToText } from 'html-to-text';
import React from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { addToFavorites, removeFromFavorites } from '../../state/api/notes.api';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { Note } from '../../state/types';
import { getTwoFirstWords } from '../../utils/functions';
import '../../styles/note-list.css';
import HeartIcon from '../common/HeartIcon';

type NoteRowPropsType = {
  note: Note;
};

export default function NoteRow({ note }: NoteRowPropsType) {
  return (
    <div className="note-row">
      <span>
        {note.content ? getTwoFirstWords(htmlToText(note.content)) : 'new note'}
      </span>
      <HeartIcon note={note}></HeartIcon>
    </div>
  );
}
