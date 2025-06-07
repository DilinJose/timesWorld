import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { socialMediaAcc } from '../../utils/socialMediaAccounts';
import { IMAGES } from '../../utils/common/images';
import ButtonWithLink from '../../components/button/buttonWithLink';
import { useNavigate } from 'react-router';

interface LoginErrors {
    email?: string;
    password?: string;
    general?: string;
}

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<LoginErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [keepSignedIn, setKeepSignedIn] = useState(false);

    // Email validation
    const validateEmail = (value: string): string | undefined => {
        const trimmedValue = value.trim();
        
        if (!trimmedValue) {
            return 'Email or username is required';
        }
        
        // Check if it's an email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (trimmedValue.includes('@') && !emailPattern.test(trimmedValue)) {
            return 'Please enter a valid email address';
        }
        
        // Username validation (if not email)
        if (!trimmedValue.includes('@') && trimmedValue.length < 3) {
            return 'Username must be at least 3 characters long';
        }
        
        return undefined;
    };

    // Password validation
    const validatePassword = (value: string): string | undefined => {
        if (!value) {
            return 'Password is required';
        }
        
        if (value.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[@$!%*?&]/.test(value);
        
        if (!hasUppercase) {
            return 'Password must contain at least one uppercase letter';
        }
        
        if (!hasNumber) {
            return 'Password must contain at least one number';
        }
        
        if (!hasSpecialChar) {
            return 'Password must contain at least one special character (@$!%*?&)';
        }
        
        return undefined;
    };

    // Real-time validation on blur
    const handleEmailBlur = () => {
        const emailError = validateEmail(email);
        setErrors(prev => ({ ...prev, email: emailError }));
    };

    const handlePasswordBlur = () => {
        const passwordError = validatePassword(password);
        setErrors(prev => ({ ...prev, password: passwordError }));
    };

    // Clear errors when user starts typing
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (errors.email) {
            setErrors(prev => ({ ...prev, email: undefined }));
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (errors.password) {
            setErrors(prev => ({ ...prev, password: undefined }));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Clear previous errors
        setErrors({});
        
        // Validate all fields
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        
        const newErrors: LoginErrors = {};
        if (emailError) newErrors.email = emailError;
        if (passwordError) newErrors.password = passwordError;
        
        // If there are errors, don't submit
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setIsLoading(true);
        
        try {
            // Simulate API call
            // Replace this with your actual authentication logic
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // For demo purposes, simulate success
            // In real app, check response from your auth API
            console.log('Login attempt:', { 
                email: email.trim(), 
                keepSignedIn 
            });
            
            // Redirect on success
            navigate('/home');
            
        } catch (error) {
            setErrors({ general: 'Login failed. Please check your credentials and try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateAccount = () => {
        navigate('/register'); // or wherever your registration page is
    };

    return (
        <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
            <Row className="w-100">
                <Col md={6} className="d-flex align-items-center flex-column justify-content-center">
                    <Form onSubmit={handleSubmit} className="gap-3" style={{ width: '100%', maxWidth: '400px' }}>
                        <div className="d-flex flex-column gap-3">
                            <h2 className="text-center text-md-start fw-bold">Sign In</h2>

                            <h6 className="text-center text-md-start">
                                New user?{' '}
                                <span 
                                    className="text-primary" 
                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                    onClick={handleCreateAccount}
                                >
                                    Create an account
                                </span>
                            </h6>

                            {errors.general && (
                                <Alert variant="danger" className="py-2">
                                    {errors.general}
                                </Alert>
                            )}

                            <div className="d-flex flex-column gap-3">
                                <Form.Group controlId="email">
                                    <Form.Control
                                        type="text"
                                        placeholder="Username or email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        onBlur={handleEmailBlur}
                                        isInvalid={!!errors.email}
                                        disabled={isLoading}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        onBlur={handlePasswordBlur}
                                        isInvalid={!!errors.password}
                                        disabled={isLoading}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-0">
                                    <Form.Check 
                                        type="checkbox"
                                        label="Keep me signed in" 
                                        checked={keepSignedIn}
                                        onChange={(e) => setKeepSignedIn(e.target.checked)}
                                        disabled={isLoading}
                                    />
                                </Form.Group>

                                <Button 
                                    variant="dark" 
                                    type="submit" 
                                    className="w-100"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Signing In...' : 'Sign In'}
                                </Button>
                            </div>

                            <div className="d-flex w-100 my-3 align-items-center">
                                <div className="flex-grow-1 border-top"></div>
                                <span className="mx-3 text-muted">Or Sign In With</span>
                                <div className="flex-grow-1 border-top"></div>
                            </div>
                            
                            <div className="d-flex align-items-center justify-content-evenly">
                                {socialMediaAcc.map(({ id, link, icon }) => (
                                    <ButtonWithLink key={id} id={id} link={link} icon={icon} />
                                ))}
                            </div>
                        </div>
                    </Form>
                </Col>
                <Col md={6} className="d-none d-md-flex align-items-center justify-content-center">
                    <img
                        src={IMAGES.walkingFigure}
                        alt="Login illustration"
                        className="img-fluid"
                        style={{ maxHeight: '400px' }}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Login;