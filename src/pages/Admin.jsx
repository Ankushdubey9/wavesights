import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

export default function Admin() {

  const [usersCount, setUsersCount] =
    useState(0);

  const [contacts, setContacts] =
    useState([]);

  const [subscribers, setSubscribers] =
    useState([]);
    const navigate = useNavigate();
    
useEffect(() => {

  const adminEmail =
    "dubeyankush2385@gmail.com";

  const currentUserEmail =
    localStorage.getItem("email");

  console.log(
    "Current User:",
    currentUserEmail
  );

  if (
    !currentUserEmail ||
    currentUserEmail !== adminEmail
  ) {

    navigate("/");
    return;
  }

  fetchData();

}, []);
  const fetchData = async () => {

    try {

      // USERS

      const usersSnapshot =
        await getDocs(
          collection(db, "users")
        );

      setUsersCount(
        usersSnapshot.size
      );

      // CONTACTS

      const contactsSnapshot =
        await getDocs(
          collection(db, "contacts")
        );

      const contactsData =
        contactsSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

      setContacts(
        contactsData
      );

      // SUBSCRIBERS

      const subscribersSnapshot =
        await getDocs(
          collection(
            db,
            "subscribers"
          )
        );

      const subscribersData =
        subscribersSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

      setSubscribers(
        subscribersData
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-[#020817] text-white p-8">

      {/* Heading */}

      <div className="mb-12">

        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm font-semibold mb-6">

          🚀 WaveSights Admin Panel

        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-tight">

          Platform

          <span className="block text-cyan-400">

            Analytics

          </span>

        </h1>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-gray-400 text-lg mb-4">

            👥 Total Users

          </h2>

          <p className="text-5xl font-black text-cyan-400">

            {usersCount}

          </p>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-gray-400 text-lg mb-4">

            📩 Contact Messages

          </h2>

          <p className="text-5xl font-black text-cyan-400">

            {contacts.length}

          </p>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-gray-400 text-lg mb-4">

            📧 Subscribers

          </h2>

          <p className="text-5xl font-black text-cyan-400">

            {subscribers.length}

          </p>

        </div>

      </div>

      {/* Contacts */}

      <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 mb-16 overflow-x-auto">

        <h2 className="text-3xl font-black mb-8">

          📩 Contact Messages

        </h2>

        <table className="w-full">

          <thead>

            <tr className="text-left text-gray-400 border-b border-white/10">

              <th className="pb-4">

                Name

              </th>

              <th className="pb-4">

                Email

              </th>

              <th className="pb-4">

                Message

              </th>

            </tr>

          </thead>

          <tbody>

            {contacts.map((item) => (

              <tr
                key={item.id}
                className="border-b border-white/5"
              >

                <td className="py-5">

                  {item.name}

                </td>

                <td className="py-5">

                  {item.email}

                </td>

                <td className="py-5">

                  {item.message}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Subscribers */}

      <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 overflow-x-auto">

        <h2 className="text-3xl font-black mb-8">

          📧 Newsletter Subscribers

        </h2>

        <table className="w-full">

          <thead>

            <tr className="text-left text-gray-400 border-b border-white/10">

              <th className="pb-4">

                Email

              </th>

            </tr>

          </thead>

          <tbody>

            {subscribers.map((item) => (

              <tr
                key={item.id}
                className="border-b border-white/5"
              >

                <td className="py-5">

                  {item.email}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}