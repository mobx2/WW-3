import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";

// Fallback Page
import PageNotFound from "./pages/PageNotFound";

// Components
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Form from "./components/Form";

// Context
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
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<CityList />} />

          <Route path="cities/:id" element={<City />} />

          <Route path="countries" element={<CountryList />} />

          <Route path="form" element={<Form />} />
        </Route>

        {/* AppLayout Routes */}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
