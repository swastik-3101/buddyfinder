export default (req, res, next) => {
    try {
      // Implement your authentication logic
      req.user = { id: 'someUserId' }; // Example user data
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  