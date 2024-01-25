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

export async function POST(request: Request) {console.log(request.body);
  try {
       const firstFileData = await request.formData();
       const filename = firstFileData.get('nameFile');
       const file = firstFileData.get('file');
       console.log(filename);


      const presignedUrl = await presignedUrlAsync('adrien-test', filename, 24 * 60 * 60);
      console.log("URL" + presignedUrl);

     const uploadResponse = await fetch(presignedUrl, { method: 'PUT', body: file});
      return new Response(uploadResponse);

  } catch (err) {
      console.error(err);
      return new Response('Error occurred', { status: 500 });
  }
}