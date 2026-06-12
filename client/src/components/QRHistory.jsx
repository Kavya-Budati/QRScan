function QRHistory({ history }) {
  return (
    <div className="mt-8 bg-slate-900 rounded-3xl p-6 shadow-xl">

      <h2 className="text-2xl font-bold mb-4 text-white">
        Recent QR Codes
      </h2>

      {history.length === 0 ? (
        <p className="text-slate-400">
          No QR codes generated yet.
        </p>
      ) : (
        <div className="space-y-3">

          {history.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 p-4 rounded-xl text-slate-300 break-all"
            >
              {item}
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default QRHistory;