var Minio = require('minio')
import { promisify } from 'util';

var process = require('process');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';

var minioClient = new Minio.Client({
    endPoint: '147.135.129.16',
    port: 9000,
    useSSL: true,
    accessKey: 'rootIsRoot',
    secretKey: 'tuNousFaisChierAvecTesMotsDePasse!',
})

const presignedUrlAsync = promisify(minioClient.presignedPutObject.bind(minioClient));

const getUrlAsync = promisify(minioClient.presignedUrl.bind(minioClient));

export async function POST(request: Request) {console.log(request.body);
  try {
       const firstFileData = await request.formData();
       const filename = firstFileData.get('nameFile');
       const file = firstFileData.get('file');
       const bucket = firstFileData.get('bucketName');
       console.log(filename);

      minioClient.makeBucket(bucket, 'eu-west-2', function (err) {
          if (err) return console.log('Error creating bucket.', err)
          console.log('Bucket created successfully in "us-east-1".')
      })
      setTimeout(() => {
          console.log("Après le délai de 1 seconde");
      }, 1000);
      const presignedUrl = await presignedUrlAsync(bucket, filename, 10 * 60 * 60);
      console.log("presigned:"+presignedUrl);

     const uploadResponse = await fetch(presignedUrl, { method: 'PUT', body: file});

     if(uploadResponse.ok) {
         const url = await getUrlAsync('GET', bucket, filename, 10 * 60 * 60);
         //console.log("Upload response" + uploadResponse);
         console.log("CC" + url);
         return new Response(url);

     } else {
         console.log("Upload response" + uploadResponse);
         return new Response("Error", { status: 500 });
     }

  } catch (err) {
      console.error(err);
      return new Response('Error occurred', { status: 500 });
  }
}