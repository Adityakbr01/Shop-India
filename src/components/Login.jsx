import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User Logged in successfully");
      toast.success("User Logged Successful", {
        position: "top-center",
      });
      navigate("/home");
      // Redirect user to a different page or show a success message
    } catch (error) {
      setError(error.message);
      console.error("Error signing in: ", error.message);
    }
  };
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          FirstName: user.displayName.split(" ")[0],
          LastName: user.displayName.split(" ")[1],
        });
      }

      navigate("/home");
      console.log("Google Sign-In Success");
      toast.success("Google Success", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      console.log("Google Sign-In failed");
    }
  };

  return (
    <div className="h-screen w-full bg-gray flex items-center justify-center">
      <motion.form
        initial={{ x: "500%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        onSubmit={handleLogin}
        className={`bg-[#fff]  rounded-lg p-8 max-h-[640px] max-w-[400px] transition-all duration-300 flex flex-col items-center justify-center gap-4 ${
          emailFocused || passwordFocused || email || password
            ? "shadow-[0_5px_290px_-5px_rgba(0,0,0,0.7)]"
            : ""
        }`}
      >
        <h3 className="text-3xl font-semibold">Login</h3>
        <div className="mb-3 relative">
          <label
            htmlFor="email"
            className={`absolute   bg-[#fff] left-2 -top-1 z-30 transition-all duration-300 ${
              emailFocused || email ? "-top-2 text-sm" : "top-[8px]"
            }`}
          >
            Email
          </label>
          <input
            className="w-full px-4 py-2 rounded-sm  outline-none border  border-[#2e7eff] bg-[#fff]"
            id="email"
            type="email"
            value={email}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3 relative">
          <label
            htmlFor="password"
            className={`absolute  bg-[#fff] left-2 -top-1 z-30 transition-all duration-300 ${
              passwordFocused || password ? "-top-2 text-sm" : "top-[8px]"
            }`}
          >
            Password
          </label>
          <input
            id="password"
            className="w-full px-4 py-2 rounded-sm outline-none border border-[#2e7eff] bg-[#fff]"
            type="password"
            placeholder=""
            value={password}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="py-2 w-full text-center bg-[#1573e6] text-[#fff] font-semibold"
        >
          Submit
        </button>
        <div
          onClick={handleGoogleSignIn}
          className="py-2 w-full flex items-center justify-center gap-4 cursor-pointer  bg-[#2d8bff] text-[#fff] font-semibold"
        >
          <button type="submit" className="text-center text-lg">
            Login with
          </button>
          <span className="h-8 w-8 rounded-full bg-[#fff] flex items-center justify-center">
            <FcGoogle size={22} />
          </span>
        </div>
        <div className="flex w-full items-center gap-2 justify-end">
          <div className="text-sm">I Have No Account</div>
          <NavLink to={"/"} className="text-[#344cff] text-sm">
            Register
          </NavLink>
        </div>
      </motion.form>
    </div>
  );
}

export default Login;
