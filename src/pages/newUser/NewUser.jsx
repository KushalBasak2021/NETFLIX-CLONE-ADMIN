import { useContext } from "react";
import { useState } from "react";
import { createUser } from "../../context/userContext/UserApiCalls";
import { UserContext } from "../../context/userContext/UserContext";
import "./newUser.css";
import { useHistory } from "react-router-dom";

export default function NewUser() {
  const [user, setuser] = useState(null);
  const history = useHistory();

  const { dispatch } = useContext(UserContext);

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    createUser(user, dispatch);
    history.push("/users");
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="john"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="john@gmail.com"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button className="newUserButton" onClick={handleCreate}>
          Create
        </button>
      </form>
    </div>
  );
}
