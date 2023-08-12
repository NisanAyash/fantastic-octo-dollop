const { docScan } = require("../../config/dynamodb");

const params = {
  TableName: "Reports",
};

class Reports {
  constructor() {}
  getReports() {
    return docScan(params);
  }
}

module.exports = new Reports();
