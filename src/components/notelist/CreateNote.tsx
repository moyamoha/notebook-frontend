import { BsPlusCircle } from 'react-icons/bs';

export default function CreateNote() {
  const handleCreateNewNote = () => {};
  return (
    <div className="create-note" onClick={handleCreateNewNote}>
      <BsPlusCircle
        size={25}
        className="create-note-icon"
        onClick={handleCreateNewNote}
        title="create a new note"
      ></BsPlusCircle>
    </div>
  );
}
