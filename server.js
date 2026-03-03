/**
 * Illinois State Roleplay - Simple Server
 * Like Flask but using Node.js + Express
 * 
 * To run: node server.js
 */

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve CSS files
app.use('/css', express.static(path.join(__dirname, 'css')));

// Serve images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Main route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// About route
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Departments route
app.get('/departments', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rules route
app.get('/rules', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Join route
app.get('/join', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint - Get community stats (you can customize this)
app.get('/api/stats', (req, res) => {
    res.json({
        members: '500+',
        departments: 6,
        online: '24/7 Support',
        discord: 'https://discord.gg/EWXT6P9cfw'
    });
});

// API endpoint - Get department info
app.get('/api/departments', (req, res) => {
    res.json([
        { id: 'state-police', name: 'Illinois State Police', icon: 'fa-badge' },
        { id: 'sheriff', name: 'County Sheriff', icon: 'fa-user-shield' },
        { id: 'fire', name: 'Fire Department', icon: 'fa-fire-flame-curved' },
        { id: 'ems', name: 'Emergency Medical Services', icon: 'fa-ambulance' },
        { id: 'dispatch', name: 'Dispatch Center', icon: 'fa-headset' },
        { id: 'civilian', name: 'Civilian', icon: 'fa-building' }
    ]);
});

// Handle 404 - redirect to home
app.use((req, res) => {
    res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🌟 Illinois State Roleplay Server                       ║
║                                                           ║
║   Server running at: http://localhost:${PORT}              ║
║                                                           ║
║   Press Ctrl+C to stop                                    ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;

