import React, { useRef, useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

const SignUp = () => {
    const usernameRef = useRef();
    const emailRef = useRef();
    const phoneNumberRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match!");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch (error) {
            console.log(error)
            setError("Failed to create an account");
        }
        setLoading(false);

    }
    return (
        <div>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="w-100 auth" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4 auth-title">Kredible</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="username">
                                    <Form.Label>Enter a Username</Form.Label>
                                    <Form.Control placeholder="username" ref={usernameRef} required />
                                </Form.Group>
                                <Form.Group id="email">
                                    <Form.Label>Your Parent or Guardian's Email</Form.Label>
                                    <Form.Control type="email" placeholder="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="username">
                                    <Form.Label>Your Parent or Guardian's Phone Number</Form.Label>
                                    <Form.Control placeholder="phone number" ref={phoneNumberRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Enter a Password</Form.Label>
                                    <Form.Control type="password" placeholder="password" ref={passwordRef} required />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Enter the Password Again</Form.Label>
                                    <Form.Control type="password" placeholder="password" ref={passwordConfirmRef} required />
                                </Form.Group>
                                <Button disabled={loading} variant="secondary" className="w-100 auth-button" type="submit">
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </div>

            </Container>

        </div>
    )
}

export default SignUp;