import multer from "multer";
import path from "path";

export class Multer {
  static getUploader() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "public/uploads/");
      },
      filename: (req, file, cb) => {
        cb(
          null,
          file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
      },
    });

    return multer({ storage });
  }

  static uploadSingle(fieldName: string) {
    return Multer.getUploader().single(fieldName);
  }
}
