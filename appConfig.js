// Imports all the neccecary data
import express from 'express';
import chalk from 'chalk';
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

// Optimized utility functions and variable declarations
const app = express();
const port = process.env.PORT || 3000;

const log = console.log;
const info = (message) => log(`${chalk.blue("Info:")} ${chalk.white(message)}`);
const important = (message) => log(`${chalk.bgBlue.whiteBright("IMPORTANT:")} ${chalk.blue(message)}`);

const green = (message) => log(`${chalk.green(message)}`);

const err = (message, urgency = "low") => {
    const prefix = urgency === "high" ? "FATAL:" : "Error:";
    log(`${chalk.bgRed.yellowBright(prefix)} ${chalk.red(message)}`);
};

const warn = (message, urgency = "low") => {
    const prefix = urgency === "high" ? "WARN:" : "Warn:";
    log(`${chalk.bgYellow(prefix)} ${chalk.yellow(message)}`);
};

function getDateAndTime() {
    const date_time = new Date();
    const date = date_time.toLocaleDateString("en-GB");
    const time = date_time.toLocaleTimeString("en-US", { hour12: true });
    return `${date} ${time}`;
}

export { app, port, express, getDateAndTime, log, err, warn, info, important, green, fs, loadPosts, savePosts, Post, posts };