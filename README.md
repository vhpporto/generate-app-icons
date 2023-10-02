# Generate App Icons 📱

Uma ferramenta simples e eficaz para gerar ícones para aplicativos iOS e Android em diferentes resoluções e estilos.

## 🌟 Recursos

- 🖼️ Gera ícones em diferentes resoluções para Android: `mdpi`, `hdpi`, `xhdpi`, `xxhdpi`, `xxxhdpi`.
- 🖼️ Gera ícones em diversas resoluções para iOS: conforme especificado em `Contents.json`.
- 🎨 Android: Produz três estilos distintos de ícone:
  - 🟥 Quadrado (`ic_launcher_foreground.png`)
  - ⭕ Redondo (`ic_launcher_round.png`)
  - 🟩 Quadrado com bordas arredondadas (`ic_launcher.png`)

## 🔧 Como usar

1️⃣ Clone este repositório.

2️⃣ Instale as dependências com

```sh
yarn add generate-app-icons
```

ou

```sh
npm install generate-app-icons
```

3️⃣ Coloque a imagem da logo (recomendado 1024x1024) na pasta raiz e atualize a variável `inputImagePath` no script com o caminho correto.

4️⃣ Execute o comando

```sh
npx generate-app-icons <path_to_logo.png> [--platform=ios|android]
```

5️⃣ Verifique a pasta `output/icons` para os ícones gerados.

> Nota: Substitua `<path_to_logo.png>` pelo caminho de sua imagem. Utilize a opção `--platform` para especificar a plataforma desejada (ios ou android). Se nenhuma plataforma for especificada, ambos os ícones para iOS e Android serão gerados.

## ✏️ Personalização

- Ajuste a proporção do ícone na imagem de "foreground" modificando o valor `0.6` em `.resize(Math.round(config.square * 0.6))` para Android.
- Altere o raio da borda para ícones com bordas arredondadas modificando a constante `borderRadius` para Android.

## 📜 Licença

MIT
