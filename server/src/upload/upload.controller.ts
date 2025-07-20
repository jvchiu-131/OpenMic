
import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File, @Query('folder') folder?: string) {
    const folderName = folder || 'misc';
    const result = await this.uploadService.uploadToFolder(file, folderName);
    if (!result) {
      throw new Error('Upload failed: no secure URL returned');
    }
    return { url: result };
  }
}
