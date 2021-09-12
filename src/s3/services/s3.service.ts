import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk"
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {

  private s3: any;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_ID,
      secretAccessKey: process.env.S3_ACCESS_SECRET,
      region: process.env.S3_REGION
    })

  }

  async uploadImageToS3(files: any[]): Promise<string[]>{
    const imageUrl = {};
    for(let i in files){
      console.log(files[i].originalname,"size : ",files[i].size)
      let params = {
        Bucket: process.env.S3_BUCKET,
        ContentType: files[i].mimetype,
        ACL: "public-read",
        Body: files[i].buffer,
        Key: `${uuidv4()}.${files[i].originalname.split(".").reverse()[0]}`,
      }
      const url = await this.s3.upload(params).promise()
      imageUrl[i] = url.Location
    }
    return Object.values(imageUrl)
  }
}
