#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const {
  SIZES,
  iosSizes,
  sourceJsonPath,
  destinationJsonPath,
} = require("./config");

const { ensureDirectoryExists } = require("./utils");

const { generateAndroidIcons } = require("./generators/androidIcons");

const { generateIosIcons } = require("./generators/iosIcons");

const argv = yargs(hideBin(process.argv)).argv;

if (require.main === module) {
  const inputImagePathFromCLI = process.argv[2];
  let generationTasks = [];

  if (argv.platform.includes("android")) {
    generationTasks = generationTasks.concat(
      SIZES.map((config) => generateAndroidIcons(config, inputImagePathFromCLI))
    );
  }

  if (argv.platform.includes("ios")) {
    generationTasks = generationTasks.concat(
      iosSizes.map((config) => generateIosIcons(config, inputImagePathFromCLI))
    );
  }

  Promise.all(generationTasks).catch((error) => {
    console.error(chalk.red(`Failed to generate some icons: ${error.message}`));
  });

  ensureDirectoryExists(path.dirname(destinationJsonPath));
  fs.copyFile(sourceJsonPath, destinationJsonPath, (err) => {
    if (err) throw err;
    console.info(chalk.green("✓ Contents.json successfully created"));
  });
}

module.exports = {
  generateIosIcons,
};
