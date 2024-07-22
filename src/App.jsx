import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ShoppingContainer from "./components/ShoppingContainer";
import CheckOut from "./components/CheckOut";
import Register from "./components/Register";
import { useSelector, useDispatch } from "react-redux";
import { total } from "./Reducer/CardSlice";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "../src/components/Firebase"; // Make sure to import auth correctly
import Login from "./components/Login";
import Loader from "./components/Loader";

function App() {
  const { isOpen } = useSelector((state) => state.CheckOut);
  const { cardItems } = useSelector((state) => state.Card);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(total());
  }, [cardItems, dispatch]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    ); // Show loading state while checking authentication status
  }

  return (
    <div className="relative overflow-x-hidden h-full w-full">
<BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/home" /> : <Register />
          }
        />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/home" /> : <Login />
          }
        />
        <Route
          path="/home"
          element={user ? <ShoppingContainer /> : <Navigate to="/login" />}
        />
        {/* Add additional routes if needed */}
      </Routes>
    </BrowserRouter>

      {isOpen && <CheckOut />}
    </div>
  );
}

export default App;

{
  /* const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

useEffect(() => {
  const handleMouseMove = (event) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, []);

const MainRef = useRef(null);
const cursor = useRef(null);

useEffect(() => {
  const handleMouseMove = (event) => {
    if (cursor.current) {
      gsap.to(cursor.current, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.3, // Adjust the duration for smoothness
        ease: "power2.out",
        transformOrigin: "center center",
      });
    }
  };

  const currentRef = MainRef.current;
  if (currentRef) {
    currentRef.addEventListener("mousemove", handleMouseMove);
  }

  return () => {
    if (currentRef) {
      currentRef.removeEventListener("mousemove", handleMouseMove);
    }
  };
}, []);
*/
}
