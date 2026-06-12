import { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import ImageScanner from "../components/ImageScanner";
import toast from "react-hot-toast";

function Scanner() {
  const [result, setResult] = useState("");
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: 250,
        },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          setResult(decodedText);
          const existing =
  JSON.parse(localStorage.getItem("scanHistory")) || [];

const updated = [
  decodedText,
  ...existing.filter((item) => item !== decodedText),
].slice(0, 10);

localStorage.setItem(
  "scanHistory",
  JSON.stringify(updated)
);
        },
        () => {
          // Ignore scan errors
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .clear()
          .catch(() => {})
          .finally(() => {
            scannerRef.current = null;
          });
      }
    };
  }, []);

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
      toast.success("Scan result copied!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Main Scanner Card */}
        <div className="bg-slate-900 rounded-3xl p-8 shadow-xl">

          <h1 className="text-4xl font-bold mb-2">
            QR Scanner
          </h1>

          <p className="text-slate-400 mb-6">
            Scan QR codes using your camera or upload an image.
          </p>

          <div
            id="reader"
            className="overflow-hidden rounded-2xl"
          ></div>

          {result && (
            <div className="mt-8 bg-slate-800 rounded-2xl p-6">

              <h3 className="text-2xl font-semibold mb-3">
                Scan Result
              </h3>

              <p className="break-all text-slate-300">
                {result}
              </p>

              <div className="flex gap-4 mt-5 flex-wrap">

                <button
                  onClick={copyResult}
                  className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl font-semibold"
                >
                  Copy Result
                </button>

                <a
                  href={result}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl font-semibold"
                >
                  Open Link
                </a>

              </div>
            </div>
          )}
        </div>

        {/* Image Scanner Card */}
        <div className="mt-8 bg-slate-900 rounded-3xl p-8 shadow-xl">
          <ImageScanner />
        </div>

      </div>
    </div>
  );
}

export default Scanner;