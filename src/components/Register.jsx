import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetState } from '../redux/registrationSlice';
import imgReg from '../assets/Illustrasi Login.png';
import logo from '../assets/Logo.png';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.registration);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
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

    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }

    const data = {
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      password: formData.password
    };

    dispatch(registerUser(data));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    if (success) {
      alert('Registrasi berhasil!');
      navigate('/login');
      dispatch(resetState());
    }
  }, [success, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      alert(`Registrasi gagal: ${error}`);
      dispatch(resetState());
    }
  }, [error, dispatch]);

  return (
    <Container fluid className="vh-100 d-flex align-items-center register-container">
      <Row className="w-100">
        <Col md={6} className="d-flex flex-column justify-content-center">
          <div className="form-container">
            <h2 className="mb-3 text-center">
              <img src={logo} alt="Logo" className="logo-small me-2"/>
              SIMS PPOB
            </h2>
            <h2 className="mb-4 text-center">Lengkapi data untuk membuat akun</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="mb-3 position-relative">
                <i className="ri-at-line input-icon-left"></i>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="masukkan email anda"
                  required
                  className="pl-5 pr-5 form-control"
                  onChange={handleChange}
                  value={formData.email}
                />
              </Form.Group>
              <Form.Group controlId="formFirstName" className="mb-3 position-relative">
                <i className="ri-user-line input-icon-left"></i>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="nama depan"
                  required
                  className="pl-5 pr-5 form-control"
                  onChange={handleChange}
                  value={formData.firstName}
                />
              </Form.Group>
              <Form.Group controlId="formLastName" className="mb-3 position-relative">
                <i className="ri-user-line input-icon-left"></i>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="nama belakang"
                  required
                  className="pl-5 pr-5 form-control"
                  onChange={handleChange}
                  value={formData.lastName}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3 position-relative">
                <i className="ri-lock-2-line input-icon-left"></i>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="buat password"
                  required
                  className="pr-5 pl-5 form-control"
                  onChange={handleChange}
                  value={formData.password}
                />
                <i
                  className={showPassword ? "ri-eye-line input-icon-right" : "ri-eye-off-line input-icon-right"}
                  onClick={togglePasswordVisibility}
                ></i>
              </Form.Group>
              <Form.Group controlId="formConfirmPassword" className="mb-4 position-relative">
                <i className="ri-lock-2-line input-icon-left"></i>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="konfirmasi password"
                  required
                  className="pr-5 pl-5 form-control"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                />
                <i
                  className={showConfirmPassword ? "ri-eye-line input-icon-right" : "ri-eye-off-line input-icon-right"}
                  onClick={toggleConfirmPasswordVisibility}
                ></i>
              </Form.Group>
              <Button variant="danger" type="submit" className="w-100" disabled={loading}>
                {loading ? 'Loading...' : 'Registrasi'}
              </Button>
            </Form>
            <p className="mt-3 text-center">Sudah punya akun? Login <a href="/" className="text-danger">di sini</a></p>
          </div>
        </Col>
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <img src={imgReg} alt="Illustration" className="img-fluid register-image" />
        </Col>
      </Row>
    </Container>
  );
}

export default Register;