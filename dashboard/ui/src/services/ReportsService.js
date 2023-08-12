import http from "./http";

class Reports {
  constructor() {}

  getReports() {
    return http
      .get("/reports")
      .then((res) => {
        const data = res.data;
        const { reports } = data;
        return reports.Items;
      })
      .catch((err) => Promise.reject(err));
  }
}

export default new Reports();
