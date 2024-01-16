import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req) {
    const formData = await req.formData();
    const bucketName = process.env.AWS_S3_BUCKET_NAME


    if (formData.has('file')) {
        const file = formData.get('file')

        const s3Client = new S3Client({
            region: "us-east-1",
            credentials: {
                accessKeyId: process.env.AWS_S3_ACCESS_KEY,
                secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
            }
        })
        const fileName = `image-${Date.now()}-${file.name}`
        console.log(fileName)

        const chunks = []
        for await (const chunk of file.stream()) {
            chunks.push(chunk)
        }

        await s3Client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            ACL: 'public-read',
            Body: Buffer.concat(chunks),
            ContentType: file.type

        }))
        const link = `https://${bucketName}.s3.amazonaws.com/${fileName}`

        return Response.json(link);
    }


}