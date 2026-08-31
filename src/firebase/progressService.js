import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase";

// =====================================================
// SAVE LEARNING PROGRESS
// =====================================================

export const saveProgress = async (
  userId,
  completedSteps
) => {
  try {
    const userRef = doc(
      db,
      "users",
      userId
    );

    await setDoc(
      userRef,
      {
        completedSteps,
      },
      {
        merge: true,
      }
    );

    console.log(
      "Progress Saved:",
      completedSteps
    );

  } catch (error) {

    console.error(
      "Save progress error:",
      error
    );

    throw error;
  }
};


// =====================================================
// LOAD LEARNING PROGRESS
// =====================================================

export const loadProgress = async (
  userId
) => {

  try {

    const userRef = doc(
      db,
      "users",
      userId
    );

    const userSnap =
      await getDoc(userRef);

    if (userSnap.exists()) {

      return (
        userSnap.data()
          .completedSteps || []
      );
    }

    return [];

  } catch (error) {

    console.error(
      "Load progress error:",
      error
    );

    return [];
  }
};


// =====================================================
// UPDATE LEARNING STREAK
// =====================================================

export const updateLearningStreak =
  async (userId) => {

    try {

      const userRef = doc(
        db,
        "users",
        userId
      );

      const userSnap =
        await getDoc(userRef);

      const today =
        new Date().toDateString();

      if (userSnap.exists()) {

        const data =
          userSnap.data();

        const lastActiveDate =
          data.lastActiveDate;

        let streak =
          data.learningStreak || 0;

        if (
          lastActiveDate !== today
        ) {

          streak += 1;

          await setDoc(
            userRef,
            {
              learningStreak:
                streak,

              lastActiveDate:
                today,
            },
            {
              merge: true,
            }
          );
        }

      } else {

        await setDoc(
          userRef,
          {
            learningStreak: 1,

            lastActiveDate:
              today,
          },
          {
            merge: true,
          }
        );
      }

    } catch (error) {

      console.error(
        "Update streak error:",
        error
      );
    }
  };


// =====================================================
// GET USER PLAN / PRO STATUS
// =====================================================

export const getUserPlan =
  async (userId) => {

    try {

      const userRef = doc(
        db,
        "users",
        userId
      );

      const userSnap =
        await getDoc(userRef);

      // -----------------------------------------------
      // USER DOES NOT EXIST
      // -----------------------------------------------

      if (!userSnap.exists()) {

        return {
          plan: "free",
          isPro: false,
          expiresAt: null,
          activatedAt: null,
        };
      }

      const data =
        userSnap.data();

      const plan =
        data.plan || "free";

      const expiresAt =
        data.proExpiresAt || null;

      const activatedAt =
        data.proActivatedAt || null;

      let isPro = false;

      // -----------------------------------------------
      // CHECK PRO EXPIRY
      // -----------------------------------------------

      if (
        plan === "pro" &&
        expiresAt
      ) {

        const expiryDate =
          expiresAt.toDate
            ? expiresAt.toDate()
            : new Date(expiresAt);

        isPro =
          expiryDate.getTime() >
          Date.now();
      }

      // -----------------------------------------------
      // RETURN PLAN
      // -----------------------------------------------

      return {

        plan:
          isPro
            ? "pro"
            : "free",

        isPro,

        expiresAt,

        activatedAt,
      };

    } catch (error) {

      console.error(
        "Get user plan error:",
        error
      );

      return {

        plan: "free",

        isPro: false,

        expiresAt: null,

        activatedAt: null,
      };
    }
  };


// =====================================================
// QUICK PRO CHECK
// =====================================================

export const isProUser =
  async (userId) => {

    const planData =
      await getUserPlan(
        userId
      );

    return planData.isPro;
  };