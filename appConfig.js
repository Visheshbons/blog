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

function getDateAndTime() {
    const date_time = new Date();
    const date = date_time.toLocaleDateString("en-GB");
    const time = date_time.toLocaleTimeString("en-US", { hour12: true });
    return `${date} ${time}`;
}

export { app, port, express, getDateAndTime, log, err, warn, info, important, green };