import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase";


const getCurrentMonth = () => {
  return new Date().toISOString().slice(0, 7);
};


const DEFAULT_USAGE = {
  careerAssessment: 0,
  careerMentor: 0,
  mockInterview: 0,
  resumeAnalysis: 0,
  careerRoadmap: 0,
  jobGuidance: 0,
};


export const initializeUserPlan = async (userId) => {
  try {

    const userRef = doc(
      db,
      "users",
      userId
    );

    const userSnap =
      await getDoc(userRef);

    if (!userSnap.exists()) {
      return null;
    }

    const userData =
      userSnap.data();

    const currentMonth =
      getCurrentMonth();

    const updates = {};

    // Add Free plan if missing
    if (!userData.plan) {
      updates.plan = "free";
    }

    // Add subscription status if missing
    if (!userData.subscriptionStatus) {
      updates.subscriptionStatus = "none";
    }

    // Add usage if missing
    if (!userData.usage) {
      updates.usage = {
        ...DEFAULT_USAGE,
      };
    }

    // Add current month if missing
    if (!userData.usageMonth) {
      updates.usageMonth =
        currentMonth;
    }

    // -----------------------------------------
    // MONTHLY USAGE RESET
    // -----------------------------------------

    const savedMonth =
      userData.usageMonth;

    if (
      savedMonth &&
      savedMonth !== currentMonth
    ) {
      updates.usage = {
        ...DEFAULT_USAGE,
      };

      updates.usageMonth =
        currentMonth;

      console.log(
        "New month detected. Usage reset:",
        currentMonth
      );
    }

    // Save only if something needs updating
    if (Object.keys(updates).length > 0) {

      await setDoc(
        userRef,
        updates,
        { merge: true }
      );

      console.log(
        "User plan updated:",
        updates
      );
    }

    return {
      ...userData,
      ...updates,
    };

  } catch (error) {

    console.error(
      "Error initializing user plan:",
      error
    );

    return null;
  }
};