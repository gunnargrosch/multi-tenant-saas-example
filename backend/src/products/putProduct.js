// Permission is hereby granted, free of charge, to any person obtaining a copy of this
// software and associated documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights to use, copy, modify,
// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so.
// //
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
// PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
const tokenManager = require('./tokenManager.js');
const uuid = require("uuid");

const tableName = process.env.PRODUCT_TABLE;

exports.handler = async (event) => {
  console.info("received:", event);

  const tenantId = tokenManager.getTenantId(event);
  const tenant_id = tenantId

  const body = JSON.parse(event.body);
  const product_id = uuid.v1();
  const name = body.name;
  const sku = body.sku;
  const price = body.price;
  const category = body.category;

  var params = {
    TableName: tableName,
    Item: {
      product_id: product_id,
      tenant_id: tenant_id,
      name: name,
      sku: sku,
      price: price,
      category: category,
    },
  };

  const result = await docClient.put(params).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
  };

  console.info(`statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
};
