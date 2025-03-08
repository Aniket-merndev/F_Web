import { Router } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from "../databases/database.js";
import multer from 'multer';

const parseForm = multer().none();

const authRouter = Router();

// Middleware to verify token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
  
    if (!token) {
      console.error('No token provided');
      return res.status(401).json({ message: 'Token is required' });
  }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
    console.log('Decoded JWT:', user); 
      req.user = user; // Attach user payload to request
      next();
    });
};

// /auth/me Route to verify user

// authRouter.get('/me', authenticateToken, async (req, res) => {
//     try {
//       const { id } = req.user; // Assuming JWT payload contains `id`
//       const [user] = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [id]);
  
//       if (!user || user.length === 0) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       console.log(user[0]);
//       res.json(user[0]); // Respond with user details
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

authRouter.get('/me', authenticateToken, async (req, res) => {
  try {
    console.log('Request User:', req.user); // Log the user from the JWT
    const { id } = req.user;

    if (!id) {
      return res.status(400).json({ message: 'Invalid user ID in token' });
    }

    // const { rows } = await pool.query(
    //   'SELECT id, username, email FROM users WHERE id = $1',
    //   [id]
    // );

    const users = await pool`
    SELECT id, username, email FROM users WHERE id = ${id}
  `;

    console.log('Database Query Result', users); // Log the database query result

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(users[0]); // Respond with user details
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST /login route
authRouter.post('/login',parseForm, async (req, res) => {
  // console.log(`Login request: ${req.body}`);
  console.log(`Request Body: ${JSON.stringify(req.body)}`);
  const { email_username, password } = req.body;

  if (!email_username || !password) {
    return res.status(400).send("Bad Request: Missing email_username or password.");
}

try {
  // const { rows: users } = await pool.query(
  //     'SELECT * FROM users WHERE username = $1 OR email = $2',
  //     [email_username, email_username]
  // );

  const users = await pool`
  SELECT * FROM users WHERE username = ${email_username} OR email = ${email_username}
`;


    // console.log(users);

    if (users.length === 0) {
      return res.status(400).send('User not found');
    }

    // let user;

    let isAuthenticated = false;
    let authenticatedUser = null;
    
    for (const user of users) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
          isAuthenticated = true;
          authenticatedUser = user;
          break;
      }
  }

  if (!isAuthenticated) {
    return res.status(400).send("Invalid password");
}

    // Generate JWT
  //   const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  //   res.json({ token:token, username: user.username });
  // } catch (error) {
  //   res.status(500).send('Server error');
  // }

  const token = jwt.sign(
    { id: authenticatedUser.id, username: authenticatedUser.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
);

res.json({ token, username: authenticatedUser.username });
} catch (error) {
console.error("Server error:", error);
res.status(500).send("Server error");
}

});

// POST  /signup route
authRouter.post('/signup',parseForm, async (req, res) => {
  console.log(`Signup request: ${JSON.stringify(req.body)}`);
    const { email, username, password } = req.body;
    
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        // await pool.query(
        //     'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
        //     [username, email, hashedPassword]
        // );

        await pool`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${email}, ${hashedPassword})
    `;

        res.status(201).send('User created successfully');
        } catch (error) {
          if (error.code === '23505') {
            res.status(400).send('Email is already in use');
        } else {
            res.status(500).send('Server error');
        }
    }

})

export {authRouter};