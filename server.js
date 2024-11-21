const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Encryption key (keep this safe)
const ENCRYPTION_KEY = crypto.randomBytes(32); // 32 bytes key for AES-256
const IV_LENGTH = 16; // Initialization vector length

// Encryption function
function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

// Decryption function
function decrypt(text) {
    const [iv, encryptedText] = text.split(':');
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        ENCRYPTION_KEY,
        Buffer.from(iv, 'hex')
    );
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Store encrypted data in a JSON file
const DATA_FILE = 'database.json';

function saveData(data) {
    let existingData = [];
    if (fs.existsSync(DATA_FILE)) {
        existingData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
    existingData.push(data);
    fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));
}

// Routes
app.post('/submit', (req, res) => {
    const { name, email, phone, password } = req.body;

    // Encrypt data
    const encryptedData = {
        name: encrypt(name),
        email: encrypt(email),
        phone: encrypt(phone),
        password: encrypt(password),
    };

    // Save to database
    saveData(encryptedData);

    res.json({ message: 'Data saved successfully!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
