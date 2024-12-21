import { User } from '../models/User.js';
import { readUsersFile, writeUsersFile } from '../utils/fileUtils.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await readUsersFile();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const users = await readUsersFile();
    const { name, age, weight, height, goal, activityLevel } = req.body;
    
    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    
    const newUser = new User(
      Date.now().toString(),
      name,
      age,
      weight,
      height,
      bmi,
      goal,
      activityLevel
    );
    
    users.push(newUser);
    await writeUsersFile(users);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const findBuddies = async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await readUsersFile();
    const currentUser = users.find(user => user.id === userId);
    
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const potentialBuddies = users.filter(user => {
      const bmiDiff = Math.abs(user.bmi - currentUser.bmi);
      return user.id !== userId && 
             bmiDiff <= 2 && 
             user.goal === currentUser.goal;
    });
    
    res.json(potentialBuddies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
