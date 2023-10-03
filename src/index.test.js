const fs = require("fs");
const path = require("path");
const { generateAndroidIcons } = require("./generators/androidIcons");
const { generateIosIcons } = require("./generators/iosIcons");
const { ensureDirectoryExists } = require("./utils");
const testLogoPath = path.join(__dirname, "logo.png");

describe("generate app icons", () => {
  // Nome atualizado
  const configMock = {
    name: "mipmap-testdpi",
    square: 50,
    round: 40,
    bordered: 40,
  };

  const dpiDirectory = path.join("output/icons", configMock.name);

  // Limpa arquivos e diretórios de teste antes e depois dos testes
  beforeAll(() => {
    if (fs.existsSync(dpiDirectory)) {
      fs.rmdirSync(dpiDirectory, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(dpiDirectory)) {
      fs.rmdirSync(dpiDirectory, { recursive: true });
    }
  });

  it("should generate android icons correctly", async () => {
    // Nome atualizado
    await generateAndroidIcons(configMock, testLogoPath);

    // Verifica se os arquivos foram criados
    const squareIconExists = fs.existsSync(
      path.join(dpiDirectory, "ic_launcher_foreground.png")
    );
    const roundIconExists = fs.existsSync(
      path.join(dpiDirectory, "ic_launcher_round.png")
    );
    const borderedIconExists = fs.existsSync(
      path.join(dpiDirectory, "ic_launcher.png")
    );

    expect(squareIconExists).toBe(true);
    expect(roundIconExists).toBe(true);
    expect(borderedIconExists).toBe(true);
  });
});

describe("generateIosIcons", () => {
  const configMock = {
    name: "ios-testicon.png",
    size: 50,
  };

  const iosDirectory = path.join("output/icons", "ios");

  beforeAll(() => {
    if (fs.existsSync(iosDirectory)) {
      fs.rmdirSync(iosDirectory, { recursive: true });
    }
  });

  // afterAll(() => {
  //   if (fs.existsSync(iosDirectory)) {
  //     fs.rmdirSync(iosDirectory, { recursive: true });
  //   }
  // });

  it("should generate Contents.json", async () => {
    await generateIosIcons(configMock, testLogoPath);

    const iconExists = fs.existsSync(path.join(iosDirectory));

    console.log({ contentsJson });
    expect(iconExists).toBe(true);
    expect(contentsJson).toBe(true);
  });
});
