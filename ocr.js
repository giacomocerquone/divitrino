"use strict";

const recognize = require("./ocr/recognize");
const path = require("path");

async function runOcr() {
  const {
    data: { text, hocr, tsv, box, unlv },
  } = await recognize(path.join(__dirname, "testImg.jpg"));

  console.log(text, hocr, tsv, box, unlv);
}

runOcr();