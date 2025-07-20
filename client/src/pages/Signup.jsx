import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signup", {
        username,
        password,
      });
      if (res.data.success) {
        setAlertMsg(res.data.success);
        setAlertType("success");
      } else if (res.data.error) {
        setAlertMsg(res.data.error);
        setAlertType("error");
      }
    } catch (err) {
      setAlertMsg("Signup error", err);
      setAlertType("error");
    }
  };

  return (
    <>
      {alertMsg && (
        <div
          style={{
            color: alertType === "success" ? "green" : "red",
            marginBottom: 10,
          }}
        >
          {alertMsg}
        </div>
      )}
      <form onSubmit={handleSignup} className="flex flex-col gap-2 p-4">
        <label>
          Username:
          <input
            type="text"
            className="border"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            className="border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit" className="border">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default Signup;
