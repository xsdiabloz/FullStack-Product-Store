import { SignInButton } from "@clerk/react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import EditProductsPage from "./pages/EditProductsPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit/:id" element={<EditProductsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
