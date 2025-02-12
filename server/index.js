
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg"
import bcrypt from "bcrypt"
import bodyParser from "body-parser";
import path from "path";
import multer from "multer";

dotenv.config(); // Correct way to use dotenv in ES modules

const app = express();
const port = 3000;
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors({credentials:true,origin: "http://localhost:5173"}))

// connceting database
const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.stack);
    } else {
        console.log("Database connected successfully.");
    }
});

const storage = multer.diskStorage({
    destination: './uploads', // Ensure this directory exists
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extname && mimeType) {
            cb(null, true);
        } else {
            cb(new Error('Only images (jpg, jpeg, png) are allowed.'));
        }
    },
});

// app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
    res.send('Hello')
    // res.status(200).json({ message: "Welcome to the API" });
  });

app.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO blog (username, email, password) VALUES ($1, $2, $3) RETURNING id`;
        const values = [username, email, hashedPassword];

        const result = await db.query(query, values);
        res.status(201).json({ message: "User registered successfully!", userId: result.rows[0].id });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Registration failed." });
    }
});

// // Login Endpoint
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = `SELECT * FROM blog WHERE email = $1`;
        const values = [email];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        res.status(200).json({ message: "Login successful!", userId: user.id });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Login failed." });
    }
});


app.post('/api/create', upload.single('thumbnail'), async (req, res) => {
    try {

    const { title, category, desc,author } = req.body;
    
  
    if (!title || !desc) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }
  
    
      // Save to database
      const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;

      const result = await db.query (
        'INSERT INTO posts (title, category, description,thumbnail,author ) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, category, desc,thumbnail,author ]
      );
  
      res.status(201).json({ message: 'Post created successfully', post: result.rows[0] });
    } catch (err) {
      console.error('Error creating post:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/posts', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM posts');  
        console.log("Fetched Posts from DB:", result.rows); // Debugging
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

  

// // module.exports=upload;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
});
