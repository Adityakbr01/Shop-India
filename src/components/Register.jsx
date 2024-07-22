import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "./Firebase";
import { setDoc, doc } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

function Register() {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fnamefocused, setfnamefocuswd] = useState(false);
  const [lnamefocused, setlnamefocuswd] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const HandleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      console.log("User Register Success");
      toast.success("Register Successful", {
        position: "top-center",
      });

      navigate("/home");

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          password: password,
          FirstName: fname,
          LastName: lname,
        });
      }
    } catch (error) {
      console.log(error.message);
      console.log("User Register failed");
      toast.error("Register failed", {
        position: "top-center",
      });
    }
  };

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
      toast.success("Register Successful", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      console.log("Google Sign-In failed");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray flex items-center justify-center">
      <motion.form
        onSubmit={HandleRegister}
        initial={{ x: "-500%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`bg-[#fff]  rounded-lg p-8 max-h-[640px] max-w-4xl  transition-all duration-300 inline-flex flex-col items-center justify-center gap-2 ${
          emailFocused ||
          passwordFocused ||
          fnamefocused ||
          lnamefocused ||
          email ||
          password ||
          fname ||
          lname
            ? "shadow-[0_5px_290px_-5px_rgba(0,0,0,0.7)]"
            : ""
        }`}
        style={{ maxWidth: "670px" }}
      >
        <h3 className="text-3xl font-semibold mb-5">Register</h3>
        <div className="mb-3 relative">
          <label
            htmlFor="FirstName"
            className={`absolute   bg-[#fff] left-2 -top-1 z-30 transition-all duration-300 ${
              fnamefocused || fname ? "-top-2 text-sm" : "top-[8px]"
            }`}
          >
            First Name
          </label>
          <input
            className={`w-full  pr-6 md:pr-[130px] pl-4  py-2 outline-none border rounded-sm border-[#2e7eff] bg-[#fff]${
              fnamefocused ? "bg-[#E9F0FF]" : "bg-transparentBlack"
            }`}
            id="FirstName"
            type="text"
            value={fname}
            onFocus={() => setfnamefocuswd(true)}
            onBlur={() => setfnamefocuswd(false)}
            onChange={(e) => setfname(e.target.value)}
          />
        </div>
        <div className="mb-3 relative">
          <label
            htmlFor="lastName"
            className={`absolute   bg-[#fff] left-2 -top-1 z-30 transition-all duration-300 ${
              lnamefocused || lname ? "-top-2 text-sm" : "top-[8px]"
            }`}
          >
            Last Name
          </label>
          <input
            className="w-full  pr-6 md:pr-[130px] pl-4  py-2  rounded-sm outline-none border  border-[#2e7eff] bg-[#fff]"
            id="lastName"
            type="text"
            value={lname}
            onFocus={() => setlnamefocuswd(true)}
            onBlur={() => setlnamefocuswd(false)}
            onChange={(e) => setlname(e.target.value)}
          />
        </div>
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
            className="w-full pr-6 md:pr-[130px] pl-4  py-2px-[139px] py-2 rounded-sm  outline-none border  border-[#2e7eff] bg-[#fff]"
            autoComplete="off"
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
            className="w-full pr-6 md:pr-[130px] pl-4  py-2 rounded-sm outline-none border border-[#2e7eff] bg-[#fff]"
            type="password"
            placeholder=""
            value={password}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-center">
          <label className="cursor-pointer flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-md px-20 md:px-[199px] py-[10px] bg-gray-50 hover:bg-gray-100">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-auto rounded-md"
              />
            ) : (
              <div className="text-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 6l8 8m-8-8l8 8"
                  />
                </svg>
                <p className="text-sm">Click to upload</p>
              </div>
            )}
          </label>
        </div>
        <button
          type="submit"
          className="py-2 w-full text-center transition-all ease-in duration-300 bg-[#1573e6] hover:bg-[#3b93ff] text-[#fff] font-semibold"
        >
          Submit
        </button>
        <div
          onClick={handleGoogleSignIn}
          className="py-2 w-full flex items-center justify-center gap-4 cursor-pointer  bg-[#2d8bff] hover:bg-[#3053df] transition-all ease-in duration-300 text-[#fff] font-semibold"
        >
          <button type="submit" className="text-center text-lg">
            Register with
          </button>
          <span className="h-8 w-8 rounded-full bg-[#fff] flex items-center justify-center">
            <FcGoogle size={22} />
          </span>
        </div>

        <div className="flex w-full items-center gap-2 justify-end">
          <div className="text-sm">Allready Register</div>
          <NavLink to={"/login"} className="text-[#344cff] text-sm">
            Login
          </NavLink>
        </div>
      </motion.form>
    </div>
  );
}

export default Register;
