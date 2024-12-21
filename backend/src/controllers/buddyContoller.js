import User from '../models/User.js';
import { findBuddyMatch } from '../utils/buddyMatcher.js';

export const findBuddy = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming auth middleware sets user
    const buddy = await findBuddyMatch(userId);
    
    if (!buddy) {
      return res.status(404).json({ message: 'No suitable buddy found' });
    }

    await User.findByIdAndUpdate(userId, { buddy: buddy._id });
    await User.findByIdAndUpdate(buddy._id, { buddy: userId });

    res.json({ buddy });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
