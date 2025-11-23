// backend/server.js

// ==================== IMPORT PACKAGES ====================
const express = require('express');
const cors = require('cors');

// ==================== CREATE EXPRESS APP ====================
const app = express();
const PORT = 5000;

// ==================== MIDDLEWARE ====================
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Understand JSON data

// ==================== ROUTES ====================

// Test route - Check if server is working
app.get('/', (req, res) => {
    res.json({ 
        success: true,
        message: '🎉 Smart Classroom Backend is WORKING!',
        timestamp: new Date().toISOString()
    });
});

// Health check route
app.get('/health', (req, res) => {
    res.json({ 
        status: '✅ SERVER IS RUNNING',
        server: 'Smart Classroom Backend',
        time: new Date().toLocaleString()
    });
});

// Classroom data route
app.get('/api/classroom', (req, res) => {
    res.json({
        success: true,
        classroom: {
            teacher: 'Sonia Borse',
            subject: 'MCA-1 - Python',
            lectureTime: '10:00 AM - 11:00 AM',
            status: 'Backend Connected Successfully! 🚀'
        }
    });
});

// Teacher login test route
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    
    // Simple demo authentication
    if (username === 'teacher1' && password === 'teacher123') {
        res.json({
            success: true,
            message: 'Login successful!',
            user: {
                username: 'teacher1',
                role: 'teacher',
                name: 'Sonia Borse'
            }
        });
    } else if (username === 'admin1' && password === 'admin123') {
        res.json({
            success: true,
            message: 'Login successful!',
            user: {
                username: 'admin1',
                role: 'admin',
                name: 'Administrator'
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid username or password'
        });
    }
});

// Lecture status update route
app.put('/api/lectures/status', (req, res) => {
    const { status } = req.body;
    
    res.json({
        success: true,
        message: `Lecture status updated to: ${status}`,
        data: {
            teacher: 'Sonia Borse',
            subject: 'MCA-1',
            status: status,
            lastUpdated: new Date().toISOString()
        }
    });
});
// Add these routes to your existing server.js

// Login route
a// In your server.js - Update the login route
app.post('/api/login', (req, res) => {
    const { username, password, role } = req.body;
    
    console.log('🔐 Login attempt:', username);
    
    // Multiple teachers
    const users = {
        'teacher1': { password: 'teacher123', teacher: 'sonia', name: 'Mrs. Sonia Borse' },
        'teacher2': { password: 'teacher123', teacher: 'shubhangi', name: 'Mrs. Shubhangi Phale' },
        'teacher3': { password: 'teacher123', teacher: 'sujata', name: 'Mrs. Sujata Kangune' },
        'teacher4': { password: 'teacher123', teacher: 'Rasika', name: 'Mrs. Rasika Ghavate' },
        'teacher5': { password: 'teacher123', teacher: 'sonia', name: 'Mrs. Sonia Borse' },
        'teacher6': { password: 'teacher123', teacher: 'Rasika', name: 'Mrs. Rasika Ghavate' },
        'admin1': { password: 'admin123', role: 'admin', name: 'Administrator' }
    };
    
    const user = users[username];
    
    if (user && user.password === password) {
        res.json({
            success: true,
            message: 'Login successful!',
            user: {
                username: username,
                role: user.role || 'teacher',
                name: user.name,
                teacherId: user.teacher
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid username or password'
        });
    }
});
// Update lecture status
app.put('/api/lecture/status', (req, res) => {
    const { status } = req.body;
    
    console.log('Status update:', status);
    
    res.json({
        success: true,
        message: `Lecture status updated to: ${status}`,
        data: {
            teacher: 'Sonia Borse',
            subject: 'MCA-1 - Python',
            status: status,
            lastUpdated: new Date().toISOString()
        }
    });
});
// ==================== START SERVER ====================
app.listen(PORT, () => {
    console.log('=========================================');
    console.log('🚀 SMART CLASSROOM BACKEND SERVER');
    console.log('=========================================');
    console.log('✅ Server started successfully!');
    console.log(`📍 Running on: http://localhost:${PORT}`);
    console.log('⏰ Started at:', new Date().toLocaleString());
    console.log('=========================================');
    console.log('');
    console.log('📡 AVAILABLE ROUTES:');
    console.log(`   GET  http://localhost:${PORT}/`);
    console.log(`   GET  http://localhost:${PORT}/health`);
    console.log(`   GET  http://localhost:${PORT}/api/classroom`);
    console.log(`   POST http://localhost:${PORT}/api/auth/login`);
    console.log(`   PUT  http://localhost:${PORT}/api/lectures/status`);
    console.log('');
    console.log('💡 TIP: Open these URLs in your browser to test!');
    console.log('=========================================');
});

// ==================== ERROR HANDLING ====================
process.on('uncaughtException', (error) => {
    console.log('❌ Error:', error.message);
    process.exit(1);
});