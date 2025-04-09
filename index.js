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

// Add middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// All of the required rendering code
app.get('/', (req, res) => {
    res.render("index.ejs", {
        posts: posts,
    });
}).get('/post', (req, res) => {
    res.status(200).render("post.ejs");
}).post('/post', (req, res) => {
    let { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).send('Title and content are required!');
    };
    posts.push(new Post(title, content, getDateAndTime()));
    info(`New post added: ${title}`);
    res.status(201).redirect("/");
});

// Handle unspecified routes and redirect to 404.ejs
app.use((req, res) => {
    const isCriticalRoute = ["/", "/post"].includes(req.originalUrl);
    res.status(404).send("ERROR_404_PAGE_NOT_FOUND");
    err(`404: ${req.originalUrl}`, isCriticalRoute ? "high" : "low");
    warn("ERR404 catcher activated", "low");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});