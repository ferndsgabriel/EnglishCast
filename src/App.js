import RouterApp from "./router";
import "./styles/globals.css";
import AuthProvider from "./contexts/AuthContexts";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouterApp/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
