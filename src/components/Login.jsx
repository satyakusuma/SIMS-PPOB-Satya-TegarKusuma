import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetState } from '../redux/loginSlice';
import imgReg from '../assets/Illustrasi Login.png';
import logo from '../assets/Logo.png';
import './Register.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);

  const { loading, success, error, token } = loginState || {};

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert("Format email tidak valid!");
      return;
    }

    if (formData.password.length < 8) {
      alert("Panjang password minimal 8 karakter!");
      return;
    }

    const data = {
      email: formData.email,
      password: formData.password
    };
    dispatch(loginUser(data));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (success) {
      alert('Login berhasil!');
      localStorage.setItem('token', token);
      navigate('/homepage');
      dispatch(resetState());
    }
  }, [success, token, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      alert(`Login gagal: ${error.message}`);
      dispatch(resetState());
    }
  }, [error, dispatch]);

  return (
    <Container fluid className="vh-100 d-flex align-items-center register-container">
      <Row className="w-100">
        <Col md={6} className="d-flex flex-column justify-content-center form-container">
          <h2 className="mb-3 text-center">
            <img src={logo} alt="Logo" className="logo-small me-2"/>
            SIMS PPOB
          </h2>
          <h2 className="mb-4 text-center">Masuk atau buat akun untuk memulai</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3 position-relative">
              <i className="ri-at-line input-icon-left"></i>
              <Form.Control
                type="email"
                name="email"
                placeholder="masukkan email anda"
                required
                className="pl-5"
                onChange={handleChange}
                value={formData.email}
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3 position-relative">
              <i className="ri-lock-2-line input-icon-left"></i>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="masukkan password"
                required
                className="pr-5 pl-5"
                onChange={handleChange}
                value={formData.password}
              />
              <i
                className={showPassword ? "ri-eye-line input-icon-right" : "ri-eye-off-line input-icon-right"}
                onClick={togglePasswordVisibility}
              ></i>
            </Form.Group>
            <Button variant="danger" type="submit" className="w-100" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </Form>
          <p className="mt-3 text-center">Belum punya akun? Registrasi <a href="/register" className="text-danger">di sini</a></p>
        </Col>
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <img src={imgReg} alt="Illustration" className="img-fluid register-image" />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
