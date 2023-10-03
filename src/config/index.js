const path = require("path");

const OUTPUT_BASE_DIRECTORY = "output/icons";
const BORDER_RADIUS = 6;

const sourceJsonPath = path.join(__dirname, "Contents.json");
const destinationJsonPath = path.join(
  __dirname,
  `../../${OUTPUT_BASE_DIRECTORY}/ios/`,
  "Contents.json"
);

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

module.exports = {
  OUTPUT_BASE_DIRECTORY,
  BORDER_RADIUS,
  sourceJsonPath,
  destinationJsonPath,
  iosSizes,
  SIZES,
};
