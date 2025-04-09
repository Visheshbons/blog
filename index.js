import { app, port, express, getDateAndTime, log, err, warn, info, important, green } from './appConfig.js';
import fs from 'fs';

const postsFilePath = './posts.json';

// Function to load posts from the file
function loadPosts() {
    if (fs.existsSync(postsFilePath)) {
        const data = fs.readFileSync(postsFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return [];
}

// Function to save posts to the file
function savePosts(posts) {
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');
}

class Post {
    constructor(title, content, date) {
        this.title = title;
        this.content = content;
        this.date = date;
    };
};

let posts = loadPosts();

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
    console.log(req.body); // Debugging line
    let { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).send('Title and content are required!');
    }
    const newPost = new Post(title, content, getDateAndTime());
    posts.push(newPost);
    savePosts(posts);
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