import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../state/hooks';
import { setError } from '../state/slices/ui.slice';
import { signup } from '../state/api/user.api';
import EmailInput from '../components/forms/EmailInput';
import TextInput from '../components/forms/TextInput';
import PasswordInput from '../components/forms/PasswordInput';
import ErrorAlert from '../components/forms/ErrorAlert';

import '../styles/forms.css';
import '../styles/login-signup-page.css';
import CustomSelect from '../components/forms/Select';

export default function Signup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((s) => s.ui.signupBtnLoading);
  const [formData, setFormData] = useState<{
    email: string;
    firstname: string;
    lastname: string;
    password1: string;
    password2: string;
    gender: 'male' | 'female';
  }>({
    email: '',
    firstname: '',
    lastname: '',
    password1: '',
    password2: '',
    gender: 'male',
  });

  const changeState = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.password1 !== formData.password2) {
      dispatch(setError('Passwords should match'));
      return;
    }
    dispatch(
      signup(
        {
          email: formData.email,
          firstname: formData.firstname,
          lastname: formData.lastname,
          password: formData.password1,
          gender: formData.gender,
        },
        navigate,
      ),
    );
  };
  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <EmailInput value={formData.email} setState={changeState}></EmailInput>
        <TextInput
          label="First name"
          field="firstname"
          value={formData.firstname}
          setState={changeState}
        ></TextInput>
        <TextInput
          label="Last name"
          field="lastname"
          value={formData.lastname}
          setState={changeState}
        ></TextInput>
        <PasswordInput
          value={formData.password1}
          label="Password"
          field="password1"
          setState={changeState}
        ></PasswordInput>
        <PasswordInput
          value={formData.password2}
          label="Confirm password"
          field="password2"
          setState={changeState}
        ></PasswordInput>
        <CustomSelect
          value={formData.gender}
          label="Your gender"
          field="gender"
          options={['male', 'female']}
          setState={changeState}
        ></CustomSelect>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
        <hr style={{ marginBottom: '10px' }}></hr>
        <p>
          Already have an account?{' '}
          <Link className="white-link" to="/login">
            Login
          </Link>
        </p>
        <ErrorAlert></ErrorAlert>
      </form>
    </div>
  );
}
