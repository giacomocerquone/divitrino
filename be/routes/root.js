"use strict";

const recognize = require("../ocr/recognize");
const manipulate = require("../ocr/manipulate");

module.exports = async function (fastify) {
  fastify.post("/recognize", async function (request, reply) {
    try {
      const image = await request.file();
      const imageBuffer = await image.toBuffer();

      const {
        data: { text, hocr, tsv, box, unlv },
      } = await recognize(imageBuffer);

      const manipulatedText = manipulate(text);
      console.log(text, manipulatedText);

      reply.send(manipulatedText);
    } catch (e) {
      console.log(e);
      reply.send(fastify.httpErrors.internalServerError());
    }
  });
};
