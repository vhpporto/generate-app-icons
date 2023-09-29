const fs = require("fs");
const path = require("path");
const generateIcons = require("./index"); // Se o seu arquivo original chama-se index.js
const testLogoPath = path.join(__dirname, "logo.png");

describe("generateIcons", () => {
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

  it("should generate icons correctly", async () => {
    await generateIcons(configMock, testLogoPath);

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
