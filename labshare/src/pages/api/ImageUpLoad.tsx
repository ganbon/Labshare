import formidable from "formidable";
import { createWriteStream } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function ImageUpLoad(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = await formidable({ multiples: true, uploadDir: __dirname });
    const filename = new Date().getTime() + ".png"
    const path = "./public/image/" + filename;
    form.onPart = (part) => {
      // let formidable handle only non-file parts
      if (part.originalFilename === "" || !part.mimetype) {
        // used internally, please do not override!
        form._handlePart(part);
      } else if (part.originalFilename) {
        console.log(part.name);
        // /public/imagesディレクトリがないと正常に動かないので作成すること
        const stream = createWriteStream(path);
        part.pipe(stream);
        part.on("end", () => {
          console.log(part.originalFilename + " is uploaded");
          stream.close();
        });
      }
    };
    res.status(200).json({ fileName: filename});
    form.parse(req);
  } else {
    console.log("NG");
    res.status(405).json({ fileName: "NG" });
  }
}
