const express = require('express');
const multer = require('multer');
const streamifier = require('streamifier');
const prisma = require('../lib/prisma');
const cloudinary = require('../lib/cloudinary');

const router = express.Router();

// ─── Multer Storage Config (Memory Storage) ───────────────────────────────────
// We use memory storage to keep the file in buffer before streaming to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * Helper to upload a buffer to Cloudinary via stream
 */
const uploadToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// ─── GET all books ─────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const [scriptureBooks, voiceBooks, pentecostBooks] = await Promise.all([
      prisma.scriptureBook.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.voiceBook.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.pentecostBook.findMany({ orderBy: { createdAt: 'desc' } }),
    ]);

    res.json({ scriptureBooks, voiceBooks, pentecostBooks });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Failed to fetch books', error: error.message });
  }
});

// ─── POST Scripture Book ───────────────────────────────────────────────────────
router.post('/scripture', upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, grade, description } = req.body;
    const files = req.files;

    let coverImageUrl = null;
    let fileUrl = null;

    // 1. Upload Cover Image to Cloudinary
    if (files.coverImage) {
      const result = await uploadToCloudinary(files.coverImage[0].buffer, {
        folder: 'cpm_library/covers',
        resource_type: 'image'
      });
      coverImageUrl = result.secure_url;
    }

    // 2. Upload PDF File to Cloudinary
    if (files.file) {
      const result = await uploadToCloudinary(files.file[0].buffer, {
        folder: 'cpm_library/publications',
        resource_type: 'raw' // Important for non-image files like PDF
      });
      fileUrl = result.secure_url;
    }

    const newBook = await prisma.scriptureBook.create({
      data: {
        title,
        grade,
        description: description || null,
        imageUri: coverImageUrl,
        fileUrl: fileUrl,
        category: 'Grade',
        type: 'scripture',
      },
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating scripture book:', error);
    res.status(500).json({ message: 'Failed to create scripture book', error: error.message });
  }
});

// ─── POST Voice Book ───────────────────────────────────────────────────────────
router.post('/voice', upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, month, year, subtitle, description } = req.body;
    const files = req.files;

    let coverImageUrl = null;
    let fileUrl = null;

    if (files.coverImage) {
      const result = await uploadToCloudinary(files.coverImage[0].buffer, {
        folder: 'cpm_library/covers',
        resource_type: 'image'
      });
      coverImageUrl = result.secure_url;
    }

    if (files.file) {
      const result = await uploadToCloudinary(files.file[0].buffer, {
        folder: 'cpm_library/publications',
        resource_type: 'raw'
      });
      fileUrl = result.secure_url;
    }

    const newIssue = await prisma.voiceBook.create({
      data: {
        title,
        month,
        year,
        subtitle: subtitle || null,
        description: description || null,
        imageUri: coverImageUrl,
        fileUrl: fileUrl,
        category: 'Topic',
        type: 'voice',
        isNew: false,
      },
    });

    res.status(201).json(newIssue);
  } catch (error) {
    console.error('Error creating voice book:', error);
    res.status(500).json({ message: 'Failed to create voice book', error: error.message });
  }
});

// ─── POST Pentecost Book ───────────────────────────────────────────────────────
router.post('/pentecost', upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, author, description, category, languages } = req.body;
    const files = req.files;

    let coverImageUrl = null;
    let fileUrl = null;

    if (files.coverImage) {
      const result = await uploadToCloudinary(files.coverImage[0].buffer, {
        folder: 'cpm_library/covers',
        resource_type: 'image'
      });
      coverImageUrl = result.secure_url;
    }

    if (files.file) {
      const result = await uploadToCloudinary(files.file[0].buffer, {
        folder: 'cpm_library/publications',
        resource_type: 'raw'
      });
      fileUrl = result.secure_url;
    }

    const newBook = await prisma.pentecostBook.create({
      data: {
        title,
        author: author || null,
        description: description || null,
        category: category || 'General',
        languages: languages ? JSON.parse(languages) : [],
        imageUri: coverImageUrl,
        fileUrl: fileUrl,
        type: 'pentecost',
      },
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating pentecost book:', error);
    res.status(500).json({ message: 'Failed to create pentecost book', error: error.message });
  }
});

// ─── DELETE Book ───────────────────────────────────────────────────────────────
router.delete('/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;

    if (type === 'scripture') {
      await prisma.scriptureBook.delete({ where: { id } });
    } else if (type === 'voice') {
      await prisma.voiceBook.delete({ where: { id } });
    } else if (type === 'pentecost') {
      await prisma.pentecostBook.delete({ where: { id } });
    } else {
      return res.status(400).json({ message: `Invalid book type: ${type}` });
    }

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(500).json({ message: 'Failed to delete book', error: error.message });
  }
});

module.exports = router;
