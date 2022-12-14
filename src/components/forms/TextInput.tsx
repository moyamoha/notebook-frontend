type TextInputPropType = {
  label: string;
  value: string;
  field: string;
  setState: (key: string, v: string) => void;
};

export default function TextInput({
  label,
  value,
  field,
  setState,
}: TextInputPropType) {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setState(field, e.target.value)}
        required={true}
      ></input>
    </div>
  );
}
