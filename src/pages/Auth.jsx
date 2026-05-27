import { useState } from "react";

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase";

import { useNavigate } from "react-router-dom";

export default function Auth() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // GOOGLE AUTH

  const googleAuth = async () => {

    try {

      setLoading(true);

      const provider =
        new GoogleAuthProvider();

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      const user =
        result.user;

      const userRef =
        doc(db, "users", user.uid);

      const userSnap =
        await getDoc(userRef);

      // SAVE LOCAL

      localStorage.setItem(
        "name",
        user.displayName
      );

      localStorage.setItem(
        "photo",
        user.photoURL
      );

      localStorage.setItem(
        "email",
        user.email
      );

      // NEW USER

      if (!userSnap.exists()) {

        await setDoc(userRef, {

          name:
            user.displayName,

          email:
            user.email,

          photo:
            user.photoURL,

          xp: 0,

          streak: 1,

          badge:
            "Starter",

          createdAt:
            new Date(),
        });

        navigate(
          "/onboarding/user-type"
        );

      } else {

        navigate("/dashboard");
      }

    } catch (error) {

      console.log(error);

      alert(error.message);

    } finally {

      setLoading(false);
    }
  };

  // EMAIL SIGNUP

  const signup = async () => {

    try {

      setLoading(true);

      const result =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user =
        result.user;

      await updateProfile(user, {

        displayName: name,
      });

      await setDoc(
        doc(db, "users", user.uid),
        {

          name,

          email,

          photo:
            "https://ui-avatars.com/api/?name=" +
            name,

          xp: 0,

          streak: 1,

          badge:
            "Starter",

          createdAt:
            new Date(),
        }
      );

      localStorage.setItem(
        "name",
        name
      );

      localStorage.setItem(
        "email",
        email
      );

      navigate(
        "/onboarding/user-type"
      );

    } catch (error) {

      alert(error.message);

    } finally {

      setLoading(false);
    }
  };

  // EMAIL LOGIN

  const login = async () => {

    try {

      setLoading(true);

      const result =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user =
        result.user;

        localStorage.setItem(
  "email",
  user.email
);

      localStorage.setItem(
        "name",
        user.displayName
      );

      localStorage.setItem(
        "email",
        user.email
      );

      localStorage.setItem(
        "photo",
        user.photoURL
      );

      navigate("/dashboard");

    } catch (error) {

      alert(error.message);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center px-6 py-10 overflow-hidden relative">

      {/* Glow */}

      <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl w-full relative z-10">

        {/* LEFT */}

        <div className="hidden lg:flex flex-col justify-center">

          <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-400/20 px-5 py-3 rounded-full text-cyan-300 text-sm font-semibold mb-8 w-fit">

            AI Powered Career Platform

          </div>

          <h1 className="text-7xl font-black leading-tight">

            Welcome To
<img  
  src={logo}  
  alt="logo"  
  className="w-24 h-24 mx-auto object-contain mb-6"  
/>

          </h1>

          <p className="mt-8 text-gray-400 text-xl leading-relaxed">

            Personalized AI roadmaps,
            career guidance,
            mock interviews,
            resume analysis,
            and future-ready skills.

          </p>

          <div className="mt-12 grid grid-cols-2 gap-6">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

              <h3 className="text-4xl font-black text-cyan-400">

                10K+

              </h3>

              <p className="text-gray-400 mt-2">

                Students

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

              <h3 className="text-4xl font-black text-cyan-400">

                AI

              </h3>

              <p className="text-gray-400 mt-2">

                Career Guidance

              </p>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-10 shadow-2xl">

          {/* Tabs */}

          <div className="flex bg-white/5 rounded-2xl p-2 mb-10">

            <button

              onClick={() =>
                setIsLogin(false)
              }

              className={`flex-1 py-4 rounded-2xl font-bold transition duration-300

              ${
                !isLogin

                  ? "bg-cyan-500 text-black"

                  : "text-gray-400"
              }`}
            >

              Sign Up

            </button>

            <button

              onClick={() =>
                setIsLogin(true)
              }

              className={`flex-1 py-4 rounded-2xl font-bold transition duration-300

              ${
                isLogin

                  ? "bg-cyan-500 text-black"

                  : "text-gray-400"
              }`}
            >

              Login

            </button>

          </div>

          {/* Heading */}

          <h2 className="text-4xl font-black mb-4">

            {
              isLogin

                ? "Welcome Back"

                : "Create Account"
            }

          </h2>

          <p className="text-gray-400 mb-10">

            Continue your AI career journey.

          </p>

          {/* Inputs */}

          <div className="space-y-5">

            {!isLogin && (

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full bg-white/5 border border-white/10 focus:border-cyan-400 outline-none px-6 py-5 rounded-2xl"
              />
            )}

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full bg-white/5 border border-white/10 focus:border-cyan-400 outline-none px-6 py-5 rounded-2xl"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full bg-white/5 border border-white/10 focus:border-cyan-400 outline-none px-6 py-5 rounded-2xl"
            />

            {/* Main Button */}

            <button

              onClick={
                isLogin
                  ? login
                  : signup
              }

              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-[1.02] text-black py-5 rounded-2xl font-black text-lg transition duration-300"
            >

              {
                loading

                  ? "Please wait..."

                  : isLogin

                  ? "Login"

                  : "Create Account"
              }

            </button>

            {/* Divider */}

            <div className="flex items-center gap-4 py-4">

              <div className="flex-1 h-px bg-white/10"></div>

              <span className="text-gray-500">

                OR

              </span>

              <div className="flex-1 h-px bg-white/10"></div>

            </div>

            {/* Google */}

            <button

              onClick={googleAuth}

              className="w-full bg-white text-black py-5 rounded-2xl font-bold hover:scale-[1.02] transition duration-300"
            >

              Continue with Google

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}