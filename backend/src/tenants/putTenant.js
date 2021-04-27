const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
const aws = require("aws-sdk");
const cognito = new aws.CognitoIdentityServiceProvider();
const uuid = require("uuid");

const tableName = process.env.TENANT_TABLE;
const userPoolId = process.env.USER_POOL_ID;

exports.handler = async (event) => {
  console.info("received:", event);

  const body = JSON.parse(event.body);
  const tenant_id = uuid.v1();
  const company_name = body.company_name;
  const role = 'Admin';
  const status = 'Registered';
  const email = body.email;
  const given_name = body.given_name;
  const family_name = body.family_name;

  var params = {
    TableName: tableName,
    Item: { 
      tenant_id: tenant_id,
      company_name: company_name,
      role: role,
      status: status,
      email: email
    },
  };

  const result = await docClient.put(params).promise();

  var groupParams = {
    GroupName: tenant_id,
    UserPoolId: userPoolId,
  };
  const cognitoGroup = await cognito.createGroup(groupParams).promise();
  
  var cognitoParams = {
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
  const cognitoUser = await cognito.adminCreateUser(cognitoParams).promise();
  
  var userToGroupParams = {
    GroupName: tenant_id,
    Username: cognitoUser.User.Username,
    UserPoolId: userPoolId,
  };
  const cognitoUserToGroup = await cognito.adminAddUserToGroup(userToGroupParams).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
  };

  console.info(`statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
};
