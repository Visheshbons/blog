const PORT = 3000;

import chalk from 'chalk';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Define a basic route
app.get('/', (req, res) => {
    res.render("/index.ejs");
});

// Handle unspecified routes and redirect to 404.ejs
app.use((req, res) => {
    const isCriticalRoute = ["/", "/book", "/contact"].includes(req.originalUrl);
    res.status(404).render("404.ejs", {
        url: req.originalUrl,
    });
    err(`404: ${req.originalUrl}`, isCriticalRoute ? "high" : "low");
    warn("ERR404 catcher activated", "low");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});