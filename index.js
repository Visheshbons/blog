import {  app, port, chalk, cookieParser, express, getDateAndTime, log, err, warn, info, startTimer, endTimer, space, line, important, green } from './appConfig.js';

class Post {
    constructor(title, content, date) {
        this.title = title;
        this.content = content;
        this.date = date;
    };
};

let posts = [
    new Post("The site is up and running!", "Would you believe it? The only problem is you can't post just yet.", getDateAndTime()),
];

// Middleware to parse JSON
app.use(express.json());

// Define a basic route
app.get('/', (req, res) => {
    res.render("index.ejs", {
        posts: posts,
    });
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

// Posts handler
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).send('Title and content are required!');
    }
    // Logic to save the post would go here
    res.status(201).redirect("/");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});