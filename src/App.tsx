// import { HfInference } from "@huggingface/inference";
import { HfInference } from "@huggingface/inference";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useEffect, useState } from "react";
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
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: inputText,
    });
    setIsLoading(false);
    setImageData(result);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="title-container">
        <h2>Generador de Imagenes </h2>
        <h1>@dansaround.dev </h1>
      </div>
      <div className="main-content">
        <span>
          Escribe algo en inglés, capaz español, pero preferiblemente en inglés
          para crear una imagen! Prueba "una abuela pixar style"
        </span>
        <input
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
        <button onClick={createImage}>
          {!isLoading ? (
            "Create Image"
          ) : (
            <>
              <span style={{ marginRight: "20px" }}>Creating Image</span>
              <SyncLoader size={8} color="#36d7b7" />{" "}
            </>
          )}
        </button>

        <div className="result-container">
          {imageData && (
            <img src={URL.createObjectURL(imageData)} alt="Generated Image" />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
