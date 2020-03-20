import React, { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";

import PostCard from "./components/PostCard";
import UserCard from "./components/UserCard";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  console.log(users);

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} name={user.name} />
      ))}
    </div>
  );
}

export default App;
