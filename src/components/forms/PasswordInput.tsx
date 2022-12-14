import { useState } from 'react';

import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

type PasswordInputPropType = {
  label?: string;
  value: string;
  field?: string;
  setState: (k: string, v: string) => void;
};

export default function PasswordInput({
  label,
  field,
  value,
  setState,
}: PasswordInputPropType) {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="form-field">
      <label>{label ? label : 'Password'}</label>
      <div className="password-field">
        <input
          type={showPass ? 'text' : 'password'}
          value={value}
          onChange={(e) => setState(field ? field : 'password', e.target.value)}
          required={true}
        ></input>
        {showPass ? (
          <BsEyeFill
            size={25}
            color="black"
            className="eye-icon"
            onClick={() => setShowPass(!showPass)}
          ></BsEyeFill>
        ) : (
          <BsEyeSlashFill
            size={25}
            color="black"
            className="eye-icon"
            onClick={() => setShowPass(!showPass)}
          ></BsEyeSlashFill>
        )}
      </div>
    </div>
  );
}
