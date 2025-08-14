const multer = require('multer');
const path = require('path');

// Store uploaded files on my server’s disk
const storage = multer.diskStorage({
    // A function that decides where to save the uploaded file.
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Callback function
    },
    // A function that decides the file name saved on disk.
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Current timestamp (unique file names) + Keeps the original file extension (.jpg, .png, etc.)
    }
});

const upload = multer({ storage });

module.exports = upload;