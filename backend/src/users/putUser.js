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
const aws = require("aws-sdk");
const cognito = new aws.CognitoIdentityServiceProvider();
const tokenManager = require('./tokenManager.js');

const userPoolId = process.env.USER_POOL_ID;

exports.handler = async (event) => {
  console.info("received:", event);

  const tenantId = tokenManager.getTenantId(event);
  const tenant_id = tenantId

  const body = JSON.parse(event.body);
  const email = body.email;
  const given_name = body.given_name;
  const family_name = body.family_name;
  const company_name = body.company_name;
  const tier = body.tier;
  const role = body.role;

  var params = {
    UserPoolId: userPoolId,
    Username: email,
    DesiredDeliveryMediums: ["EMAIL"],
    UserAttributes: [
      {
        Name: "email",
        Value: email
      },
      {
        Name: "email_verified",
        Value: "true"
      },
      {
        Name: "custom:tenant_id",
        Value: tenant_id
      },
      {
        Name: "custom:company_name",
        Value: company_name
      },
      {
        Name: "custom:tier",
        Value: tier
      },
      {
        Name: "custom:role",
        Value: role
      },
      {
        Name: "given_name",
        Value: given_name
      },
      {
        Name: "family_name",
        Value: family_name
      }
    ]
  };

  const result = await cognito.adminCreateUser(params).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
  };

  console.info(`statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
};
