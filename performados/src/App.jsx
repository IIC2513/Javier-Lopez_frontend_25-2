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
function App() {
  const items = [
    {
      label: "PlaceHolder",
      bgColor: "#2f5b61",
      textColor: "#fff",
      fontFamily: "sora, sans-serif",
      links: [
        { label: "PlaceHolder", ariaLabel: "Placeholder" },
        { label: "PlaceHolder", ariaLabel: "PlaceHolder" },
      ],
    },
    {
      label: "PlaceHolder",
      bgColor: "#2f5b61",
      textColor: "#fff",
      fontFamily: "sora, sans-serif",
      links: [
        { label: "PlaceHolder", ariaLabel: "PlaceHolder" },
        { label: "PlaceHolder", ariaLabel: "PlaceHolder" },
      ],
    },
    {
      label: "PlaceHolder",
      bgColor: "#2f5b61",
      textColor: "#fff",
      fontFamily: "sora, sans-serif",
      links: [
        { label: "PlaceHolder", ariaLabel: "PlaceHolder" },
        { label: "PlaceHolder", ariaLabel: "PlaceHolder" },
        { label: "PlaceHolder", ariaLabel: "PlaceHolder" },
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

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("currentID", JSON.stringify(currentID));
  }, [currentID]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar
          logo={logo}
          logoAlt="Company Logo"
          items={items}
          baseColor="#f6efe2"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
        />

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
          <Route
            path="/login"
            element={<Login users={users} setCurrentUser={setCurrentUser} />}
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
              />
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
