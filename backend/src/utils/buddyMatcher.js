import User from '../models/User.js';

export const findBuddyMatch = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const potentialBuddies = await User.find({
    _id: { $ne: userId },
    buddy: { $exists: false },
    bmi: { 
      $gte: user.bmi - 2,
      $lte: user.bmi + 2,
    },
    goal: user.goal,
    activityLevel: user.activityLevel,
  }).limit(10);

  const sortedBuddies = potentialBuddies.sort((a, b) => 
    Math.abs(a.bmi - user.bmi) - Math.abs(b.bmi - user.bmi)
  );

  return sortedBuddies[0] || null;
};
