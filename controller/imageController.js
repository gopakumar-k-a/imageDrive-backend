import asyncHandler from "express-async-handler";
import { User } from "../model/userModel.js";
import { authService } from "../services/authService.js";
import ErrorResponse from "../utils/errorResponse.js";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { envConfig } from "../config/envConfig.js";
import { Image } from "../model/imageModel.js";
const imageController = () => {
  const s3 = new S3Client({
    credentials: {
      accessKeyId: envConfig.AWS_S3_ACCESS_KEY,
      secretAccessKey: envConfig.AWS_S3_SECRET_KEY,
    },
    region: envConfig.BUCKET_REGION,
  });
  const uploadImages = asyncHandler(async (req, res) => {

    const { userId } = req.user;
    console.log("req.body ", req.body);

    const images = req.files;
    const { titles } = req.body;
    console.log("images ", images);
    if (!images || images.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const randomImageName = (originalName) => {
      return `${originalName}-${Date.now()}`;
    };

    let userImageDoc = await Image.findOneAndUpdate(
      { userId },
      { $setOnInsert: { userId } },
      { new: true, upsert: true }
    );

    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const randomName = randomImageName(file.originalname);
      const imageTitle = titles[i];
      const params = {
        Bucket: envConfig.BUCKET_NAME,
        Key: randomName,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const command = new PutObjectCommand(params);
      userImageDoc.images.push({ imageName: randomName, title: imageTitle });
      await s3.send(command);
    }
    await userImageDoc.save();

    return res.status(200).json({
      message: "Files uploaded successfully",
    });
  });

  const getUploads = asyncHandler(async (req, res) => {
    const { userId } = req.user;

    const uploads = await Image.findOne({ userId });
    if (!uploads) {
      throw new ErrorResponse("no image uploads", 409);
    }
    console.log("uploads ", uploads);

    const imageUrls = await Promise.all(
      uploads.images.map(async (file) => {
        const getObjectParams = {
          Bucket: envConfig.BUCKET_NAME,
          Key: file.imageName,
        };

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command);

        return {
          ...file.toObject(),
          imageUrl: url,
        };
      })
    );

    console.log("image urls ", imageUrls);

    res.status(200).json({ message: "image upload retrieved successfully" });
  });

  return {
    uploadImages,
    getUploads,
  };
};

export default imageController;
