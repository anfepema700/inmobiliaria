import "./App.css";
import { Image } from "primereact/image";
import linealPicture from "./assets/logo_inmobiliaria.png";

function App() {
  return (
    <div className="text-center">
      <h1>Inmobiliaria lineal</h1>
      <Image src={linealPicture} />
    </div>
  );
}

export default App;
