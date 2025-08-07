import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import toast from "react-hot-toast";
import BASE_URL from "../utiles/api";

function Signin(type, placeholder, value, onChange) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log("username:", username, "password:", password);

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/signin`, {
        username,
        password,
      });
      console.log("username:", username, "password:", password);
      const token = res.data["login success"];
      if (token) {
        localStorage.setItem("token", token);
        toast.success(res.data.message || "Login successful!");
        navigate("/");
      }
    } catch (err) {
      console.log("Signin error:", err);

      if (err.response && err.response.data) {
        const data = err.response.data;
        console.log("error data:", data);
        toast.error(data.message || "Login failed");
      } else {
        toast.error("Network or server error. Try again later");
      }
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 px-4">
        <h3 className="text-3xl">
          Welcome to <span className="text-clr-sapphire">safefund</span>
        </h3>
        <p>Login to proceed</p>

        <form
          onSubmit={handleSignin}
          className="flex flex-col w-full max-w-sm min-w-[300px] p-6 border border-gray-300 rounded-md shadow-lg bg-white justify-center gap-4 items-center"
        >
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
            Login in
          </button>

          <a href="/signup">Create an account</a>
        </form>
      </div>
    </>
  );
}
export default Signin;
