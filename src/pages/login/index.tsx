import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { socialMediaAcc } from '../../utils/socialMediaAccounts';
import { IMAGES } from '../../utils/common/images';
import ButtonWithLink from '../../components/button/buttonWithLink';



const Login = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
            <Row className="w-100">
                <Col md={6} className="d-flex align-items-center flex-column justify-content-center">
                    <Form noValidate validated={validated} onSubmit={handleSubmit} className='gap-3' style={{ width: '100%', maxWidth: '400px' }}>
                        <div className="d-flex flex-column gap-3">
                            <h2 className="text-center text-md-start fw-bold">Sign In</h2>

                            <h6 className='text-center text-md-start'>New user? <span className='text-primary'>Create an account</span> </h6>

                            <div className='d-flex flex-column gap-1'>
                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Control required type="text" placeholder="Username or email" />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid email or username.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="pswd" className="mb-3">
                                    <Form.Control required type="password" placeholder="Password" />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid password.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Check label="Keep me signed in" />
                                </Form.Group>

                                <Button variant='dark' type="submit" className="w-100">Login</Button>
                            </div>


                            <div className="d-flex w-100 my-3 align-items-center">
                                <div className="flex-grow-1 border-top bg-danger"></div>
                                <span className="mx-3 text-muted">Or Sign In With</span>
                                <div className="flex-grow-1 border-top bg-danger"></div>
                            </div>
                            <div className="d-flex align-items-center justify-content-evenly">
                                {socialMediaAcc.map(({ id, link, icon }) => (
                                    <ButtonWithLink id={id} link={link} icon={icon} />
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
