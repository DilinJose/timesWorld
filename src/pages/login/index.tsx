import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { socialMediaAcc } from '../../utils/socialMediaAccounts';
import { IMAGES } from '../../utils/common/images';
import ButtonWithLink from '../../components/button/buttonWithLink';

interface FormData {
    email: string;
    password: string;
    keepSignedIn: boolean;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
            keepSignedIn: false,
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');

    const onSubmit = async (data: FormData) => {
        setGeneralError('');
        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Login success:', data);
            navigate('/home');
        } catch (error) {
            setGeneralError('Login failed. Please check your credentials and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
            <Row className="w-100">
                <Col md={6} className="d-flex align-items-center flex-column justify-content-center">
                    <Form onSubmit={handleSubmit(onSubmit)} className="gap-3" style={{ width: '100%', maxWidth: '400px' }}>
                        <div className="d-flex flex-column gap-3">
                            <h2 className="text-center text-md-start fw-bold">Sign In</h2>

                            <h6 className="text-center text-md-start">
                                New user?{' '}
                                <span
                                    className="text-primary"
                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                    onClick={() => navigate('/register')}
                                >
                                    Create an account
                                </span>
                            </h6>

                            {generalError && (
                                <Alert variant="danger" className="py-2">
                                    {generalError}
                                </Alert>
                            )}

                            <div className="d-flex flex-column gap-3">
                                <Form.Group controlId="email">
                                    <Form.Control
                                        style={{ borderRadius: 0 }}
                                        type="text"
                                        placeholder="Username or email"
                                        isInvalid={!!errors.email}
                                        disabled={isLoading}
                                        {...register('email', {
                                            required: 'Email or username is required',
                                            validate: value => {
                                                const trimmed = value.trim();
                                                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                                if (trimmed.includes('@') && !emailPattern.test(trimmed)) {
                                                    return 'Please enter a valid email address';
                                                }
                                                if (!trimmed.includes('@') && trimmed.length < 3) {
                                                    return 'Username must be at least 3 characters long';
                                                }
                                                return true;
                                            },
                                        })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Control
                                        type="password"
                                        style={{ borderRadius: 0 }}
                                        placeholder="Password"
                                        isInvalid={!!errors.password}
                                        disabled={isLoading}
                                        {...register('password', {
                                            required: 'Password is required',
                                            validate: value => {
                                                if (value.length < 8) return 'Password must be at least 8 characters long';
                                                if (!/[A-Z]/.test(value)) return 'Must contain at least one uppercase letter';
                                                if (!/\d/.test(value)) return 'Must contain at least one number';
                                                if (!/[@$!%*?&]/.test(value)) return 'Must include a special character (@$!%*?&)';
                                                return true;
                                            },
                                        })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Check
                                        style={{ borderRadius: 0 }}
                                        type="checkbox"
                                        label="Keep me signed in"
                                        disabled={isLoading}
                                        {...register('keepSignedIn')}
                                    />
                                </Form.Group>

                                <Button
                                    style={{ borderRadius: 0 }}
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
