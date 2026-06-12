import { useState } from "react";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const qrHistory =
    JSON.parse(localStorage.getItem("qrHistory")) || [];

  const scanHistory =
    JSON.parse(localStorage.getItem("scanHistory")) || [];

  const clearGeneratedHistory = () => {
    localStorage.removeItem("qrHistory");
    window.location.reload();
  };

  const clearScanHistory = () => {
    localStorage.removeItem("scanHistory");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">
          Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-900 p-8 rounded-3xl">
            <h2 className="text-slate-400 text-lg">
              Generated QRs
            </h2>

            <p className="text-6xl font-bold mt-3">
              {qrHistory.length}
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl">
            <h2 className="text-slate-400 text-lg">
              Scanned QRs
            </h2>

            <p className="text-6xl font-bold mt-3">
              {scanHistory.length}
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl">
            <h2 className="text-slate-400 text-lg">
              Total Activity
            </h2>

            <p className="text-6xl font-bold mt-3">
              {qrHistory.length + scanHistory.length}
            </p>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-8">

          <button
            onClick={clearGeneratedHistory}
            className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-semibold"
          >
            Clear Generated History
          </button>

          <button
            onClick={clearScanHistory}
            className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-xl font-semibold"
          >
            Clear Scan History
          </button>

        </div>

        {/* Generated History Section */}
        <div className="mt-10 bg-slate-900 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Recent Generated QRs
          </h2>

          <input
            type="text"
            placeholder="Search history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white mb-6"
          />

          {qrHistory.length === 0 ? (
            <p className="text-slate-400">
              No generated QR codes yet.
            </p>
          ) : (
            qrHistory
              .filter((item) =>
                item
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-800 p-4 rounded-xl mb-4 break-all"
                >
                  {item}
                </div>
              ))
          )}

        </div>

        {/* Scan History Section */}
        <div className="mt-8 bg-slate-900 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Recent Scans
          </h2>

          {scanHistory.length === 0 ? (
            <p className="text-slate-400">
              No scans yet.
            </p>
          ) : (
            scanHistory.map((item, index) => (
              <div
                key={index}
                className="bg-slate-800 p-4 rounded-xl mb-4 break-all"
              >
                {item}
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;