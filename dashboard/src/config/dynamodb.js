const AWS = require("aws-sdk");
const util = require("util");
require("dotenv").config();
const { items } = require("./mock");

console.log("Connecting to dynamodb...");

AWS.config.update({
  region: "localhost",
  endpoint: "http://dynamodb:8000",
//endpoint: "http://localhost:8000", 
});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();
const docQuery = util.promisify(docClient.query.bind(docClient));
const docScan = util.promisify(docClient.scan.bind(docClient));

dynamodb.listTables({}, (err, data) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Dynamodb connected successfully");

    if (!data.TableNames.includes("Reports")) {
      const createTableParams = {
        TableName: "Reports",
        KeySchema: [
          { AttributeName: "id", KeyType: "HASH" }, // Primary key attribute
        ],
        AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "S" }, // String data type
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1000, // Adjust based on your requirements
          WriteCapacityUnits: 1000, // Adjust based on your requirements
        },
      };

      dynamodb.createTable(createTableParams, (err, data) => {
        if (err) {
          console.error("Error creating table:", err);
        } else {
          const insertPromises = items.map((item) => {
            const putParams = {
              TableName: "Reports",
              Item: item,
            };

            return docClient.put(putParams).promise();
          });

          Promise.all(insertPromises)
            .then((results) => {
              console.log("Items inserted successfully");
            })
            .catch((err) => {
              console.error("Error inserting items:", err);
            });
        }
      });
    }
  }
});

module.exports = {
  dynamodb,
  docClient,
  docQuery,
  docScan,
};
