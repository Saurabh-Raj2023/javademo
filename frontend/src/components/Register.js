import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        username,
        email,
        password,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify(newUser);

      const res = await axios.post('https://your-deployed-backend.herokuapp.com/users/register', body, config);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
