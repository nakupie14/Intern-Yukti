import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import VoiceInputToggle from '../../components/ui/VoiceInputToggle';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import LoginHeader from './components/LoginHeader';
import BiometricLogin from './components/BiometricLogin';
import SecurityNotice from './components/SecurityNotice';
import RegisterPrompt from './components/RegisterPrompt';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();
  const location = useLocation();

  // Mock credentials for different user types
  const mockCredentials = {
    student: { email: 'student@example.com', password: 'student123' },
    graduate: { email: 'graduate@example.com', password: 'graduate123' },
    admin: { email: 'admin@example.com', password: 'admin123' }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const role = localStorage.getItem('role');

    if (isAuthenticated === 'true' && role) {
      // ✅ Auto redirect if already logged in
      if (role === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/landing-page", { replace: true });
      }
    }

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    const lockout = localStorage.getItem('accountLockout');
    if (lockout) {
      const lockoutData = JSON.parse(lockout);
      if (lockoutData?.until > Date.now()) {
        setIsLocked(true);
        setLockoutTime(lockoutData?.until);
      } else {
        localStorage.removeItem('accountLockout');
      }
    }

    const attempts = localStorage.getItem('loginAttempts');
    if (attempts) {
      setLoginAttempts(parseInt(attempts, 10));
    }
  }, [navigate, location]);

  const handleLogin = async (formData) => {
    if (isLocked) {
      setError('Account is temporarily locked. Please try again later.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // ✅ Check which role matches
      let role = null;
      Object.entries(mockCredentials).forEach(([key, cred]) => {
        if (cred.email === formData?.email && cred.password === formData?.password) {
          role = key;
        }
      });

      if (role) {
        const userData = {
          email: formData?.email,
          name:
            formData?.email?.split('@')?.[0]?.charAt(0)?.toUpperCase() +
            formData?.email?.split('@')?.[0]?.slice(1),
          role,
          loginTime: new Date()?.toISOString()
        };

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('role', role);

        if (formData?.rememberMe) {
          localStorage.setItem('rememberUser', 'true');
        }

        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('accountLockout');

        // ✅ Redirect by role
        if (role === "admin") {
          navigate("/admin-dashboard", { replace: true });
        } else {
          navigate("/landing-page", { replace: true });
        }
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        localStorage.setItem('loginAttempts', newAttempts?.toString());

        if (newAttempts >= 5) {
          const lockUntil = Date.now() + 15 * 60 * 1000;
          setIsLocked(true);
          setLockoutTime(lockUntil);
          localStorage.setItem('accountLockout', JSON.stringify({ until: lockUntil }));
          setError('Account locked due to too many failed attempts. Try again in 15 minutes.');
        } else {
          setError(`Invalid email or password. ${5 - newAttempts} attempts remaining.`);
        }
      }
    } catch (err) {
      setError('Login failed. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const userData = {
        email: `user@${provider}.com`,
        name: `${provider?.charAt(0)?.toUpperCase() + provider?.slice(1)} User`,
        provider: provider,
        role: "student", // default role for social logins
        loginTime: new Date()?.toISOString()
      };

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('role', "student");

      // Social logins → always student
      navigate("/internship-results", { replace: true });
    } catch (err) {
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = {
        email: 'biometric@user.com',
        name: 'Biometric User',
        authMethod: 'biometric',
        role: "student",
        loginTime: new Date()?.toISOString()
      };

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('role', "student");

      navigate("/internship-results", { replace: true });
    } catch (err) {
      setError('Biometric authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceResult = (transcript) => {
    const lowerTranscript = transcript?.toLowerCase();
    if (lowerTranscript?.includes('login') || lowerTranscript?.includes('sign in')) {
      document.querySelector('button[type="submit"]')?.click();
    } else if (lowerTranscript?.includes('register') || lowerTranscript?.includes('sign up')) {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="pt-16 pb-8">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-xl shadow-modal border border-border p-8 animate-fade-in">
            <LoginHeader />

            <div className="flex justify-center mt-6 mb-8">
              <LanguageSwitcher />
            </div>

            <SecurityNotice
              attempts={loginAttempts}
              isLocked={isLocked}
              lockoutTime={lockoutTime}
            />

            <LoginForm onLogin={handleLogin} isLoading={isLoading} error={error} />

            <div className="mt-6">
              <SocialLogin onSocialLogin={handleSocialLogin} isLoading={isLoading} />
            </div>

            <BiometricLogin onBiometricLogin={handleBiometricLogin} isLoading={isLoading} />

            <RegisterPrompt />
          </div>
        </div>
      </main>

      <VoiceInputToggle
        onVoiceResult={handleVoiceResult}
        onVoiceStart={() => {}}
        onVoiceEnd={() => {}}
        position="fixed"
      />
    </div>
  );
};

export default Login;
