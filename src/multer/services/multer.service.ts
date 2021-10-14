import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';

@Injectable()
export class MulterService implements  MulterOptionsFactory{

  private FILE_LIMIT_SIZE = 20971520 //20mb

  constructor() {}

  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {

    return {
      // storage: multerS3Storage,
      fileFilter: this.fileFilter,
      // limits: {
      //   fileSize: this.FILE_LIMIT_SIZE
      // }
    }
  }

  public fileFilter(req: Express.Request, file: Express.Multer.File, cb: (err: Error | null, acceptFile: boolean)=>void){
    if(file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)){
      cb(null, true)
    }else{
      cb(new Error("unsupported file"), false)
    }
  }
}
