import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Css/Signup.css'

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    UserName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        axios.post("http://localhost:3000/api/signup", {
            username: formData.UserName,
            email: formData.email,
            password: formData.password
        })
        .then(result => {
            console.log(result)
            navigate('/home')
        })
        .catch(err => console.log(err))
    }

  return (
    <div className="container">
      <div className="signup-page">
        <form onSubmit={handleSubmit}>
          <p>Create your account</p>
          <label htmlFor="UserName">Username:</label>
          <input
            type="text"
            id="UserName"
            name="UserName"
            placeholder="Enter your username"
            value={formData.UserName}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{10,}"
            title="Password must contain at least 10 characters, including at least One Number, One Uppercase letter, One Lowercase letter and one Special Character."
            required
          />

          <button className="SignUpBtn" type="submit">
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;