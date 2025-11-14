import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// Views
import HomePage from "../views/HomePage";
import ThreeDemoView from "../views/ThreeDemoView";
import SolarSystemView from "../views/SolarSystemView";
import Geometry3DView from "../views/Geometry3DView";
import Pintura3DView from "../views/Pintura3DView"; 

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="three" element={<ThreeDemoView />} />
        <Route path="solar-system" element={<SolarSystemView />} />
        <Route path="geometry-3d" element={<Geometry3DView />} />
        <Route path="paint-3d" element={<Pintura3DView />} /> 
       
      </Route>
    </Routes>
  );
}