// cloudinary.module.ts
import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  providers: [CloudinaryProvider],
  exports: [CloudinaryProvider], // so it can be used in other modules
})
export class CloudinaryModule {}
