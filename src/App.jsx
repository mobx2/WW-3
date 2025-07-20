import { BrowserRouter, Route, Routes } from "react-router-dom";

// ===> Pages ────────────────────────────────────
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
// ───────────────────────────────────────────────

// Page Not Found ↓↓↓
import PageNotFound from "./pages/PageNotFound";

// ===> Components ───────────────────────────
// ===> ProtectedRoute ───────────────────────
import { ProtectedRoute } from "./components/ProtectedRoute";
// ───────────────────────────────────────────

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
//  ──────────────────────────────────────

import { CitiesProvider } from "./contexts/CitiesContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HomePageRoute */}
        <Route path="/" element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        {/* HomePageRoute */}

        {/* AppLayout Routes */}

        {/* ↓↓↓ AppLayout ProtectedRoute */}
        <Route
          path="app"
          element={
            <CitiesProvider>
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            </CitiesProvider>
          }
        >
          <Route path="cities" element={<CityList />} />
          <Route path="countries" element={<CountryList />} />
        </Route>
        {/* AppLayout Routes */}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
