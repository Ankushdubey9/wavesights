import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase";

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
      { merge: true }
    );

    console.log(
      "Progress Saved:",
      completedSteps
    );

  } catch (error) {
    console.log(error);
  }
};

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

    console.log(error);

    return [];
  }
};

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
            { merge: true }
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
          { merge: true }
        );
      }

    } catch (error) {

      console.log(error);
    }
  };