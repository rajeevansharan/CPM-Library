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
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

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

// ─── Toggle SAVE Book ─────────────────────────────────────────────────────────
router.post('/save', async (req, res) => {
  try {
    const { userId, bookId, bookType } = req.body;

    if (!userId || !bookId || !bookType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if already saved
    const existing = await prisma.savedBook.findUnique({
      where: {
        userId_bookId_bookType: {
          userId,
          bookId,
          bookType
        }
      }
    });

    if (existing) {
      // Unsave
      await prisma.savedBook.delete({
        where: { id: existing.id }
      });
      return res.status(200).json({ saved: false, message: 'Book unsaved successfully' });
    } else {
      // Save
      await prisma.savedBook.create({
        data: {
          userId,
          bookId,
          bookType
        }
      });
      return res.status(201).json({ saved: true, message: 'Book saved successfully' });
    }
  } catch (error) {
    console.error('Error toggling save:', error);
    res.status(500).json({ message: 'Failed to toggle save', error: error.message });
  }
});

// ─── GET Saved Books for User ──────────────────────────────────────────────────
router.get('/saved/:userId', async (req, res) => {
  try {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    const { userId } = req.params;

    const savedRecords = await prisma.savedBook.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    // Fetch full book details for each saved record
    const detailedBooks = await Promise.all(
      savedRecords.map(async (record) => {
        let bookDetails = null;
        if (record.bookType === 'scripture') {
          bookDetails = await prisma.scriptureBook.findUnique({ where: { id: record.bookId } });
        } else if (record.bookType === 'voice') {
          bookDetails = await prisma.voiceBook.findUnique({ where: { id: record.bookId } });
        } else if (record.bookType === 'pentecost') {
          bookDetails = await prisma.pentecostBook.findUnique({ where: { id: record.bookId } });
        }
        
        if (!bookDetails) return null;
        return { ...bookDetails, savedId: record.id, displayType: record.bookType };
      })
    );

    // Filter out any nulls (if a book was deleted but still in saved_books)
    res.json(detailedBooks.filter(b => b !== null));
  } catch (error) {
    console.error('Error fetching saved books:', error);
    res.status(500).json({ message: 'Failed to fetch saved books', error: error.message });
  }
});

// ─── PUT Update Book ─────────────────────────────────────────────────────────────
router.put('/:type/:id', upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]), async (req, res) => {
  try {
    const { type, id } = req.params;
    const files = req.files;

    let coverImageUrl = undefined;
    let fileUrl = undefined;

    // 1. Upload new Cover Image to Cloudinary if supplied
    if (files && files.coverImage) {
      const result = await uploadToCloudinary(files.coverImage[0].buffer, {
        folder: 'cpm_library/covers',
        resource_type: 'image'
      });
      coverImageUrl = result.secure_url;
    }

    // 2. Upload new PDF File to Cloudinary if supplied
    if (files && files.file) {
      const result = await uploadToCloudinary(files.file[0].buffer, {
        folder: 'cpm_library/publications',
        resource_type: 'raw'
      });
      fileUrl = result.secure_url;
    }

    let updatedBook = null;

    if (type === 'scripture') {
      const { title, grade, description } = req.body;
      const data = {
        title,
        grade,
        description: description === 'undefined' ? null : description,
      };
      if (coverImageUrl) data.imageUri = coverImageUrl;
      if (fileUrl) data.fileUrl = fileUrl;

      updatedBook = await prisma.scriptureBook.update({
        where: { id },
        data
      });
    } else if (type === 'voice') {
      const { title, month, year, subtitle, description } = req.body;
      const data = {
        title,
        month,
        year,
        subtitle: subtitle === 'undefined' ? null : subtitle,
        description: description === 'undefined' ? null : description,
      };
      if (coverImageUrl) data.imageUri = coverImageUrl;
      if (fileUrl) data.fileUrl = fileUrl;

      updatedBook = await prisma.voiceBook.update({
        where: { id },
        data
      });
    } else if (type === 'pentecost') {
      const { title, author, description, category, languages } = req.body;
      const data = {
        title,
        author: author === 'undefined' ? null : author,
        description: description === 'undefined' ? null : description,
        category: category || 'General',
        languages: languages ? JSON.parse(languages) : [],
      };
      if (coverImageUrl) data.imageUri = coverImageUrl;
      if (fileUrl) data.fileUrl = fileUrl;

      updatedBook = await prisma.pentecostBook.update({
        where: { id },
        data
      });
    } else {
      return res.status(400).json({ message: `Invalid book type: ${type}` });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Failed to update book', error: error.message });
  }
});

module.exports = router;

