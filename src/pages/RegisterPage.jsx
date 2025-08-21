import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../features/auth/authSlice';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { NotificationContext } from '../components/NotificationProvider';
import bcrypt from 'bcryptjs';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { notify } = useContext(NotificationContext);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (localStorage.getItem('accessToken')) {
      navigate('/');
      return;
    }
    if (status === 'succeeded') {
      notify('Registration successful! Please login.', 'success');
      navigate('/login');
    } else if (status === 'failed' && error) {
      setShowAlert(true);
    }
  }, [status, error, notify, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(false);
    // Hash the password before sending (use same salt rounds as backend)
    const hashedPassword = await bcrypt.hash(form.password, 10);
    dispatch(register({ ...form, password: hashedPassword }));
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h4" mb={2}>Register</Typography>
      {showAlert && error && (
        <Alert severity="error" onClose={() => setShowAlert(false)}>
          {typeof error === 'object' && error?.message ? error.message : error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={status === 'loading'}
          sx={{ mt: 2 }}
        >
          {status === 'loading' ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </Box>
  );
};

export default RegisterPage;
