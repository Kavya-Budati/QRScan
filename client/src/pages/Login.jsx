import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = JSON.parse(
      localStorage.getItem("registeredUser")
    );

    if (!user) {
      toast.error("No user found. Please register first.");
      return;
    }

    if (
      email === user.email &&
      password === user.password
    ) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );

      toast.success("Login successful!");

      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-md">

        <h1 className="text-4xl font-bold mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-800 p-4 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-slate-800 p-4 rounded-xl mb-6"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;