const chalk = require("chalk");
const yargs = require("yargs/yargs");
const path = require("path");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const { ensureDirectoryExists } = require("../utils");
const { OUTPUT_BASE_DIRECTORY, BORDER_RADIUS } = require("../config");
const sharp = require("sharp");

const createSquareIcon = async (inputImagePath, outputPath, config) => {
  await sharp({
    create: {
      width: config.square,
      height: config.square,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: await sharp(inputImagePath)
          .resize(parseInt(config.square * 0.7))
          .toBuffer(),
        gravity: "center",
      },
    ])
    .withMetadata({ density: 96 })
    .toFile(outputPath);
};

const createRoundIcon = async (inputImagePath, outputPath, config) => {
  await sharp(inputImagePath)
    .resize(config.round, config.round)
    .composite([
      {
        input: Buffer.from(
          `<svg width="${config.round}" height="${config.round}">
               <circle cx="${config.round / 2}" cy="${config.round / 2}" r="${
            config.round / 2
          }" fill="#fff"/>
             </svg>`
        ),
        blend: "dest-in",
      },
    ])
    .withMetadata({ density: 96 })
    .toFile(outputPath);
};

const createBorderedIcon = async (inputImagePath, outputPath, config) => {
  await sharp(inputImagePath)
    .resize(config.bordered, config.bordered)
    .composite([
      {
        input: Buffer.from(
          `<svg width="${config.bordered}" height="${config.bordered}">
               <rect x="0" y="0" width="${config.bordered}" height="${config.bordered}" rx="${BORDER_RADIUS}" ry="${BORDER_RADIUS}" fill="#fff"/>
             </svg>`
        ),
        blend: "dest-in",
      },
    ])
    .withMetadata({ density: 96 })
    .toFile(outputPath);
};

const generateAndroidIcons = async (config, inputImagePath) => {
  const dpiDirectory = path.join(OUTPUT_BASE_DIRECTORY, config.name);
  try {
    ensureDirectoryExists(dpiDirectory);

    const tasks = [
      createSquareIcon(
        inputImagePath,
        path.join(dpiDirectory, "ic_launcher_foreground.png"),
        config
      ),
      createRoundIcon(
        inputImagePath,
        path.join(dpiDirectory, "ic_launcher_round.png"),
        config
      ),
      createBorderedIcon(
        inputImagePath,
        path.join(dpiDirectory, "ic_launcher.png"),
        config
      ),
    ];

    await Promise.all(tasks);
    console.info(
      chalk.green(`✓ Icons for ${config.name} generated in ${dpiDirectory}!`)
    );
  } catch (err) {
    console.error(
      chalk.red(`Error generating icons for ${config.name}: ${err.message}`)
    );
  }
};

module.exports = { generateAndroidIcons };
