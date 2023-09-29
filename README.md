# Android Icon Generator 📱

Uma ferramenta simples e eficaz para gerar ícones para aplicativos Android em diferentes resoluções e estilos.

## 🌟 Recursos

- 🖼️ Gera ícones em diferentes resoluções: `mdpi`, `hdpi`, `xhdpi`, `xxhdpi`, `xxxhdpi`.
- 🎨 Produz três estilos distintos de ícone:
  - 🟥 Quadrado (`ic_launcher_foreground.png`)
  - ⭕ Redondo (`ic_launcher_round.png`)
  - 🟩 Quadrado com bordas arredondadas (`ic_launcher.png`)

## 🔧 Como usar

1️⃣ Clone este repositório.

2️⃣ Instale as dependências com `yarn` ou `npm install``.

3️⃣ Coloque a imagem da logo (recomendado 1024x1024) na pasta raiz e atualize a variável `inputImagePath` no script com o caminho correto.

4️⃣ Execute o script com `node index.js`.

5️⃣ Verifique a pasta `output/icons` para os ícones gerados.

## ✏️ Personalização

- Ajuste a proporção do ícone na imagem de "foreground" modificando o valor `0.6` em `.resize(Math.round(config.square * 0.6))`.
- Altere o raio da borda para ícones com bordas arredondadas modificando a constante `borderRadius`.

## 📜 Licença

MIT
