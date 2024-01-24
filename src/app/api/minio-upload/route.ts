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

export async function POST(request: Request) {
  try {
    const presignedUrl = await presignedUrlAsync('adrien-test', 'hello.txt', 24 * 60 * 60);
    return new Response(presignedUrl);
  } catch (err) {
    console.error(err);
    return new Response('Error occurred', { status: 500 });
  }
}