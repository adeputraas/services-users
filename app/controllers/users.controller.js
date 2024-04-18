const BookProvider = require("../providers/users.provider");
const UseCaseUser = require("../use-cases/users.use-case");
const {
  publishLogEvent,
} = require("../modules/Publisher");

const provider = new BookProvider(process.env.API_LIBRARY);
const UseCase = new UseCaseUser(provider);

exports.Login = async (req, res) => {
  try {
    const response = await UseCase.Login(req.body);

    const logActivity = {
      users_id: response.detailUser.idUser || "-",
      activity: "Logged in",
      url_api: req.originalUrl,
      detail_message: "Success",
      status_response: "200",
      eventType: "logs",
    };
    publishLogEvent(logActivity);

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: response,
    });
  } catch (error) {
    const logActivity = {
      users_id: "---",
      activity: error.message,
      url_api: req.originalUrl,
      detail_message: error.message,
      status_response: "400",
      eventType: "logs",
    };
    publishLogEvent(logActivity);
    res.status(400).send({ status: "Bad Request", message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const response = await UseCase.createUser(req);

    // Log Activity
    const logActivity = {
      users_id: req.app.token.idUser || "-",
      activity: "Created User",
      url_api: req.originalUrl,
      detail_message: "Success",
      status_response: "200",
      eventType: "logs",
    };
    publishLogEvent(logActivity);

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: response,
    });
  } catch (error) {
    const logActivity = {
      users_id: req.app.token.id || "-",
      activity: "Created User",
      url_api: req.originalUrl,
      detail_message: error.message,
      status_response: "400",
      eventType: "logs",
    };
    publishLogEvent(logActivity);
    res.status(400).send({ status: "Bad Request", message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const response = await UseCase.updateOne(req);

    // Log Activity
    const logActivity = {
      users_id: req.app.token.idUser || "-",
      activity: "Updated User",
      url_api: req.originalUrl,
      detail_message: "Success",
      status_response: "200",
      eventType: "logs",
    };
    publishLogEvent(logActivity);

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: response,
    });
  } catch (error) {
    // Log Activity
    const logActivity = {
      users_id: req.app.token.idUser || "-",
      activity: "Updated User",
      url_api: req.originalUrl,
      detail_message: error.message,
      status_response: "400",
      eventType: "logs",
    };
    publishLogEvent(logActivity);

    res.status(400).send({ status: "Bad Request", message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const response = await UseCase.deleteOne({ uid: req.params.idUser });

    // Log Activity
    const logActivity = {
      users_id: req.app.token.idUser || "-",
      activity: "Deleted User",
      url_api: req.originalUrl,
      detail_message: "-",
      status_response: "200",
      eventType: "logs",
    };
    publishLogEvent(logActivity);

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: response,
    });
  } catch (error) {
    // Log Activity
    const logActivity = {
      users_id: req.app.token.idUser || "-",
      activity: "Deleted User",
      url_api: req.originalUrl,
      detail_message: error.message,
      status_response: "400",
      eventType: "logs",
    };
    publishLogEvent(logActivity);
    res.status(400).send({ status: "Bad Request", message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const response = await UseCase.findAll(req.app.token);
    res.status(200).send({
      status: "Success",
      message: "Success",
      data: response,
    });
  } catch (error) {
    res.status(400).send({ status: "Bad Request", message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const response = await UseCase.findOne({ uid: req.params.idUser });
    res.status(200).send({
      status: "Success",
      message: "Success",
      data: response,
    });
  } catch (error) {
    res.status(400).send({ status: "Bad Request", message: error.message });
  }
};
