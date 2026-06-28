import React, { useState } from "react";

const Login = ({ setIsLoggedIn, setRole }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "Admin",
  });

  const [citizen, setCitizen] = useState({
    username: "",
    email: "",
  });

  const [isRegister, setIsRegister] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCitizenChange = (e) => {
    setCitizen({ ...citizen, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (user.role === "Citizen") {
      const res = await fetch("http://localhost:5000/citizen-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: citizen.username,
          email: citizen.email,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "Citizen");

        setRole("Citizen");
        setIsLoggedIn(true);
        alert(data.message);
      } else {
        alert(data.message);
      }

      return;
    }

    const loginDetails = {
      Admin: { username: "admin", password: "1234" },
      Doctor: { username: "doctor", password: "1234" },
      Receptionist: { username: "receptionist", password: "1234" },
    };

    if (
      user.username === loginDetails[user.role].username &&
      user.password === loginDetails[user.role].password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", user.role);

      setRole(user.role);
      setIsLoggedIn(true);
      alert(`Login successful as ${user.role}`);
    } else {
      alert(`Invalid ${user.role} username or password`);
    }
  };

  const handleCitizenRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/citizen-register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(citizen),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      setIsRegister(false);
      setCitizen({
        username: "",
        email: "",
      });
    }
  };

  const switchRole = (e) => {
    setUser({
      username: "",
      password: "",
      role: e.target.value,
    });

    setCitizen({
      username: "",
      email: "",
    });

    setIsRegister(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Hospital Login</h1>

        <select name="role" value={user.role} onChange={switchRole}>
          <option value="Admin">Admin</option>
          <option value="Doctor">Doctor</option>
          <option value="Receptionist">Receptionist</option>
          <option value="Citizen">Citizen / Patient</option>
        </select>

        {user.role === "Citizen" ? (
          <>
            {!isRegister ? (
              <form onSubmit={handleLogin}>
                <input
                  name="username"
                  placeholder="Citizen Username"
                  value={citizen.username}
                  onChange={handleCitizenChange}
                  required
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Citizen Email"
                  value={citizen.email}
                  onChange={handleCitizenChange}
                  required
                />

                <button type="submit">Citizen Login</button>
              </form>
            ) : (
              <form onSubmit={handleCitizenRegister}>
                <input
                  name="username"
                  placeholder="Create Username"
                  value={citizen.username}
                  onChange={handleCitizenChange}
                  required
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={citizen.email}
                  onChange={handleCitizenChange}
                  required
                />

                <button type="submit">Register</button>
              </form>
            )}

            <hr />

            <button type="button" onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? "Back to Login" : "New Citizen? Register"}
            </button>
          </>
        ) : (
          <form onSubmit={handleLogin}>
            <input
              name="username"
              placeholder={`${user.role} Username`}
              value={user.username}
              onChange={handleChange}
              required
            />

            <input
              name="password"
              type="password"
              placeholder={`${user.role} Password`}
              value={user.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Login</button>

            <p className="login-hint">
              Admin: admin / 1234 <br />
              Doctor: doctor / 1234 <br />
              Receptionist: receptionist / 1234
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;