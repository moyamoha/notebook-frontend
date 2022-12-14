export default function NotelistPlaceholder({
  canAddNew,
}: {
  canAddNew: boolean;
}) {
  return (
    <div className="note-list-placeholder">
      <span>{canAddNew ? 'Nothing here Yet' : 'Nothing here'}</span>
    </div>
  );
}
