import { BrowserRouter, Route, Routes } from "react-router-dom";

// ===> Pages ────────────────────────────────────
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
// ───────────────────────────────────────────────

// ===> ProtectedRoute ───────────────────────────

import { ProtectedRoute } from "./components/ProtectedRoute";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";

// ───────────────────────────────────────────────

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
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />
        {/* AppLayout Routes */}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
