"use strict";

const { createWorker } = require("tesseract.js");
const path = require("path");

module.exports = async function recognize(img) {
  const worker = createWorker({
    langPath: path.join(__dirname, ".."),
    gzip: false,
    logger: (m) => null,
  });

  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const data = await worker.recognize(img);
  await worker.terminate();

  return data;
};
