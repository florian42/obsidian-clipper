# <img src="public/icons/icon_48.png" width="45" align="left"> Obsidian Clipper

> The "Obsidian Clipper" Chrome extension allows you to easily save articles from the web as notes in your Obsidian vault. 

## Description

The extension utilizes Readability.js to extract the content of the article, as well as important metadata such as the domain, title, timestamp, excerpt, and word count. This allows you to easily organize and access your saved articles within your Obsidian vault. The extension is simple and easy to use, with a one-click saving feature that quickly adds the article to the your vault. 
This is a great tool for researchers, students, and anyone who wants to save and organize articles for later reading and reference.

## Screenshots
![gif showing the whole workflow from a website to saved article](./images/Demo.gif)
![screenshot displaying various options for configuration](./images/Options.png)
![screenshot of the saved article in Obsidian](./images/Result.png)

## Install

[**Chrome** extension]() <!-- TODO: Add chrome extension link inside parenthesis -->

## Contribution

Suggestions and pull requests are welcomed!.

### Available Scripts
- bun run build
    - Bundles the app into static files for Chrome store.
- bun run format
    - Formats all the files.
- bun test
    - Runs unit tests

### Workflow
1. cd obsidian-clipper
2. Run bun run build
3. Open chrome://extensions
4. Check the Developer mode checkbox
5. Click on the Load unpacked extension button
6. Select the folder obsidian-clipper/build

---

This project was bootstrapped with [Chrome Extension CLI](https://github.com/dutiyesh/chrome-extension-cli)

### Attribution

This is adopted and adjusted by https://gist.github.com/kepano/90c05f162c37cf730abb8ff027987ca3 and packaged as a Chrome extensions for convenience.

<a target="_blank" href="https://icons8.com/icon/0eNM6EFToRF2/obsidian">Obsidian</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>