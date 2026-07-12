import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";

// USERS

export const getUsers = async () => {

  const snapshot = await getDocs(
    collection(db, "users")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

};

// CONTACTS

export const getContacts = async () => {

  const snapshot = await getDocs(
    collection(db, "contacts")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

};

// SUBSCRIBERS

export const getSubscribers = async () => {

  const snapshot = await getDocs(
    collection(db, "subscribers")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

};

// DELETE USER

export const deleteUser = async (id) => {

  await deleteDoc(
    doc(db, "users", id)
  );

};

// DELETE CONTACT

export const deleteContact = async (id) => {

  await deleteDoc(
    doc(db, "contacts", id)
  );

};

// DELETE SUBSCRIBER

export const deleteSubscriber = async (id) => {

  await deleteDoc(
    doc(db, "subscribers", id)
  );

};