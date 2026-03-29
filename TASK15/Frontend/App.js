import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; 

function App() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", age: "" });
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await axios.get("http://localhost:5000/users");
        setUsers(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            const updatedUsers = users.map((u) =>
                u.id === editingId ? { ...form, id: editingId } : u,
            );
            setUsers(updatedUsers);
            try {
                await axios.put(`http://localhost:5000/users/${editingId}`, form);
            } catch {
                fetchUsers();
            }
            setEditingId(null);
        } else {
            const newUser = { ...form };
            setUsers([...users, newUser]);
            try {
                const res = await axios.post("http://localhost:5000/users", form);
                setUsers([...users, res.data]);
            } catch {
                fetchUsers();
            }
        }
        setForm({ name: "", email: "", age: "" });
    };

    const handleDelete = async (id) => {
        const oldUsers = [...users];
        setUsers(users.filter((u) => u.id !== id));
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
        } catch {
            setUsers(oldUsers);
        }
    };

    const filteredUsers = users
        .filter((u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    );

    return (
        <div className="container">
            <h1>User Management</h1>

            <input
                className="search"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <form className="form" onSubmit={handleSubmit}>
                <input
                    value={form.name}
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    value={form.email}
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    value={form.age}
                    placeholder="Age"
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
                <button type="submit">{editingId ? "Update" : "Add"} User</button>
            </form>

            <ul className="user-list">
                {paginatedUsers.map((user) => (
                    <li key={user.id} className="user-item">
                        <span>
                            {user.name} - {user.email} - {user.age}
                        </span>
                        <div className="actions">
                            <button
                                className="edit"
                                onClick={() => {
                                    setForm(user);
                                    setEditingId(user.id);
                                }}>
                                Edit
                            </button>
                            <button className="delete" onClick={() => handleDelete(user.id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredUsers.length / pageSize) }, (_, i) => (
                    <button
                        key={i}
                        className={currentPage === i + 1 ? "active" : ""}
                        onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default App;
