// Imports all the neccecary data
import express from 'express';
import chalk from 'chalk';

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

const startTimer = console.time;
const endTimer = console.timeEnd;

const space = (num) => log("\n".repeat(num));
const line = (num) => log(chalk.dim("-".repeat(55)).repeat(num));

function getDateAndTime() {
    const date_time = new Date();
    const date = date_time.toLocaleDateString("en-GB");
    const time = date_time.toLocaleTimeString("en-US", { hour12: true });
    return `${date} ${time}`;
}

export { app, port, portForward, chalk, cookieParser, express, getDateAndTime, log, err, warn, info, startTimer, endTimer, space, line, important, green, images, users };