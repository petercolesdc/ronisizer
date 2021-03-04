const fs = require("fs");
const glob = require("glob");
const path = require("path");
const sharp = require("sharp");

// specify transforms
const transforms = [
	
	// Squares
	{
		src: "../Tests/11ty/assets/img/sq/*",
		dist: "../Tests/11ty/assets/img/_resized/sq/25",
		options: {
			width: 225,
			height: 225,
			fit: "cover",
			progressive: true
		}
	},
	{
		src: "../Tests/11ty/assets/img/sq/*",
		dist: "../Tests/11ty/assets/img/_resized/sq/50",
		options: {
			width: 450,
			height: 450,
			fit: "cover",
			progressive: true
		}
	},
	{
		src: "../Tests/11ty/assets/img/sq/*",
		dist: "../Tests/11ty/assets/img/_resized/sq/75",
		options: {
			width: 675,
			height: 675,
			fit: "cover",
			progressive: true
		}
	},
	{
		src: "../Tests/11ty/assets/img/sq/*",
		dist: "../Tests/11ty/assets/img/_resized/sq/100",
		options: {
			width: 900,
			height: 900,
			fit: "cover",
			progressive: true
		}
	},
	
	// Backgrounds
	{
		src: "../Tests/11ty/assets/img/bg/*",
		dist: "../Tests/11ty/assets/img/_resized/bg/25",
		options: {
			width: 600,
			height: null,
			fit: "cover",
			progressive: true
		}
	},
	{
		src: "../Tests/11ty/assets/img/bg/*",
		dist: "../Tests/11ty/assets/img/_resized/bg/50",
		options: {
			width: 1200,
			height: null,
			fit: "cover",
			progressive: true
		}
	},
	{
		src: "../Tests/11ty/assets/img/bg/*",
		dist: "../Tests/11ty/assets/img/_resized/bg/75",
		options: {
			width: 1800,
			height: null,
			fit: "cover",
			progressive: true
		}
	},
	{
		src: "../Tests/11ty/assets/img/bg/*",
		dist: "../Tests/11ty/assets/img/_resized/bg/100",
		options: {
			width: 2400,
			height: null,
			fit: "cover",
			progressive: true
		}
	},
	
	// Textures
	{
		src: "../Tests/11ty/assets/tex/*",
		dist: "../Tests/11ty/assets/tex/_resized/25",
		options: {
			width: 300,
			height: null,
			fit: "cover",
			progressive: true
		}
	},
	{
		src: "../Tests/11ty/assets/tex/*",
		dist: "../Tests/11ty/assets/tex/_resized/50",
		options: {
			width: 600,
			height: null,
			fit: "cover",
			progressive: true
		}
	},
	{
		src: "../Tests/11ty/assets/tex/*",
		dist: "../Tests/11ty/assets/tex/_resized/75",
		options: {
			width: 900,
			height: null,
			fit: "cover",
			progressive: true
		}
	},
	{
		src: "../Tests/11ty/assets/tex/*",
		dist: "../Tests/11ty/assets/tex/_resized/100",
		options: {
			width: 1200,
			height: null,
			fit: "cover",
			progressive: true
		}
	},
	
	// Logos (Landscape)
	{
		src: "../Tests/11ty/assets/img/lg/*",
		dist: "../Tests/11ty/assets/img/_resized/lg/50",
		options: {
			width: 268,
			height: null,
			fit: "cover",
			toFormat: 'png'
		}
	},
	{
		src: "../Tests/11ty/assets/img/lg/*",
		dist: "../Tests/11ty/assets/img/_resized/lg/100",
		options: {
			width: 535,
			height: null,
			fit: "cover",
			toFormat: 'png'
		}
	}
	
];


// resize images
function resizeImages(done) {
	
	// loop through configuration array of objects
	transforms.forEach(function (transform) {
		
		// if dist folder does not exist, create it with all parent folders
		if (!fs.existsSync(transform.dist)) {
			fs.mkdirSync(transform.dist, { recursive: true }, (err) => {
				if (err) throw err;
			});
		}

		// glob all files
		let files = glob.sync(transform.src);

		// for each file, apply transforms and save to file
		files.forEach(function (file) {
			let filename = path.basename(file);
			sharp(file)
				.resize(transform.options)
				.toFile(`${transform.dist}/${filename}`)
				.catch((err) => {
					console.log(err);
				});
		});
	});
	done();
}

// exports (Common JS)
module.exports = {
	resize: resizeImages
};