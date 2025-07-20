import { CloudinaryService } from '../utils/cloudinary.service';
export declare class UploadService {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadProfilePic(file: Express.Multer.File): Promise<string>;
    uploadToFolder(file: Express.Multer.File, folder: string): Promise<string>;
}
