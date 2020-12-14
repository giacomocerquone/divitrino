const { createWorker } = require("tesseract.js");

async function recognize(img) {
  const worker = createWorker({
    gzip: false,
    logger: (m) => null,
  });

  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const data = await worker.recognize(img);
  await worker.terminate();

  return data;
}

function manipulate(text) {
  const products = text
    .split("\n")
    .filter((r) => r) // needed for empty rows
    .map((row) => {
      const splittedRow = row.split(" ");
      return {
        price: splittedRow.slice(-1)[0],
        descr: splittedRow.slice(0, splittedRow.length - 1).join(" "),
      };
    });

  return products;
}

exports.handler = async (event, context, callback) => {
  try {
    const data = JSON.parse(event.body);
    console.log("Function `scan-receipt` invoked", data);

    const image = data.base64;
    const imageBuffer = await image.toBuffer();

    const {
      data: { text, hocr, tsv, box, unlv },
    } = await recognize(imageBuffer);

    const manipulatedText = manipulate(text);
    console.log(text, manipulatedText);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(manipulatedText),
    });
  } catch (e) {
    console.log(e);
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify(e),
    });
  }
};
