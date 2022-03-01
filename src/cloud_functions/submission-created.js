import AWS from 'aws-sdk';
import uuid from 'uuid';

const { SC_AWS_ACCESS_KEY_ID, SC_AWS_SECRET_ACCESS_KEY } = process.env;
const APPLICATION_JSON = 'application/json';
const PRIVATE = 'private';
const UTF8 = 'utf8';
const Bucket = 'solentcloud-contact';
const HTTP_OK = 200;
const HTTP_ERROR = 500;

const handler = async (event, context) => {
  const s3 = new AWS.S3({
    accessKeyId: SC_AWS_ACCESS_KEY_ID,
    secretAccessKey: SC_AWS_SECRET_ACCESS_KEY,
  });

  const submissionId = uuid.v4();
  const submissionDate = new Date().toISOString().split(/T/)[0];
  const payload = { submissionId, ...JSON.parse(event.body).payload };
  const formName = payload.form_name || 'unknown_form';

  const s3Payload = {
    Bucket,
    Key: `${formName}/${submissionDate}/${submissionId}.json`,
    Body: JSON.stringify(payload),
    ACL: PRIVATE,
    ContentEncoding: UTF8,
    ContentType: APPLICATION_JSON,
  };

  try {
    const result = await s3.upload(s3Payload).promise();

    if (error) return { statusCode: HTTP_ERROR, body: JSON.stringify(error) };

    return { statusCode: HTTP_OK, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: HTTP_ERROR, body: e.message };
  }
};

export { handler };
