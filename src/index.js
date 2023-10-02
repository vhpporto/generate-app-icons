#!/usr/bin/env node

const sharp = require("sharp");
const fs = require("fs");
const chalk = require("chalk");
const yargs = require("yargs/yargs");
const path = require("path");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const iosSizes = [
  { name: "ipad-20x20-1x.png", size: 20 },
  { name: "ipad-20x20-2x.png", size: 40 },
  { name: "ipad-29x29-1x.png", size: 29 },
  { name: "ipad-29x29-2x.png", size: 58 },
  { name: "ipad-40x40-1x.png", size: 40 },
  { name: "ipad-40x40-2x.png", size: 80 },
  { name: "ipad-50x50-1x.png", size: 50 },
  { name: "ipad-50x50-2x.png", size: 100 },
  { name: "ipad-72x72-1x.png", size: 72 },
  { name: "ipad-72x72-2x.png", size: 144 },
  { name: "ipad-76x76-1x.png", size: 76 },
  { name: "ipad-76x76-2x.png", size: 152 },
  { name: "ipad-83.5x83.5-2x.png", size: 167 },
  { name: "iphone-20x20-2x.png", size: 40 },
  { name: "iphone-20x20-3x.png", size: 60 },
  { name: "iphone-29x29-1x.png", size: 29 },
  { name: "iphone-29x29-2x.png", size: 58 },
  { name: "iphone-29x29-3x.png", size: 87 },
  { name: "iphone-40x40-2x.png", size: 80 },
  { name: "iphone-40x40-3x.png", size: 120 },
  { name: "iphone-57x57-1x.png", size: 57 },
  { name: "iphone-57x57-2x.png", size: 114 },
  { name: "iphone-60x60-2x.png", size: 120 },
  { name: "iphone-60x60-3x.png", size: 180 },
  { name: "ios-marketing-1024x1024-1x.png", size: 1024 },
];

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

const sourceJsonPath = path.join(__dirname, "Contents.json");
const destinationJsonPath = path.join(
  __dirname,
  `../${OUTPUT_BASE_DIRECTORY}/ios/`,
  "Contents.json"
);

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

const generateIosIcons = async (config, inputImagePath) => {
  const dpiDirectory = path.join(OUTPUT_BASE_DIRECTORY, "ios");
  ensureDirectoryExists(dpiDirectory);
  try {
    const outputPath = path.join(dpiDirectory, config.name);
    await sharp(inputImagePath)
      .resize(config.size, config.size)
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

  fs.copyFile(sourceJsonPath, destinationJsonPath, (err) => {
    if (err) throw err;
    console.info(chalk.green("✓ Contents.json successfully created"));
  });
}

module.exports = {
  generateAndroidIcons,
  generateIosIcons,
};
