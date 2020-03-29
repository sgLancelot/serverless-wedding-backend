const dynamodb = require('aws-sdk/clients/dynamodb')
const docClient = new dynamodb.DocumentClient()

const uuid = require('uuid')

const tableName = process.env.DDB_TABLE_NAME

module.exports.post = async event => {
  const data = JSON.parse(event.body)
  const timestamp = new Date().getTime()
  
  var params = {
      TableName: tableName,
      Item: { 
        id: uuid.v1(),
        name: data.name, 
        contact: data.contact, 
        additional: data.additional,
        createdAt: timestamp
      }
  }

  const ddbPromise = await docClient.put(params).promise()
  if (ddbPromise) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'Successfully posted to DDB!'
    }
  } else {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'Failed to post to DDB!'
    }
  }
}