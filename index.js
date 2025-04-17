// Import necessary files
import { app, port, express, log, err, warn, info, important, green, fs, loadPosts, savePosts, Post, posts } from './appConfig.js';

// Middleware to parse JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

// All of the required rendering code
app.get('/', (req, res) => {
    res.render("index.ejs", {
        posts: posts,
    });
}).get('/post', (req, res) => {
    res.status(200).render("post.ejs");
}).post('/post', (req, res) => {
    console.log(req.body); // Debugging line
    let { title, content, author } = req.body;
    if (!title || !content || !author) {
        return res.status(400).send('Title and content are required!');
    }
    const newPost = new Post(title, content, author);
    posts.push(newPost);
    savePosts(posts);
    info(`New post added: ${title}`);
    res.status(201).redirect("/");
}).use((req, res) => {
    const isCriticalRoute = ["/", "/post"].includes(req.originalUrl);
    res.status(404).send("ERROR_404_PAGE_NOT_FOUND");
    err(`404: ${req.originalUrl}`, isCriticalRoute ? "high" : "low");
    warn("ERR404 catcher activated", "low");
}).listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
