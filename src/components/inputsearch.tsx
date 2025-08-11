import { Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import ProgressBar from "./ProgressBar";

export default function Inputsearch() {
  const [text, setText] = useState({ text: "" });
  const [sessionId] = useState(() => crypto.randomUUID());
  const socketRef = useRef<WebSocket | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showDownloading, setShowDownloading] = useState(false);
  const [queuedMessage, setQueuedMessage] = useState(false);

  useEffect(() => {
    // const socket = new WebSocket(`ws://${window.location.hostname}:3000/ws`);
    const socket = new WebSocket(`wss://apifastymp3.onrender.com/ws`);

    socketRef.current = socket;

    socket.addEventListener("open", () => {
      socket.send(JSON.stringify({ type: "register", sessionId }));
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "preparing_audio") {
        setShowBanner(true);
        setShowDownloading(false);
        setQueuedMessage(false);
      }

      if (data.type === "conversion_started") {
        setShowBanner(true);
        setShowDownloading(false);
        setQueuedMessage(false);
      }

      if (data.type === "download_started") {
        setShowBanner(false);
        setShowDownloading(true);
        setQueuedMessage(false);

        const link = document.createElement("a");
        // link.href = `http://localhost:3000/api/descargar?url=${encodeURIComponent(
        //   text.text
        // )}&id=${sessionId}`;
        link.href = `https://apifastymp3.onrender.com/api/descargar?url=${encodeURIComponent(
          text.text
        )}&id=${sessionId}`;
        link.setAttribute("download", "");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => setShowDownloading(false), 10000);
      }

      if (data.type === "queued") {
        setQueuedMessage(true);
        setShowBanner(true);
        setShowDownloading(false);
      }

      if (data.type === "limit_reached") {
        alert(
          "❌ Solo puedes descargar 2 canciones a la vez. Espera que una termine."
        );
      }
    });

    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, [sessionId, text.text]);

  const handleSubmit = () => {
    if (!text.text) return;

    // fetch(
    //   `http://localhost:3000/api/descargar?url=${encodeURIComponent(
    //     text.text
    //   )}&id=${sessionId}`
    // )
    console.log(
      "URL final:",
      `https://apifastymp3.onrender.com/api/descargar?url=${encodeURIComponent(
        text.text
      )}&id=${sessionId}`
    );

    fetch(
      `https://apifastymp3.onrender.com/api/descargar?url=${encodeURIComponent(
        text.text
      )}&id=${sessionId}`
    )
      .then(() => {
        console.log("🎬 Conversión iniciada");
      })
      .catch((err) => {
        console.error("❌ Error al iniciar conversión:", err);
      });
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 px-6">
      <div className="relative text-blue-500 text-[21px]">
        <input
          value={text.text}
          onChange={(e) => setText({ text: e.target.value })}
          type="text"
          placeholder="🎥 Pega la URL del video de YouTube..."
          className="outline-none pl-20 py-2 h-20 rounded-xl w-full bg-white/10 border border-white/25 mb-6 text-white"
        />
        <Search
          size={34}
          className="z-40 text-gray-400 absolute left-6 top-6"
        />
        <button
          onClick={handleSubmit}
          className="absolute p-4 bg-black text-white right-4 rounded-md hover:bg-blue-700 transition"
        >
          Convertir
        </button>
      </div>

      {showBanner && (
        <>
          <div className="text-center text-blue-300 mt-4 animate-pulse">
            {queuedMessage
              ? "🕒 Tu audio está en cola... espera unos segundos."
              : "🎧 Preparando tu audio... espera un momento."}
          </div>
          <ProgressBar timeEstimate={30000} color="dodgerblue" />
        </>
      )}

      {showDownloading && (
        <div className="text-center text-green-300 mt-4 animate-pulse">
          ✅ ¡Descargando audio! Revisa tus descargas.
        </div>
      )}
    </div>
  );
}
