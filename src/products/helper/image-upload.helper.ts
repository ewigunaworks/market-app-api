import { diskStorage } from "multer";
import path = require('path');
import { v4 as uuidv4 } from 'uuid';

export const saveImageToStorage = {
  storage: diskStorage({
    destination: './assets/images',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const fileExtension: string = path.parse(file.originalname).ext
      cb(null, `${filename}${fileExtension}`)
    }
  }),
}