"use client";

import styles from "./register.module.css";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useSession } from 'next-auth/react';

const RegisterForm = () => {
  const router = useRouter();
  const session = useSession();
  const [name, setName] = useState('');
  const [username, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  if (session.status === 'authenticated') {
    router?.push('/my/dashboard');
  }

  const handleNameChange = (e) => {
    // Prevent spaces in the name field
    const inputValue = e.target.value;
    if (!inputValue.includes(' ')) {
      setName(inputValue);
    }
  };

  const handleEmailChange = (e) => {
    // Prevent spaces in the name field
    const inputValue = e.target.value;
    if (!inputValue.includes(' ')) {
      setEmail(inputValue);
    }
  };
  const validatePassword = (password) => {
    const minLength = 5;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasDigit 
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !username || !password || !confirmPassword) {
        setMessage("All fields are required");
        return;
      }

      if (password !== confirmPassword) {
  
        setMessage("Passwords don't match");
        return;
      } else if (!validatePassword(password)) {
        setMessage("Password must have at least 8 characters, including uppercase, lowercase,and digit");
        return;
      } else {
        setMessage(''); // Clear the error if passwords match and meet validation criteria
      }
      setMessage(null);
    


    try {
        const formData = {
            name,
            username,
            
            password
           
          };
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 201) {
        router.push('/login?success=Account has been created');
      } else {
        const data = await res.json();
        if (data.message) {
          console.error('Registration Error:', data.message);
          setMessage(data.message);
        } else {
          console.error('Unexpected response format:', data);
          setMessage('An unexpected error occurred during registration');
        }
      }
    } catch (err) {
        console.error('Registration Error:', err);
      setMessage('An error occurred during registration');
    }
  };

  return (
    <div className="card">
      <div className="card__header">
        <h4>Register Now</h4>
      </div>
      <div className="card__content">
        {/* Register Form */}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="register-name">Your Name</label>
            <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  value={name}
            onChange={(e) => handleNameChange(e)}
                  className="input-text"
                  placeholder="Your Name"
                  required=""
                />
          </div>
          <div className="form-group">
            <label htmlFor="register-name">Your Email</label>
            <input
                  type="username"
                  name="your-email"
                  id="your-email"
                  className="input-text"
                  value={username}
                  onChange={(e) => handleEmailChange(e)}
                  placeholder="Enter Twitter Id"
                  required=""
                  
                />
          </div>
          <div className="form-group">
            <label htmlFor="register-password">Your Password</label>
            <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
            onChange={(e) => setPassword(e.target.value)}
                  className="input-text"
                  placeholder="Your Password"
                  required=""
                />
          </div>
          <div className="form-group">
            <label htmlFor="repeat-password">Repeat Password</label>
            <input
                  type="password"
                  name="password"
                  id="cpassword"
                  value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-text"
                  placeholder="Confirm Password"
                  required=""
                />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-default btn-lg btn-block">
              Create Your Account
            </button>
          </div>
        </form>
        {/* Register Form / End */}
        {message && <small className="block text-red-600">{message}</small>}
      </div>
    </div>
  );
};

export default RegisterForm;
