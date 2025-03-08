import { Router } from "express";
import multer from "multer";
import path from "path";
import { pool } from "../databases/database.js";

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: 'backend/uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const filetypes = /json/; // Allowed file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only JSON files are allowed!'));
    }
  },
});

function parseFilename(storedFilename) {    // Use it if you need to
  // Split the filename at the first hyphen
  const [timestamp, ...originalNameParts] = storedFilename.split('-');
  
  // Join the rest of the parts back into the original filename
  const originalFilename = originalNameParts.join('-');

  // Convert the timestamp to a human-readable date
  const uploadDate = new Date(parseInt(timestamp, 10)).toLocaleString();

  return { uploadDate, originalFilename };
}

// // Example usage
// const storedFilename = '1736853070273-Hardware.json';
// const parsedData = parseFilename(storedFilename);

// console.log(parsedData);
// // Output:
// // { uploadDate: '1/15/2025, 10:44:30 AM', originalFilename: 'Hardware.json' }

const filesRouter = Router();

filesRouter.get('/fetch', async (req, res) => {
    console.log(req.query);
    try {
      const { user } = req.query;
  
      if (!user) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      // Query to fetch files associated with the user
      // const result = await pool.query(
      //   'SELECT fileid, filename, path, mimetype, uploadDate FROM files WHERE "user" = $1',
      //   [user]
      // );
      // const files = result.rows;

      const files = await pool`
  SELECT fileid, filename, path, mimetype, uploadDate FROM files WHERE "user" = ${user}
`;
    
        res.json({ success: true, files });
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

filesRouter.post('/upload', upload.single('file'), async (req, res) => {
  try {
    let { user } = req.body; // Extract user ID from the request body
    const file = req.file; // Multer attaches file info here
    // console.log(JSON.stringify(req.body));
    console.log(user);
    console.log(file);

    if (!file) {
      return res.status(400).json({ message: 'File and user ID are required' });
    }

    if (!user) {
      user = "Guest";
    }

    // Save file metadata in the database
    // await pool.query(
    //   'INSERT INTO files (fileid, filename, path, mimetype, size, "user") VALUES ($1, $2, $3, $4, $5, $6)',
    //   [file.filename, file.originalname, file.path, file.mimetype, file.size, user]
    // );

    await pool`
  INSERT INTO files (fileid, filename, path, mimetype, size, "user")
  VALUES (${file.filename}, ${file.originalname}, ${file.path}, ${file.mimetype}, ${file.size}, ${user})
`;

    res.json({ success: true, message: 'File uploaded successfully', fileid: file.filename });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }  
});

filesRouter.get('/use', async (req, res) => {
  console.log(req.query);
  try {
    const { fileid } = req.query;

    // Query the database to get the file metadata
    // const result = await pool.query('SELECT path, mimetype, filename FROM files WHERE fileid = $1', [fileid]);
    // const rows = result.rows;

    const files = await pool`
      SELECT path, mimetype, filename FROM files WHERE fileid = ${fileid}
    `;
    
    if (files.length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }

    const fileData = files[0];

    // Ensure the file exists on the server
    // if (!fs.existsSync(fileData.path)) {
    //   return res.status(404).json({ message: 'File not found on the server' });
    // }

    // Set appropriate headers and send the file
    res.setHeader('Content-Disposition', `attachment; filename="${fileData.filename}"`);
    res.setHeader('Content-Type', fileData.mimetype);
    res.sendFile(path.resolve(fileData.path));      

  } catch (error) {
      console.error('Error fetching file:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

export {filesRouter};
