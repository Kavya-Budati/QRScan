import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const handleLogout = () => {
    localStorage.removeItem("currentUser");

    toast.success("Logged out successfully!");

    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-bold text-white"
        >
          QR<span className="text-cyan-400">Scan</span>
        </Link>

        <div className="flex gap-6 items-center">

          {currentUser && (
            <span className="text-cyan-400 font-medium">
              Hi, {currentUser.name} 👋
            </span>
          )}

          <Link
            to="/generator"
            className="text-slate-300 hover:text-cyan-400"
          >
            Generate
          </Link>

          <Link
            to="/scanner"
            className="text-slate-300 hover:text-cyan-400"
          >
            Scan
          </Link>

          <Link
            to="/dashboard"
            className="text-slate-300 hover:text-cyan-400"
          >
            Dashboard
          </Link>

          {!currentUser ? (
            <>
              <Link
                to="/login"
                className="text-slate-300 hover:text-cyan-400"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl font-semibold"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;