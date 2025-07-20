// utils/cloudinary.service.ts (or common/cloudinary.service.ts)
import { Injectable } from '@nestjs/common';
import { v2 as Cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File, folder = 'default'): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = Cloudinary.uploader.upload_stream(
        { folder, resource_type: 'image' },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) {
            const formattedError = new Error(error.message || 'Cloudinary upload failed');
            return reject(formattedError);
        }
          resolve(result);
        },
      );

      const bufferStream = new Readable();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      bufferStream.push(file.buffer);
      bufferStream.push(null);
      bufferStream.pipe(uploadStream);
    });
  }
}
