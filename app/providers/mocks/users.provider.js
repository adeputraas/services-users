const axios = require("axios");

class BookProvider {
  constructor(url) {
    this.url = url;
  }

  retrieveBySubject = async (dto) => {
    try {
      const response = await axios({
        method: "get",
        url: `${this.url}/subjects/${dto.subject}?details=true`,
        responseType: "application/json",
      });
      return response.data;
    } catch (error) {
      throw undefined;
    }
  };
}

module.exports = BookProvider;
