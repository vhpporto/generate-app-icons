#!/usr/bin/env node

const sharp = require("sharp");
const fs = require("fs");
const chalk = require("chalk");

const path = require("path");

const SIZES = [
  {
    name: "mipmap-mdpi",
    square: 108,
    round: 48,
    bordered: 48,
  },
  {
    name: "mipmap-hdpi",
    square: 162,
    round: 72,
    bordered: 72,
  },
  {
    name: "mipmap-xhdpi",
    square: 216,
    round: 96,
    bordered: 96,
  },
  {
    name: "mipmap-xxhdpi",
    square: 324,
    round: 144,
    bordered: 144,
  },
  {
    name: "mipmap-xxxhdpi",
    square: 432,
    round: 192,
    bordered: 192,
  },
];

const OUTPUT_BASE_DIRECTORY = "output/icons";
const BORDER_RADIUS = 6;

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

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

const generateIcons = async (config, inputImagePath) => {
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
      chalk.green(`Icons for ${config.name} generated in ${dpiDirectory}!`)
    );
  } catch (err) {
    console.error(
      chalk.red(`Error generating icons for ${config.name}: ${err.message}`)
    );
  }
};

if (require.main === module) {
  const inputImagePathFromCLI = process.argv[2];
  const generationTasks = SIZES.map((config) =>
    generateIcons(config, inputImagePathFromCLI)
  );
  Promise.all(generationTasks);
}

module.exports = generateIcons;
