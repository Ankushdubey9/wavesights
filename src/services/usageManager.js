import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

import { getFeatureLimit } from "../config/planConfig";


/**
 * Check whether the user can use a feature.
 *
 * Returns:
 * {
 *   allowed: true/false,
 *   remaining: number,
 *   limit: number,
 *   used: number,
 *   plan: "free" | "pro"
 * }
 */
export const checkFeatureAccess = async (
  userId,
  feature
) => {
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
        allowed: false,
        remaining: 0,
        limit: 0,
        used: 0,
        plan: "free",
      };
    }

    const userData =
      userSnap.data();

    const plan =
      userData.plan || "free";

    const usage =
      userData.usage || {};

    const used =
      usage[feature] || 0;

    const limit =
      getFeatureLimit(
        plan,
        feature
      );

    const remaining =
      Math.max(
        limit - used,
        0
      );

    return {
      allowed: used < limit,
      remaining,
      limit,
      used,
      plan,
    };

  } catch (error) {

    console.error(
      "Error checking feature access:",
      error
    );

    return {
      allowed: false,
      remaining: 0,
      limit: 0,
      used: 0,
      plan: "free",
    };
  }
};


/**
 * Increase feature usage by 1.
 */
export const incrementFeatureUsage = async (
  userId,
  feature
) => {

  try {

    const userRef =
      doc(
        db,
        "users",
        userId
      );

    const userSnap =
      await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error(
        "User profile not found"
      );
    }

    const userData =
      userSnap.data();

    const currentUsage =
      userData.usage || {};

    const currentCount =
      currentUsage[feature] || 0;

    await updateDoc(
      userRef,
      {
        [`usage.${feature}`]:
          currentCount + 1,
      }
    );

    return true;

  } catch (error) {

    console.error(
      "Error updating feature usage:",
      error
    );

    return false;
  }
};