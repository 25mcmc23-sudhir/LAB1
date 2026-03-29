import React from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
    return (
        <div className="container">
            <h1>User CRUD App</h1>
            <UserForm />
            <UserList />
        </div>
    );
}

export default App;
