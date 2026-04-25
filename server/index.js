const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure directories exist
const uploadDir = path.join(__dirname, 'uploads');
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const BOOKS_FILE = path.join(dataDir, 'books.json');

// Helper to read/write data
const getBooksData = () => {
  if (!fs.existsSync(BOOKS_FILE)) return { scriptureBooks: [], voiceBooks: [] };
  const data = fs.readFileSync(BOOKS_FILE);
  return JSON.parse(data);
};

const saveBooksData = (data) => {
  fs.writeFileSync(BOOKS_FILE, JSON.stringify(data, null, 2));
};

// Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Routes
app.get('/api/books', (req, res) => {
  res.json(getBooksData());
});

app.post('/api/books/scripture', upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]), (req, res) => {
  const { title, grade, description } = req.body;
  const data = getBooksData();
  
  const files = req.files;
  const coverImageUrl = files.coverImage ? `http://localhost:5000/uploads/${files.coverImage[0].filename}` : null;
  const fileUrl = files.file ? `http://localhost:5000/uploads/${files.file[0].filename}` : null;

  const newBook = {
    id: Date.now().toString(),
    title,
    grade,
    description,
    imageUri: coverImageUrl,
    fileUrl: fileUrl,
    category: 'Grade',
    type: 'scripture'
  };

  data.scriptureBooks.unshift(newBook);
  saveBooksData(data);
  res.status(201).json(newBook);
});

app.post('/api/books/voice', upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]), (req, res) => {
  const { title, month, year, subtitle, description } = req.body;
  const data = getBooksData();

  const files = req.files;
  const coverImageUrl = files.coverImage ? `http://localhost:5000/uploads/${files.coverImage[0].filename}` : null;
  const fileUrl = files.file ? `http://localhost:5000/uploads/${files.file[0].filename}` : null;

  const newIssue = {
    id: Date.now().toString(),
    title,
    month,
    year,
    subtitle,
    description,
    imageUri: coverImageUrl,
    fileUrl: fileUrl,
    category: 'Topic',
    type: 'voice',
    isNew: false // Default to false as per request to remove NEW labels
  };

  data.voiceBooks.unshift(newIssue);
  saveBooksData(data);
  res.status(201).json(newIssue);
});

app.delete('/api/books/:type/:id', (req, res) => {
  const { type, id } = req.params;
  const data = getBooksData();
  
  if (type === 'scripture') {
    data.scriptureBooks = data.scriptureBooks.filter(b => b.id !== id);
  } else {
    data.voiceBooks = data.voiceBooks.filter(b => b.id !== id);
  }

  saveBooksData(data);
  res.status(200).json({ message: 'Deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
