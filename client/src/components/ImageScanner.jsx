import { useState } from "react";
import jsQR from "jsqr";
import toast from "react-hot-toast";

function ImageScanner() {
  const [result, setResult] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const code = jsQR(
        imageData.data,
        imageData.width,
        imageData.height
      );

      if (code) {
        setResult(code.data);
      } else {
        setResult("No QR code found");
      }
    };

    img.src = URL.createObjectURL(file);
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
      toast.success("Result copied!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">
        Scan QR From Image
      </h2>

      <p className="text-slate-400 mb-6">
        Upload a QR code image and decode it instantly.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block w-full text-sm text-slate-300
        file:mr-4 file:py-3 file:px-4
        file:rounded-xl file:border-0
        file:bg-cyan-500 file:text-white
        hover:file:bg-cyan-600"
      />

      {result && (
        <div className="mt-8 bg-slate-800 rounded-2xl p-6">

          <h3 className="text-xl font-semibold mb-3">
            Result
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

            {result.startsWith("http") && (
              <a
                href={result}
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl font-semibold"
              >
                Open Link
              </a>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default ImageScanner;