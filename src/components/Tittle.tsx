export default function Tittle() {
  return (
    <div className="">
      <div className=" mx-auto max-w-3xl pt-10">
        <ul className="flex space-x-6 text-sm text-white/80 font-medium">
          <li>
            <a href="#como-funciona" className="hover:text-white underline">
              Cómo funciona
            </a>
          </li>
        </ul>
      </div>

      <div className="flex flex-row  justify-center  p-4 gap-6 py-12">
        <img
          src="/Icon_fastymp3.png"
          style={{
            boxShadow: "0 0 12px 2px rgba(30, 144, 255, 0.6)",
          }}
          className="h-24 w-24  rounded-2xl bg-transparent"
        ></img>

        <div>
          <div className="text-blue-500 text-6xl font-extrabold bg">
            <span className="text-white">FASTY</span>MP3
          </div>
          <div className="text-gray-300 font-light text-xl mt-2">
            Descarga musica de manera eficaz y totalmente rapida.{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
