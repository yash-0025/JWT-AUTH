import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {registerUser} from "../redux/slices/authSlice";


const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        dispatch(registerUser({username, password}));
    };

    return (
        <div>
          <h2>Signup</h2>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Signup</button>
          </form>
        </div>
      );
}

export default Signup;