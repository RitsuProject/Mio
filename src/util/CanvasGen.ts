import Canvas from "canvas";
import { join } from "path";
import p from "phin";
import roundImage from "./canvasUtils/roundImage";

export default {
  /**
   * Generate the answer card.
   * @param {String} name - Anime Name
   * @param {String} cover - Cover URL
   * @param {String} type - Theme Type (Ending or Opening)
   */
  async answerCard(name: any, cover: any, type: any) {
    Canvas.registerFont(join(__dirname + "/fonts/Nunito-Bold.ttf"), {
      family: "Nunito",
      weight: "bold",
    });

    const WIDTH = 1080;
    const HEIGHT = 1511;

    const canvas = Canvas.createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    async function getCover(url: string) {
      const res = await p({
        method: "GET",
        url: url,
      });

      const buff = Buffer.from(res.body);
      return buff;
    }

    // Draw cat with lime helmet
    await Canvas.loadImage(join(__dirname + "/assets/answerCard.png")).then(
      async (image) => {
        var wrh = WIDTH / HEIGHT;
        var newWidth = canvas.width;
        var newHeight = newWidth / wrh;
        if (newHeight > canvas.height) {
          newHeight = canvas.height;
          newWidth = newHeight * wrh;
        }
        var xOffset =
          newWidth < canvas.width ? (canvas.width - newWidth) / 2 : 0;
        var yOffset =
          newHeight < canvas.height ? (canvas.height - newHeight) / 2 : 0;

        ctx.drawImage(image, xOffset, yOffset, newWidth, newHeight);

        // NAME
        ctx.font = `40pt "Nunito" bold`;
        ctx.fillStyle = "#ff3860";
        ctx.fillText(name, 30, 125, 810);

        // TYPE
        ctx.font = `40pt "Nunito" bold`;
        ctx.fillStyle = "#ff3860";
        ctx.fillText(type, 530, 1420);

        // COVER
        const COVER_IMAGE = new Canvas.Image();
        COVER_IMAGE.onload = () => {
          ctx.save();
          roundImage.make(
            ctx,
            264,
            365,
            552 - COVER_IMAGE.width + COVER_IMAGE.width,
            782 - COVER_IMAGE.height + COVER_IMAGE.height,
            13
          );
          ctx.clip();
          ctx.drawImage(
            COVER_IMAGE,
            264,
            365,
            552 - COVER_IMAGE.width + COVER_IMAGE.width,
            782 - COVER_IMAGE.height + COVER_IMAGE.height
          );
          ctx.restore();
        };
        COVER_IMAGE.src = await getCover(cover);
      }
    );
    return canvas.toBuffer();
  },
};
