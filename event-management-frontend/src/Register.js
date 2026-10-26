import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords don't match");
        return;
      }

      const response = await axios.post('http://localhost:5000/register', { username, password, phoneNo, email, address});
      if (response.status === 201) {
        console.log('User registered successfully');
        // Redirect to login page
        navigate('/login');
      } else {
        console.error('Registration failed'); 
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
            <a href="/login" style={buttonStyle}>Login</a>
            <a href="#" style={buttonStyle1}>Register</a>
            <h1></h1>
              {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="PhoneNo" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <button type="button" className="btn btn-primary w-100" onClick={handleRegister}>Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#FFA500',
  color: '#fff',
  textDecoration: 'none',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  marginLeft: '160px' // Adjust spacing between buttons
};

const buttonStyle1 = {
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#FFA500',
  color: '#fff',
  textDecoration: 'none',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  marginLeft: '10px' // Adjust spacing between buttons
};


export default Register;
