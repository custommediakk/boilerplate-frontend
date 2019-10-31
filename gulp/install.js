"use strict";

const git = require("gulp-git");
const readlineSync = require('readline-sync');
const gulp = require("gulp");
const chalk = require("chalk");
const fs = require('fs-extra');

const init = done => {
	console.log(chalk.inverse("[********]") + " * Initializing repository");
	git.init({args: "--quiet"}, function (err) {
    done();
  });
};

const add = () => {
	console.log(chalk.inverse("[********]") + " * Adding files");
	return gulp.src(["./*", ".gitignore", "!node_modules"])
	.pipe(git.add());
};

const commit = () => {
	console.log(chalk.inverse("[********]") + " * Creating initial commit");
	const date = new Date();
	return gulp.src(["./*", ".gitignore", "!node_modules"])
	.pipe(git.commit('Initial Commit: ' + date, {
		disableAppendPaths: true,
		args: "--quiet"
	}));
};

const setup = done => {
	console.log(chalk.inverse("[********]") + " * Generating Branches");
	git.branch("html/stable");
	git.branch("wp/dev");
	git.checkout('html/dev', {args:'-b'});

	let remote = readlineSync.question(chalk.inverse("[********]") + " > Enter GitHub repository address: ");
	git.addRemote("origin", remote);

	done();
}

if (fs.existsSync('.git')) {
	exports.default = done => { done(); };
} else {
	exports.default = gulp.series(init, add, commit, setup);
}
