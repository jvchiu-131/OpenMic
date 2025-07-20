import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    upload(file: Express.Multer.File, folder?: string): Promise<{
        url: string;
    }>;
}
