import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import DashboardCards from "../components/admin/DashboardCards";
import AnalyticsChart from "../components/admin/AnalyticsChart";
import UsersTable from "../components/admin/UsersTable";
import ContactsTable from "../components/admin/ContactsTable";
import SubscribersTable from "../components/admin/SubscribersTable";
import Loading from "../components/admin/Loading";

import {
  getUsers,
  getContacts,
  getSubscribers,
  deleteUser,
  deleteContact,
  deleteSubscriber,
} from "../services/adminService";

export default function Admin() {
  const navigate = useNavigate();

  // -------------------------
  // STATES
  // -------------------------

  const [loading, setLoading] = useState(true);

  const [active, setActive] = useState("Dashboard");

  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);

  const [contacts, setContacts] = useState([]);

  const [subscribers, setSubscribers] = useState([]);

  const [usersCount, setUsersCount] = useState(0);

  // -------------------------
  // FETCH DATA
  // -------------------------

  const fetchData = async () => {
    try {
      const usersData = await getUsers();

      const contactsData = await getContacts();

      const subscribersData = await getSubscribers();

      setUsers(usersData);

      setContacts(contactsData);

      setSubscribers(subscribersData);

      setUsersCount(usersData.length);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // AUTH CHECK
  // -------------------------

  useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, async (user) => {

    console.log("Current User :", user);

    if (!user) {

      console.log("No user found");

      navigate("/");

      return;

    }

    console.log("User Email :", user.email);

    if (user.email !== "dubeyankush2385@gmail.com") {

      console.log("Not Admin");

      navigate("/");

      return;

    }

    console.log("Admin Login Success");

    fetchData();

  });

  return () => unsubscribe();

}, [navigate]);

  // -------------------------
  // DELETE FUNCTIONS
  // -------------------------

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await deleteUser(id);

    fetchData();
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    await deleteContact(id);

    fetchData();
  };

  const handleDeleteSubscriber = async (id) => {
    if (!window.confirm("Delete subscriber?")) return;

    await deleteSubscriber(id);

    fetchData();
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-[#020817] text-white flex">
      {/* Sidebar */}

      <Sidebar active={active} setActive={setActive} />

      {/* Main */}

      <div className="flex-1 overflow-y-auto">
        {/* Top */}

        <div className="p-8">
          <Topbar
            search={search}
            setSearch={setSearch}
            refreshData={fetchData}
          />
        </div>

        {/* Dashboard */}

        <div className="px-8 pb-10">
          {/* Welcome */}

          <div className="mb-10">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm font-semibold">
              🚀 WaveSights Admin Dashboard
            </div>

            <h1 className="text-5xl font-black mt-6">Welcome Back</h1>

            <p className="text-gray-400 mt-3 text-lg">
              Monitor users, messages and platform growth.
            </p>
          </div>

          {/* Dashboard */}

{active === "Dashboard" && (
  <>
    <DashboardCards
      usersCount={usersCount}
      contactsCount={contacts.length}
      subscribersCount={subscribers.length}
    />

    <div className="mt-10">
      <AnalyticsChart
        users={usersCount}
        contacts={contacts.length}
        subscribers={subscribers.length}
      />
    </div>
  </>
)}

{/* Users */}

{active === "Users" && (
  <div className="mt-10">
    <UsersTable
      users={users}
      search={search}
      onDelete={handleDeleteUser}
    />
  </div>
)}

{/* Contacts */}

{active === "Contacts" && (
  <div className="mt-10">
    <ContactsTable
      contacts={contacts}
      search={search}
      onDelete={handleDeleteContact}
    />
  </div>
)}

{/* Subscribers */}

{active === "Subscribers" && (
  <div className="mt-10">
    <SubscribersTable
      subscribers={subscribers}
      search={search}
      onDelete={handleDeleteSubscriber}
    />
  </div>
)}

{/* Analytics */}

{active === "Analytics" && (
  <div className="mt-10">
    <AnalyticsChart
      users={usersCount}
      contacts={contacts.length}
      subscribers={subscribers.length}
    />
  </div>
)}

{/* Settings */}

{active === "Settings" && (
  <div className="mt-10 rounded-3xl bg-white/5 border border-white/10 p-10">

    <h2 className="text-4xl font-black">
      ⚙ Settings
    </h2>

    <p className="text-gray-400 mt-4">
      Admin settings will be available here.
    </p>

  </div>
)}
        </div>
         {/* Footer */}

      <footer className="border-t border-white/10 px-8 py-6 bg-[#020817]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">WaveSights Admin Panel</h3>

            <p className="text-gray-400 text-sm">AI Career Guidance Platform</p>
          </div>

          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <span>Users : {usersCount}</span>

            <span>Contacts : {contacts.length}</span>

            <span>Subscribers : {subscribers.length}</span>
          </div>
        </div>
      </footer>
      </div>
     
    </div>
  );
}
