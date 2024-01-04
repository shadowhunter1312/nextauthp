// pages/login.js
"use client"
// pages/login.js
import { useState } from 'react';
import  './login.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error,setError] =useState(null)

  const handleLogin = async (e) => {
    e.preventDefault();
    // Validation: Check if any field is empty
       if (!email || !password  ) {
         setError("All fields are required");
         return;
       }

  try { 
    // Use signIn function to initiate local login
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Important: Set redirect to false
    });

    // Check if the login was successful
    if (result.error) {
      // Handle login error
      console.error(result.error);
    } else {
      // Redirect to the desired location after successful login
      router.push('/'); // Replace with your desired URL
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
  }
  };

  const handleTwitterLogin = (e) => {
    e.preventDefault();

    // Implement Twitter login logic here
    // Redirect the user to the Twitter authorization URL
    signIn('twitter',{ callbackUrl: 'http://localhost:3000/' });
  };

  return (
    <div className="container"><div className="row" >
    <div className="col-lg-12" style={{justifyContent:'center'}}>
    <div className="card" style={{maxWidth:'800px'}}>

      <div className="card__header">
        <h4>Login to your Account</h4>
      </div>
      <div className="card__content">
        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="login-name">Your Email</label>
            <input
              type="email"
              name="email"
              value={email}
          onChange={(e) => setEmail(e.target.value)}
              id="login-name"
              className="form-control"
              placeholder="Enter your email address..."
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Your Password</label>
            <input
              type="password"
              value={password}
          onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="login-password"
              className="form-control"
              placeholder="Enter your password..."
              required
            />
          </div>
          <div className="form-group form-group--password-forgot">
            <label className="checkbox checkbox-inline">
              <input type="checkbox" id="inlineCheckbox1" value="option1" checked readOnly/>
              Remember Me
              <span className="checkbox-indicator"></span>
            </label>
            <span className="password-reminder">
              Forgot your password? <a href="#">Click Here</a>
            </span>
          </div>
          <div className="form-group form-group--sm">
            <button type="submit" className="btn btn-primary-inverse btn-lg btn-block" onClick={handleLogin} >
              Sign in to your account
            </button>
          </div>
       
          <div className="form-group form-group--sm">
            
       
              <button className="btn btn-twitter btn-lg btn-icon btn-block" onClick={handleTwitterLogin}>
                <i className="fab fa-twitter"></i> Sign in via Twitter
              </button>
            </div>
            </form>
        
        {/* Login Form / End */}
      </div>
    </div></div></div>
</div>
  );
};

export default Login;





