import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/Users.js';

const router = express.Router();

// @route   GET api/buddy/matches
// @desc    Get potential buddy matches
// @access  Private
router.get('/matches', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    const potentialBuddies = await User.find({
      _id: { $ne: user._id },
      buddy: { $exists: false },
      bmi: { 
        $gte: user.bmi - 2,
        $lte: user.bmi + 2
      },
      goal: user.goal,
      activityLevel: user.activityLevel
    })
    .select('-password')
    .limit(10);

    res.json(potentialBuddies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/buddy/connect
// @desc    Connect with a buddy
// @access  Private
router.post('/connect', auth, async (req, res) => {
  try {
    const { buddyId } = req.body;
    const userId = req.user.id;

    // Update both users
    await User.findByIdAndUpdate(userId, { buddy: buddyId });
    await User.findByIdAndUpdate(buddyId, { buddy: userId });

    res.json({ message: 'Successfully connected with buddy' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/buddy/disconnect
// @desc    Disconnect from current buddy
// @access  Private
router.delete('/disconnect', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const buddyId = user.buddy;

    // Remove buddy connection for both users
    await User.findByIdAndUpdate(req.user.id, { $unset: { buddy: 1 } });
    await User.findByIdAndUpdate(buddyId, { $unset: { buddy: 1 } });

    res.json({ message: 'Successfully disconnected from buddy' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
