import React, { useRef, useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch (error) {
            console.log(error)
            setError("Failed to log in");
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
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="password" ref={passwordRef} required />
                                </Form.Group>
                                <Button disabled={loading} variant="secondary" className="w-100 auth-button" type="submit">
                                    Log In
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>

            </Container>

        </div>
    )
}

export default Login;