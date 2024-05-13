// import { HfInference } from "@huggingface/inference";
import { HfInference } from "@huggingface/inference";

import { useState } from "react";
import { SyncLoader } from "react-spinners";

function App() {
  const [imageData, setImageData] = useState<null | Blob>(null);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createImage = async () => {
    setIsLoading(true);
    const HF_TOKEN = import.meta.env.VITE_HF_ACCESS_TOKEN;
    const hf = new HfInference(HF_TOKEN);
    const result = await hf.textToImage({
      model: "stabilityai/stable-diffusion-2",
      inputs: inputText,
    });
    setIsLoading(false);
    setImageData(result);
  };

  return (
    <section className="w-full h-full py-24 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800 font-poppins">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl text-slate-800 dark:text-neutral-100 font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Generador de Imágenes
            </h1>
            <h3 className="text-xl text-slate-500 dark:text-neutral-300 font-bold tracking-tighter sm:text-xl md:text-2xl lg:text-3xl">
              por @dansaround.dev{" "}
            </h3>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Escribe algo en inglés, capaz español, pero preferiblemente en
              inglés para crear una imagen! Prueba "una abuela pixar style"
            </p>
          </div>
          <input
            className="px-4 py-2"
            type="text"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />
          <button
            onClick={createImage}
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          >
            {!isLoading ? (
              "Manifiesta tu imagen"
            ) : (
              <>
                <span style={{ marginRight: "20px" }}>Manifestando</span>
                <SyncLoader size={8} color="#36d7b7" />{" "}
              </>
            )}{" "}
          </button>
          <div className="result-container">
            {imageData && (
              <img src={URL.createObjectURL(imageData)} alt="Generated Image" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
