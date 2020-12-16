import Tesseract from "tesseract.js";
const { createWorker } = Tesseract;

const ocr = async (image) => {
  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  return worker.recognize(image);
};

export default ocr;
