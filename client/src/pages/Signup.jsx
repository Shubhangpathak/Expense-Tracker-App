import React, { useState } from "react";
import axios from "axios";
import FormInput from "../components/FormInput";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  console.log("username:", username, "password:", password);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/signup", {
        username,
        password,
      });
      console.log("username:", username, "password:", password);

      setAlertMsg(res.data.message || "signup sucess");
      setAlertType(res.data.status === "success" ? "success" : "error");
    } catch (err) {
      console.log("Signup error:", err);

      if (err.response && err.response.data) {
        const data = err.response.data;
        console.log("error data:", data);
        setAlertMsg(data.message || "Signup failed");
      } else {
        setAlertMsg("Network or server error. Try again later");
      }
      setAlertType("error");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h3 className="text-3xl">
          Welcome to <span className="text-clr-sapphire">safefund</span>
        </h3>
        <p>Create account to proceed</p>

        <form
          onSubmit={handleSignup}
          className="flex flex-col p-6 border border-gray-300 rounded-md shadow-lg bg-white h-100 justify-center gap-2 items-center"
        >
          {alertMsg && (
            <div
              className="flex w-full justify-center"
              style={{
                color: alertType === "success" ? "green" : "red",
                marginBottom: 10,
              }}
            >
              {alertMsg}
            </div>
          )}
          {/* <span>Username</span> */}
          <FormInput
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* <span>Password:</span> */}
          <FormInput
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="border clr-emerald mt-2 px-28 py-3 rounded-3xl cursor-pointer"
          >
            Sign Up
          </button>

          <a href="/signin">Login here</a>
        </form>
      </div>
    </>
  );
}

export default Signup;
