import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase";

// =====================================================
// SAVE ROADMAP PROGRESS
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
// LOAD ROADMAP PROGRESS
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

export const getUserPlan = async (userId) => {
  try {
    const userRef = doc(
      db,
      "users",
      userId
    );

    const userSnap =
      await getDoc(userRef);

    // User document doesn't exist
    if (!userSnap.exists()) {
      return {
        isPro: false,
        expiresAt: null,
      };
    }

    const data =
      userSnap.data();

    const plan =
      data.plan || "free";

    const expiresAt =
      data.proExpiresAt || null;

    let isPro = false;

    // Check Pro expiry
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

    return {
      isPro,
      expiresAt,
    };

  } catch (error) {

    console.error(
      "Get user plan error:",
      error
    );

    return {
      isPro: false,
      expiresAt: null,
    };
  }
};

// =====================================================
// GET USER PLAN
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

      if (!userSnap.exists()) {
        return {
          plan: "free",
          isPro: false,
          expiresAt: null,
        };
      }

      const data =
        userSnap.data();

      const plan =
        data.plan || "free";

      const expiresAt =
        data.proExpiresAt || null;

      // -----------------------------------------------
      // CHECK EXPIRY
      // -----------------------------------------------

      let isPro = false;

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

      return {
        plan,
        isPro,
        expiresAt,
        activatedAt:
          data.proActivatedAt ||
          null,
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
      };
    }
  };