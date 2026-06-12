import { useState, useRef } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import toast from "react-hot-toast";

import QRHistory from "../components/QRHistory";

function Generator() {
  const [text, setText] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("qrHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const qrRef = useRef(null);

  const saveToHistory = () => {
    if (!text.trim()) {
      toast.error("Please enter some text");
      return;
    }

    setGeneratedText(text);

    const updatedHistory = [
      text,
      ...history.filter((item) => item !== text),
    ].slice(0, 10);

    setHistory(updatedHistory);

    localStorage.setItem(
      "qrHistory",
      JSON.stringify(updatedHistory)
    );

    toast.success("QR generated successfully!");
  };

  const downloadPNG = () => {
    const canvas = qrRef.current.querySelector("canvas");

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");

    downloadLink.href = pngUrl;
    downloadLink.download = "qrscan-code.png";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    toast.success("PNG downloaded!");
  };

  const downloadSVG = () => {
    const svg = qrRef.current.querySelector("svg");

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    const blob = new Blob([source], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "qrscan-code.svg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success("SVG downloaded!");
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);

      toast.success("Text copied successfully!");
    } catch (err) {
      console.error(err);

      toast.error("Failed to copy text");
    }
  };

  const clearAll = () => {
    setText("");
    setGeneratedText("");

    toast.success("Generator cleared!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Generator Card */}
        <div className="bg-slate-900 rounded-3xl p-8 shadow-xl">

          <h1 className="text-4xl font-bold mb-2">
            QR Generator
          </h1>

          <p className="text-slate-400 mb-6">
            Generate beautiful QR codes instantly.
          </p>

          <input
            type="text"
            placeholder="Enter URL or text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none"
          />

          <div className="mt-4">
            <button
              onClick={saveToHistory}
              className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl font-semibold"
            >
              Generate QR
            </button>
          </div>

          {generatedText && (
            <>
              <div className="mt-8 flex justify-center">
                <div
                  ref={qrRef}
                  className="bg-white p-6 rounded-2xl"
                >
                  <QRCodeCanvas
                    value={generatedText}
                    size={250}
                    includeMargin={true}
                  />

                  <div style={{ display: "none" }}>
                    <QRCodeSVG
                      value={generatedText}
                      size={250}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 justify-center">

                <button
                  onClick={downloadPNG}
                  className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl font-semibold"
                >
                  Download PNG
                </button>

                <button
                  onClick={downloadSVG}
                  className="bg-purple-500 hover:bg-purple-600 px-5 py-3 rounded-xl font-semibold"
                >
                  Download SVG
                </button>

                <button
                  onClick={copyText}
                  className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl font-semibold"
                >
                  Copy Text
                </button>

                <button
                  onClick={clearAll}
                  className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-semibold"
                >
                  Clear
                </button>

              </div>
            </>
          )}
        </div>

        <QRHistory history={history} />

      </div>
    </div>
  );
}

export default Generator;