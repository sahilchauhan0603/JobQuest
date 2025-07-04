import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});

/*
Explanation:
- Loads environment variables using dotenv for configuration.
- Configures Cloudinary with credentials from environment variables for image/file uploads.

What is Cloudinary?
- Cloudinary is a cloud-based service for managing images and other media files.
- It provides APIs to upload, store, transform, and deliver images and videos efficiently.
- In this project, Cloudinary is used to upload and store user resumes and other files, offloading file storage from your server and making file management scalable and reliable.
*/
