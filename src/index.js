const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputImagePath = "src/logo.png";
const outputBaseDirectory = "output/icons";
const borderRadius = 6;

const sizes = [
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

const generateIcons = async (config) => {
  const dpiDirectory = path.join(outputBaseDirectory, config.name);
  console.log({ dpiDirectory });
  if (!fs.existsSync(dpiDirectory)) {
    fs.mkdirSync(dpiDirectory, { recursive: true });
  }

  // Quadrada
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
          .resize(parseInt(config.square * 0.6))
          .toBuffer(),
        gravity: "center",
      },
    ])
    .withMetadata({ density: 96 })
    .toFile(path.join(dpiDirectory, "ic_launcher_foreground.png"));

  // Redonda
  await sharp(inputImagePath)
    .resize(config.round, config.round)
    .composite([
      {
        input: Buffer.from(
          `<svg width="${config.round}" height="${config.round}">
                  <circle cx="${config.round / 2}" cy="${
            config.round / 2
          }" r="${config.round / 2}" fill="#fff"/>
              </svg>`
        ),
        blend: "dest-in",
      },
    ])
    .withMetadata({ density: 96 })
    .toFile(path.join(dpiDirectory, "ic_launcher_round.png"));

  // Quadrada com BorderRadius
  await sharp(inputImagePath)
    .resize(config.bordered, config.bordered)
    .composite([
      {
        input: Buffer.from(
          `<svg width="${config.bordered}" height="${config.bordered}">
                  <rect x="0" y="0" width="${config.bordered}" height="${config.bordered}" rx="${borderRadius}" ry="${borderRadius}" fill="#fff"/>
              </svg>`
        ),
        blend: "dest-in",
      },
    ])
    .withMetadata({ density: 96 })
    .toFile(path.join(dpiDirectory, "ic_launcher.png"));

  console.log(`Icons for ${config.name} generated in ${dpiDirectory}!`);
};

sizes.forEach((config) => {
  generateIcons(config);
});
