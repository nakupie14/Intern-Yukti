import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    educationLevel: '',
    preferredLanguage: 'en',
    agreeToTerms: false,
    agreeToPrivacy: false,
    subscribeNewsletter: false
  });
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const educationLevels = [
    { value: 'high-school', label: 'High School' },
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'postgraduate', label: 'Postgraduate' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिंदी (Hindi)' },
    { value: 'ta', label: 'தமிழ் (Tamil)' },
    { value: 'te', label: 'తెలుగు (Telugu)' },
    { value: 'bn', label: 'বাংলা (Bengali)' },
    { value: 'mr', label: 'मराठी (Marathi)' },
    { value: 'gu', label: 'ગુજરાતી (Gujarati)' },
    { value: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
    { value: 'ml', label: 'മലയാളം (Malayalam)' },
    { value: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    setFormData(prev => ({ ...prev, preferredLanguage: savedLanguage }));
  }, []);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 1;
    if (/[a-z]/?.test(password)) strength += 1;
    if (/[A-Z]/?.test(password)) strength += 1;
    if (/[0-9]/?.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 1;
    return strength;
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value?.trim()) return 'Full name is required';
        if (value?.trim()?.length < 2) return 'Name must be at least 2 characters';
        return '';
      
      case 'email':
        if (!value) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex?.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'password':
        if (!value) return 'Password is required';
        if (value?.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(value)) {
          return 'Password must contain uppercase, lowercase, and number';
        }
        return '';
      
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData?.password) return 'Passwords do not match';
        return '';
      
      case 'educationLevel':
        if (!value) return 'Please select your education level';
        return '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Validate field if it has been touched
    if (touchedFields?.[name]) {
      const error = validateField(name, fieldValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (touchedFields?.[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e?.target;
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData)?.forEach(key => {
      if (key !== 'subscribeNewsletter') {
        const error = validateField(key, formData?.[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms of service';
    }

    if (!formData?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data
      const userData = {
        id: Date.now(),
        fullName: formData?.fullName,
        email: formData?.email,
        educationLevel: formData?.educationLevel,
        preferredLanguage: formData?.preferredLanguage,
        createdAt: new Date()?.toISOString()
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('language', formData?.preferredLanguage);
      localStorage.setItem('registrationComplete', 'true');
      
      // Navigate to landing page with success message
      navigate('/landing-page', { 
        state: { 
          message: 'Account created successfully! Please check your email to verify your account.',
          type: 'success'
        }
      });
      
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-error';
    if (passwordStrength <= 2) return 'bg-warning';
    if (passwordStrength <= 3) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 2) return 'Fair';
    if (passwordStrength <= 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors?.fullName}
          required
        />

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors?.email}
          required
        />

        {/* Password */}
        <div className="space-y-2">
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {formData?.password && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Password strength:</span>
                <span className={`font-medium ${
                  passwordStrength <= 1 ? 'text-error' :
                  passwordStrength <= 2 ? 'text-warning' :
                  passwordStrength <= 3 ? 'text-accent' : 'text-success'
                }`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors?.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        {/* Education Level */}
        <Select
          label="Education Level"
          placeholder="Select your current education level"
          options={educationLevels}
          value={formData?.educationLevel}
          onChange={(value) => handleSelectChange('educationLevel', value)}
          error={errors?.educationLevel}
          required
        />

        {/* Preferred Language */}
        <Select
          label="Preferred Language"
          description="Choose your preferred language for the application"
          options={languageOptions}
          value={formData?.preferredLanguage}
          onChange={(value) => handleSelectChange('preferredLanguage', value)}
          searchable
        />

        {/* Terms and Privacy */}
        <div className="space-y-4">
          <Checkbox
            label="I agree to the Terms of Service"
            name="agreeToTerms"
            checked={formData?.agreeToTerms}
            onChange={handleInputChange}
            error={errors?.agreeToTerms}
            required
          />

          <Checkbox
            label="I agree to the Privacy Policy"
            name="agreeToPrivacy"
            checked={formData?.agreeToPrivacy}
            onChange={handleInputChange}
            error={errors?.agreeToPrivacy}
            required
          />

          <Checkbox
            label="Subscribe to newsletter for internship updates"
            description="Get weekly updates about new internship opportunities"
            name="subscribeNewsletter"
            checked={formData?.subscribeNewsletter}
            onChange={handleInputChange}
          />
        </div>

        {/* Submit Error */}
        {errors?.submit && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-md">
            <p className="text-sm text-error">{errors?.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="UserPlus"
          iconPosition="left"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;