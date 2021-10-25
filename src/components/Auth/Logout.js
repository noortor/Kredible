import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext"
// import "../.././index.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const Logout = () => {
    const { user, logout } = useAuth();
    const history = useHistory();

    const handleLogout = async () => {
        try {
            await logout();
            history.push("/login");
        } catch {
            console.log("pain");
        }
    }

    return (
        <div className="logout">
            <Button variant="link" onClick={handleLogout}>
                Log Out
            </Button>
        </div>
    )
}

export default Logout;
