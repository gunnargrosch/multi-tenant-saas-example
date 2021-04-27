const tableName = process.env.TENANT_TABLE;

const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

exports.handler = async (event) => {
  console.info("received:", event);

  var params = {
    TableName: tableName,
  };
  const data = await docClient.scan(params).promise();
  const items = data.Items;

  const response = {
    statusCode: 200,
    body: JSON.stringify(items),
  };

  console.info(`statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
};
