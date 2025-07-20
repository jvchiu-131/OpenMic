// upload/upload.service.ts
import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../utils/cloudinary.service';

@Injectable()
export class UploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadProfilePic(file: Express.Multer.File): Promise<string> {
    const result = await this.cloudinaryService.uploadImage(file, 'profilePics');
    return result.secure_url;
  }

  async uploadToFolder(file: Express.Multer.File, folder: string): Promise<string> {
    const result = await this.cloudinaryService.uploadImage(file, folder);
    return result.secure_url;
  }
}
