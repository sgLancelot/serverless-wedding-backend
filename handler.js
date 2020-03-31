const dynamodb = require('aws-sdk/clients/dynamodb')
const docClient = new dynamodb.DocumentClient({ convertEmptyValues: true })

const uuid = require('uuid')

const tableName = process.env.DDB_TABLE_NAME

module.exports.post = async event => {
  const data = JSON.parse(event.body)
  const timestamp = new Date().getTime()
  
  var params = {
    TableName: tableName,
    Item: { 
      id: uuid.v1(),
      createdAt: timestamp,
      name: data.name, 
      contact: data.contact, 
      rsvp: data.rsvp,
      diet: data.diet,
      drive: data.drive,
      addiGuest: data.addiGuest,
      addiAdultChild: data.addiAdultChild,
      addiBaby: data.addiBaby,
      addiDiet: data.addiDiet
    }
  }

  try {
    await docClient.put(params).promise()
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'Successfully posted to DDB!'
    }
  } catch(exception) {
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