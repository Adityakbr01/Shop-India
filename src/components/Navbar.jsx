import React, { useState, useEffect, useRef } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { open } from "../Reducer/CheckOutSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";
// import UserNavComo from "./UserNavComo";
import { CiLogout } from "react-icons/ci";
import { Card, CardContent, Typography, Avatar, Divider } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person"; // Import Person icon
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Navbar() {
  const [userDetails, setUserDetails] = useState(null);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const Docref = doc(db, "Users", user.uid);
        const DogSnap = await getDoc(Docref);
        if (DogSnap.exists()) {
          setUserDetails(DogSnap.data());
        }
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      setUserDetails(null);
      setIsOpenUserDet(false);
      console.log("Sign-Out Success");
      toast.success("Log Out Successful", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      console.log("Sign-Out failed");
      toast.error("Sign-Out failed. Please try again.", {
        position: "top-center",
      });
    }
  };

  const { amount } = useSelector((state) => state.Card);
  const dispatch = useDispatch();
  const [scroll, setScroll] = useState(false);
  const [isOpenUserDet, setIsOpenUserDet] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsOpenUserDet(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const scrollContainer = document.querySelector("[data-scroll-container]");
    if (scrollContainer) {
      const scroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
      });

      // Example of LocomotiveScroll's own event handling
      scroll.on("scroll", (args) => {
        setScroll(args.scroll.y > 20); // Use LocomotiveScroll's scroll arguments
      });

      return () => {
        scroll.destroy();
      };
    }
  }, []);

  return (
    <div className="relative z-50 w-full">
      <div
        className={`${
          scroll
            ? "bg-gray shadow-lg transition-all ease-in duration-100 bg-opacity-[13%] backdrop-blur-lg backdrop-filter border-b border-[#ababab]"
            : "cls"
        } fixed top-0 left-0 w-full overflow-x-hidden z-20`}
      >
        <div className="flex items-center justify-between relative container py-4 px-2 mx-auto">
          <div className="font-bold text-xl">
            <NavLink to={"/home"}>Shop India</NavLink>
          </div>
          <div className="relative flex gap-3 items-center">
            <div className="relative">
              <BiShoppingBag
                className="text-3xl opacity-80 cursor-pointer"
                onClick={() => dispatch(open())}
              />
              <div className="absolute flex items-center justify-center text-[10px] w-4 h-4 bg-[#35d820] text-[#000] rounded-full z-10 right-[-2px] bottom-[-1px]">
                {amount}
              </div>
            </div>

            {userDetails && (
              <PersonIcon
                onClick={() => setIsOpenUserDet(!isOpenUserDet)}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
      {isOpenUserDet ? (
        <div
          className={`fixed right-2 z-40 transition-all ${
            isOpenUserDet ? "top-7" : "-top-20"
          }`}
          ref={cardRef}
        >
          <Card sx={{ maxWidth: 345, minWidth: 300, margin: "auto", mt: 5 }}>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <Avatar
                  sx={{ bgcolor: deepOrange[500] }}
                  src={userDetails?.photoURL}
                >
                  {userDetails?.displayName ? userDetails.displayName[0] : "U"}
                </Avatar>
                <div style={{ marginLeft: "16px" }}>
                  <Typography variant="h5" component="div">
                    {userDetails?.FirstName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userDetails?.email}
                  </Typography>
                </div>
              </div>
              <Divider />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {userDetails?.bio || "No bio available."}
                </Typography>
              </CardContent>
              <div
                className="flex items-center cursor-pointer gap-2"
                onClick={handleSignOut}
              >
                <span>
                  <CiLogout />
                </span>{" "}
                <div>Log Out</div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Navbar;
