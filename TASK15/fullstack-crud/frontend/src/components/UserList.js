import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/users";

function UserList() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const usersPerPage = 5;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await axios.get(API);
        setUsers(res.data);
    };

    /* DELETE with Optimistic UI */
    const deleteUser = async (id) => {
        const oldUsers = [...users];
        setUsers(users.filter((u) => u.id !== id));

        try {
            await axios.delete(`${API}/${id}`);
        } catch (err) {
            setUsers(oldUsers); // rollback
        }
    };

    /* FILTER */
    const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));

    /* SORT */
    const sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

    /* PAGINATION */
    const indexLast = page * usersPerPage;
    const indexFirst = indexLast - usersPerPage;
    const currentUsers = sorted.slice(indexFirst, indexLast);

    return (
        <div>
            <h2>User List</h2>

            {/* SEARCH INPUT */}
            <input
                className="search"
                placeholder="Search user..."
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* USER LIST */}
            {currentUsers.map((user) => (
                <div className="user" key={user.id}>
                    {user.name} - {user.email}
                    <button className="delete-btn" onClick={() => deleteUser(user.id)}>
                        Delete
                    </button>
                </div>
            ))}

            {/* PAGINATION */}
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Prev
                </button>

                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
}

export default UserList;
