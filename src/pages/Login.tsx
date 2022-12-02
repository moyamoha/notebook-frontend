import { FormEvent, useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import EmailInput from '../components/forms/EmailInput';
import PasswordInput from '../components/forms/PasswordInput';
import { login } from '../state/api/user.api';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import '../styles/login-signup-page.css';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const loading = useAppSelector((s) => s.ui.loginButtonLoading);

  const changeState = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login(formData, navigate));
  };
  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <EmailInput value={formData.email} setState={changeState}></EmailInput>
        <PasswordInput
          value={formData.password}
          setState={changeState}
        ></PasswordInput>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <hr style={{ marginBottom: '10px' }}></hr>
        <p>
          Not having an account?{' '}
          <Link to="/signup" className="white-link">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
}
