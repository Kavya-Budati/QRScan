import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-extrabold">
          QR<span className="text-cyan-400">Scan</span>
        </h1>

        <p className="text-xl text-slate-300 mt-6">
          Generate, Scan and Manage QR Codes Effortlessly
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link
            to="/generator"
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold"
          >
            Generate QR
          </Link>

          <Link
            to="/scanner"
            className="border border-slate-600 hover:bg-slate-800 px-6 py-3 rounded-xl font-semibold"
          >
            Scan QR
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">
              QR Generation
            </h3>
            <p className="text-slate-400">
              Create QR codes instantly from text and URLs.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">
              Camera Scanner
            </h3>
            <p className="text-slate-400">
              Scan QR codes directly using your webcam.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">
              Image Scanner
            </h3>
            <p className="text-slate-400">
              Upload QR images and decode instantly.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">
              Export Options
            </h3>
            <p className="text-slate-400">
              Download QR codes as PNG and SVG.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;