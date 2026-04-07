import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Eye, EyeOff, Mail, KeyRound, CheckCircle } from 'lucide-react';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
  // Registration Flow Steps: 1 (Email/User), 2 (OTP Check), 3 (Password Create)
  const [signupStep, setSignupStep] = useState(1);
  
  const [username, setUsername] = useState('demo_user');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccessMsg('');
    setUsername('');
    setPassword('');
    setEmail('');
    setOtp('');
    setSignupStep(1);
  };

  useEffect(() => {
    if (isLogin && !username && !password) {
      setUsername('demo_user');
      setPassword('password123');
    }
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    
    if (isLogin && username === 'demo_user' && password === 'password123') {
      navigate('/dashboard');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        // ---- LOGIN PROCESS ----
        const res = await axios.post('http://localhost:5000/api/auth/login', { identifier: username, password });
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } else {
        // ---- SIGNUP APIS FLOW ----
        if (signupStep === 1) {
          // Hit Send-OTP logic
          const res = await axios.post('http://localhost:5000/api/auth/send-otp', { username, email });
          setSuccessMsg("OTP Sent! Please check your real email inbox.");
          setSignupStep(2);
        } else if (signupStep === 2) {
          // Verify exact OTP
          await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
          setSuccessMsg("Email Verified! Set up your password.");
          setSignupStep(3);
        } else if (signupStep === 3) {
          // Final Registration
          const res = await axios.post('http://localhost:5000/api/auth/register', { username, email, otp, password });
          localStorage.setItem('token', res.data.token);
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-darkBg flex items-center justify-center p-4 z-50">
      <div className="bg-cardBg w-full max-w-md rounded-3xl p-8 border border-[#27272a] shadow-2xl relative glow-primary animate-in zoom-in duration-500 text-center">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
        
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 glow-primary mt-4 transition-all duration-300">
          {(!isLogin && signupStep === 2) ? <Mail className="text-white" size={32} /> : 
           (!isLogin && signupStep === 3) ? <CheckCircle className="text-white" size={32} /> : 
           <ShieldAlert className="text-white" size={32} />}
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">
          {isLogin ? 'MindGuard AI' : 
           signupStep === 1 ? 'Create Account' : 
           signupStep === 2 ? 'Verify Email' : 'Secure Account'}
        </h1>
        
        <p className="text-gray-400 mb-8">
          {isLogin ? 'Sign in to track your digital wellness.' : 
           signupStep === 1 ? 'Step 1: Identity Information' :
           signupStep === 2 ? `We sent a 6-digit code to ${email}` : 'Step 3: Create a strong password'}
        </p>

        {error && <div className="bg-danger/10 text-danger border border-danger/30 p-3 rounded-xl mb-4 text-sm animate-in fade-in">{error}</div>}
        {successMsg && <div className="bg-success/10 text-success border border-success/30 p-3 rounded-xl mb-4 text-sm animate-in fade-in">{successMsg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {(isLogin || signupStep === 1) && (
            <div className="animate-in fade-in">
              <input 
                type="text" 
                placeholder={isLogin ? "Username or Email (e.g. hello@gmail.com)" : "Choose a Username"} 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-darkBg border border-[#27272a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
          )}

          {!isLogin && signupStep === 1 && (
            <div className="animate-in fade-in zoom-in duration-300">
              <input 
                type="email" 
                placeholder="Email Address (e.g., example@gmail.com)" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-darkBg border border-[#27272a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
          )}

          {!isLogin && signupStep === 2 && (
            <div className="relative animate-in slide-in-from-right-8 duration-300">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                placeholder="6-Digit OTP Code" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-darkBg border border-[#27272a] rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors tracking-widest font-mono text-center text-lg shadow-inner"
                required
                maxLength="6"
              />
            </div>
          )}

          {(isLogin || signupStep === 3) && (
            <div className="relative animate-in fade-in duration-300">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-darkBg border border-[#27272a] rounded-xl px-4 py-3 pr-12 text-white focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          )}
          
          <button 
            type="submit"
            disabled={loading}
            className={`w-full bg-primary text-white font-bold py-3 rounded-xl transition-all duration-300 mt-4 ${loading ? 'opacity-50' : 'hover:bg-violet-600 glow-primary shadow-lg'} hover:scale-[1.02]`}
          >
            {loading ? 'Processing...' : 
             isLogin ? 'Sign In' : 
             signupStep === 1 ? 'Send Verification Code' :
             signupStep === 2 ? 'Verify OTP' : 'Complete Registration'}
          </button>
        </form>
        
        <p className="text-gray-400 mt-6 text-sm text-center">
          {isLogin ? (
            <>Don't have an account? <span onClick={toggleMode} className="text-primary font-medium cursor-pointer hover:underline">Sign up</span></>
          ) : (
            <>Already have an account? <span onClick={toggleMode} className="text-primary font-medium cursor-pointer hover:underline">Sign in</span></>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
