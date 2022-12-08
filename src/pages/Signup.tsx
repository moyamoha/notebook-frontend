import { FormEvent, useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import EmailInput from '../components/forms/EmailInput';
import { login, signup } from '../state/api/user.api';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import '../styles/login-signup-page.css';
import '../styles/forms.css';
import TextInput from '../components/forms/TextInput';
import PasswordInput from '../components/forms/PasswordInput';
import { Link, NavLink } from 'react-router-dom';
import { setError } from '../state/slices/ui.slice';
import ErrorAlert from '../components/forms/ErrorAlert';

export default function Signup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((s) => s.ui.signupBtnLoading);
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password1: '',
    password2: '',
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
