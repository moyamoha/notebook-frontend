type CustomSelectPropType = {
  label: string;
  value: string;
  field: string;
  options: string[];
  setState: (key: string, v: string) => void;
};

export default function CustomSelect({
  label,
  value,
  options,
  field,
  setState,
}: CustomSelectPropType) {
  return (
    <div className="form-field">
      <label>{label}</label>
      <select>
        {options.map((opt) => (
          <option
            value={opt}
            selected={opt === value}
            onClick={() => setState(field, opt)}
          >
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
