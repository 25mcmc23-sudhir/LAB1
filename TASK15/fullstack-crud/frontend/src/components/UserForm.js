import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/users";

function UserForm() {
    const [user, setUser] = useState({ name: "", email: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(API, user);
            window.location.reload(); // simple refresh
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Name"
                required
                onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
                placeholder="Email"
                required
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <button type="submit">Add User</button>
        </form>
    );
}

export default UserForm;
