const ReportsService = require("./model");

// const reportsMock = [
//   {
//     userAgent:
//       "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/13.1058",
//     category: "category 71",
//     countryid: "ca",
//     creationdate: 1652696989789.922,
//     id: "32b1bf18-6685-4043-9d7a-0c25c928aa86",
//     clientid: "0f1cf6dc-ec41-4c33-97a0-e2fff4648ed5",
//     subcategory: "subcategory 21",
//   },
//   {
//     userAgent:
//       "Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36",
//     category: "category 71",
//     countryid: "il",
//     creationdate: 1651281626947,
//     id: "408f10d8-62a3-40bc-a65d-51c511bd78fa",
//     clientid: "2f4cbf92-ca71-4f2f-ae0b-8d9a4f8b8d13",
//     subcategory: "subcategory 01",
//   },
// ];

// const reportQuery = () => Promise.resolve(reportsMock);

const getReports = async (req, res, next) => {
  try {
    const reports = await ReportsService.getReports();
    return res.send({ reports, total: reports.length });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getReports,
};
