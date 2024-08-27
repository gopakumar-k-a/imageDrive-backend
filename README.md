# Node.js Backend for imageDrive

This is the backend for the `imageDrive` application, built using Node.js. It handles image uploads, manages user authentication, and stores data in MongoDB. The backend integrates with Amazon S3 for file storage and Multer for handling file uploads.

## Features

- **Image Upload**: Handles image uploads and stores them in an Amazon S3 bucket.
- **User Authentication**: Provides registration, login, and password reset functionalities.
- **Data Storage**: Stores image metadata and user information in MongoDB.
- **Image Management**: Allows users to manage their images, including editing and deleting.

## Tech Stack

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for Node.js to handle HTTP requests.
- **Multer**: Middleware for handling file uploads.
- **Amazon S3**: Scalable cloud storage for storing uploaded images.
- **MongoDB**: NoSQL database for storing image metadata and user information.
- **JWT**: JSON Web Tokens for secure authentication.

## Backend Architecture

### Image Upload Process

1. **File Handling**: Uses [Multer](https://www.npmjs.com/package/multer) to handle file uploads.
2. **Storage**: Uploaded images are stored in an [Amazon S3 bucket](https://aws.amazon.com/s3/) for scalable and secure storage.
3. **Database**: Image metadata (such as titles and URLs) is stored in [MongoDB](https://www.mongodb.com/).

### Authentication

- **Registration**: Users can create an account using their email ID and phone number.
- **Login**: Users can log in with their credentials, and JWT tokens are used for session management.
- **Password Reset**: Provides functionality for users to reset their passwords if forgotten.

## Getting Started

To set up the backend, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/gopakumar-k-a/imageDrive-frontend.git
   cd server
