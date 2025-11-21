import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useState, useEffect } from "react";
import LandingPage from "./pages/Landing";
import Navbar from "./components/Navbar";
import logo from "./assets/react.svg";
import AboutUs from "./pages/AboutUs";
import Testing from "./pages/Testing";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyProfile from "./pages/MyProfile";
import EditProfile from "./pages/EditProfile";
import HowToUse from "./pages/HowToUse";
import CartButton from "./components/CartButton";
import CartOnSide from "./components/CartOnSide";
import ProductButton from "./components/AddProductButton";
import { CreateProductModal } from "./components/CreateProductModal";
import AdminButton from "./components/adminButton";
import AdminUsersView from "./pages/AdminUsersView";
import UserSalesView from "./pages/userSales";
import Summary from "./pages/Summary";
const URL_API = import.meta.env.VITE_API_URL;
import Chat from "./components/Chat";
import { setAuthToken } from "./api";
import MyPurchases from "./pages/MyPurchases";
function App() {
  const items = [
    {
      label: "Ofertas de Primavera",
      bgColor: "#2f5b61",
      textColor: "#fff",
      fontFamily: "sora, sans-serif",
      links: [
        { label: "Matcha Days", ariaLabel: "Placeholder", href: "/products/matcha-days" },
        {
          label: "Gana tu primer concurso ",
          ariaLabel: "PlaceHolder",
          href: "/products/primer-concurso",
        },
      ],
    },
    {
      label: "General",
      bgColor: "#2f5b61",
      textColor: "#fff",
      fontFamily: "sora, sans-serif",
      links: [
        {
          label: "Ver todos los productos",
          ariaLabel: "PlaceHolder",
          href: "/products",
        },
      ],
    },
    {
      label: "Best Sellers",
      bgColor: "#2f5b61",
      textColor: "#fff",
      fontFamily: "sora, sans-serif",
      links: [
        { label: "Labubus", ariaLabel: "PlaceHolder", href: "/products/labubus" },
        { label: "Libros", ariaLabel: "PlaceHolder", href: "/products/libros" },
        { label: "Accesorios", ariaLabel: "PlaceHolder", href: "/products/accesorios" },

      ],
    },
  ];

  const [currentUser, setCurrentUser] = React.useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [users, setUsers] = React.useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  const [currentID, setCurrentID] = useState(() => {
    const storedID = localStorage.getItem("currentID");
    return storedID ? JSON.parse(storedID) : 1;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartList, setCartList] = useState(() => {
    try {
      const storedCart = localStorage.getItem("shoppingCart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error al leer el carrito de localStorage", error);
      return [];
    }
  });

  const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
    useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("shoppingCart", JSON.stringify(cartList));
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage", error);
    }
  }, [cartList]);

  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem("messages");
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const fetchCart = async (currentID) => {
    const response = await fetch(`${URL_API}/cart/users/${currentID}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error fetching cart data");
    }
    const data = await response.json();
    console.log("Fetched cart data:", data.cart.Products);
    setCartList(data.cart.Products || []);
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      fetchCart(currentUser.id).catch((error) =>
        console.error("Error fetching cart:", error)
      );
    } else {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("shoppingCart");
    }
  }, [currentUser]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setAuthToken(token);
    } else {
      localStorage.removeItem("token");
      setAuthToken(null);
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("currentID", JSON.stringify(currentID));
  }, [currentID]);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ProductButton
          setterCreateProductModalOpen={setIsCreateProductModalOpen}
          isLogged={!!currentUser}
        />

        <CreateProductModal
          isOpen={isCreateProductModalOpen}
          onClose={() => setIsCreateProductModalOpen(false)}
          currentUser={currentUser}
        />

        <CartButton
          setterCartOpen={setIsCartOpen}
          isLogged={!!currentUser}
          itemCount={cartList.length}
        />
        <CartOnSide
          isOpen={isCartOpen}
          isLogged={!!currentUser}
          cartList={cartList}
          setCartList={setCartList}
          setterCartOpen={setIsCartOpen}
        />
        <Navbar
          logo={logo}
          logoAlt="Company Logo"
          items={items}
          baseColor="#f6efe2"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        {currentUser && currentUser.role === "admin" && <AdminButton />}

        {currentUser && (
          <Chat
            users={users}
            currentUser={currentUser}
            messages={messages}
            setMessages={setMessages}
          />
        )}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/caracteristicas"
            element={
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">Características</h1>
              </div>
            }
          />
          <Route
            path="/precios"
            element={
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">Precios</h1>
              </div>
            }
          />
          <Route
            path="/contacto"
            element={
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">Contacto</h1>
              </div>
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/testing" element={<Testing />} />
          <Route
            path="/products"
            element={
              <Products
                setCartList={setCartList}
                cartList={cartList}
                setterCartOpen={setIsCartOpen}
              />
            }
          />

          <Route
            path="/login"
            element={
              <Login
                users={users}
                setCurrentUser={setCurrentUser}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                users={users}
                setUsers={setUsers}
                setCurrentUser={setCurrentUser}
                currentID={currentID}
                setCurrentID={setCurrentID}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/my-profile"
            element={
              <MyProfile
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/edit-profile"
            element={
              <EditProfile
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                users={users}
                setUsers={setUsers}
                token={token}
              />
            }
          />
          <Route
            path="/products/:categoryName"
            element={
              <Products
                setCartList={setCartList}
                cartList={cartList}
                setterCartOpen={setIsCartOpen}
              />
            }
          />
          <Route
            path="/admin-users"
            element={<AdminUsersView currentUser={currentUser} token={token} />}
          />
          <Route
            path="/admin-users/:id"
            element={<UserSalesView currentUser={currentUser} token={token} />}
          />
          <Route path="/summary" element={<Summary />} />
          <Route path="/howtouse" element={<HowToUse />} />

          <Route 
          path="/my-purchases" 
          element={
              <MyPurchases 
                currentUser={currentUser} 
                cartList={cartList}           
                setCartList={setCartList}     
                setterCartOpen={setIsCartOpen} 
              />
            }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
