// https://www.webstoemp.com/blog/blazing-fast-image-transforms-with-sharp-gulp/
const gulp = require("gulp");

// import tasks
const img = require("./gulp_tasks/images.js");

// Build
const build = img.resize;

// Runs
exports.build = build;