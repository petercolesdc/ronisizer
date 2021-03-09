// https://www.webstoemp.com/blog/blazing-fast-image-transforms-with-sharp-gulp/
const gulp = require("gulp");
const { src, dest, series, parallel } = require('gulp');

// import tasks
const img = require("./gulp_tasks/images.js");

// Build
const clean = img.clean;
const build = img.resize;

// Runs
exports.clean = clean;
exports.build = build;