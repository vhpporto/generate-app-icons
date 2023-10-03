const path = require("path");
const sharp = require("sharp");
const chalk = require("chalk");
const { OUTPUT_BASE_DIRECTORY } = require("../config");
const { ensureDirectoryExists } = require("../utils");

const generateIosIcons = async (config, inputImagePath) => {
  const dpiDirectory = path.join(OUTPUT_BASE_DIRECTORY, "ios");
  ensureDirectoryExists(dpiDirectory);
  try {
    const outputPath = path.join(dpiDirectory, config.name);
    await sharp(inputImagePath)
      .resize(config.size, config.size)
      .withMetadata({ density: 96 })
      .toFile(outputPath);
    console.info(
      chalk.green(`✓ iOS icon ${config.name} generated in ${dpiDirectory}!`)
    );
  } catch (err) {
    console.error(
      chalk.red(`Error generating iOS icon ${config.name}: ${err.message}`)
    );
  }
};

module.exports = { generateIosIcons };
