import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";

// Fallback Page
import PageNotFound from "./pages/PageNotFound";

// Components used inside protected routes
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Form from "./components/Form";

// Context Provider for cities data
import { CitiesProvider } from "./contexts/CitiesContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />

        {/* Protected AppLayout routes */}
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
          {/* Redirect /app to /app/cities */}
          <Route index element={<Navigate replace to="cities" />} />

          {/* Cities routes */}
          <Route path="cities" element={<CityList />} />
          <Route path="cities/:id" element={<City />} />

          {/* Countries route */}
          <Route path="countries" element={<CountryList />} />

          {/* Form route */}
          <Route path="form" element={<Form />} />
        </Route>

        {/* Catch all unmatched routes */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
