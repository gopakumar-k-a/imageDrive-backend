import { Router } from "express";
import { upload } from "../utils/multer.js";
import imageController from "../controller/imageController.js";
const router = Router();

const imageRoutes = () => {
  router.post(
    "/upload-images",
    upload.array("images", 10),
    imageController().uploadImages
    
  )
  router.get("/upload-images", imageController().getUploads);

  return router;
};

export default imageRoutes;
