import multer from "multer";
import setup from "./config";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, setup.UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage: storage });

//01:46:00
