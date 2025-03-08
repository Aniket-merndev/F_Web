import { Router } from "express";
import jwt from 'jsonwebtoken';

const hardwareRouter = Router();

// Sample protected route to fetch hardware data
hardwareRouter.get('/hardware', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('No token provided');
    
    // Verify the token
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) return res.status(403).send('Failed to authenticate token');
      
      // Return hardware data (example)
      res.json({ data: 'Hardware Information' });
    });
});