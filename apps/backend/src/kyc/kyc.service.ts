import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class KycService {
  private readonly uploadPath: string;

  constructor() {
    this.uploadPath = path.join(process.cwd(), 'uploads');
  }

  generateRandomFileName(originalName: string): string {
    const randomString = crypto.randomBytes(16).toString('hex');
    const fileExtension = path.extname(originalName);
    const timestamp = Date.now();
    return `${randomString}-${timestamp}-${fileExtension}`;
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }

    const fileName = this.generateRandomFileName(file.originalname);
    const filePath = path.join(this.uploadPath, fileName);

    await fs.promises.writeFile(filePath, file.buffer);
    return fileName;
  }

  async saveMultipleFiles(files: {
    [field_name: string]: Express.Multer.File[];
  }): Promise<{ [field_name: string]: string }> {
    const savedFiles: { [field_name: string]: string } = {};

    for (const [key, fileArray] of Object.entries(files)) {
      if (fileArray && fileArray.length > 0) {
        const file = fileArray[0];
        savedFiles[key] = await this.saveFile(file);
      }
    }

    return savedFiles;
  }
  createKYCEntry() {}
}
