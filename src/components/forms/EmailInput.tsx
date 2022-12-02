import React from 'react';

type EmailInputPropType = {
  value: string;
  setState: (key: string, v: string) => void;
};

export default function EmailInput({ value, setState }: EmailInputPropType) {
  return (
    <div className="form-field">
      <label>Email</label>
      <input
        type="email"
        value={value}
        onChange={(e) => setState('email', e.target.value)}
        required={true}
      ></input>
    </div>
  );
}
