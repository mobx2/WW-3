import { lazy, Suspense } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Components used inside protected routes
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// Context Provider for cities data
import { CitiesProvider } from "./contexts/CitiesContext";

// Pages
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

// Fallback Page
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// dist/assets/index-D2APp9la.css   31.03 kB │ gzip:   5.21 kB
// dist/assets/index-DV965ESM.js   550.56 kB │ gzip: 162.07 kB

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage />}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
