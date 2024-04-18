const Users = require("../models/users.model.js");
const validateRequest = require("../validator/users.validator.js");
const {
  publishNotificationEvent,
} = require("../modules/Publisher");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');



class UseCaseBooks {
  constructor(booksProvider) {
    this.booksProvider = booksProvider;
  }

  Login = async (dto) => {
    try {
      const retrieveValidRequest = await validateRequest.login(dto);
      let retrieveListUsers = await this.findOneByUsername(retrieveValidRequest);
      if(!retrieveListUsers.length) {
        throw { message: `Username Not Found.` }
      }else if(retrieveListUsers.length) {
        if(retrieveListUsers[0].username === dto.username && retrieveListUsers[0].password === dto.password) {
          const objAssign = {
            username: retrieveValidRequest.username,
            role: retrieveListUsers[0].role,
            idUser: retrieveListUsers[0].id,
            email: retrieveListUsers[0].email,
            photo: retrieveListUsers[0].photo
          }
          const token = jwt.sign(objAssign, process.env.SECRET_KEY_APPLICATION, { expiresIn: '7d', algorithm: 'HS384' });
          return {token: token, detailUser: objAssign};
        } else {
          throw { message: `Invalid Username or Password.` }
        }
      }

    } catch (error) {
      throw error;
    }
  }

  createUser = async (req) => {
    try {
      // change photo
      req.body.photo = req.file?.filename || "-";;
      let retrieveValidRequest = await validateRequest.Create(req.body);

      await new Users(retrieveValidRequest).Create(retrieveValidRequest);

    } catch (error) {
      throw error;
    }
  }

  findOne = async (dto) => {
    try {
      const retrieveValidRequest = await validateRequest.readById(dto);

      const resp = await new Users(retrieveValidRequest).findOne(retrieveValidRequest);
      return resp;
    } catch (error) {
      throw error;
    }
  }

  findOneByUsername = async (dto) => {
    try {

      const resp = await new Users(dto).findOneByUsername(dto);
      return resp;
    } catch (error) {
      throw error;
    }
  }

  findHROnly = async (dto) => {
    try {

      const resp = await new Users(dto).findHROnly();
      return resp;
    } catch (error) {
      throw error;
    }
  }

  updateOne = async (req) => {
    try {
      const detailUser = req.app.token;
      req.body.photo = req.file?.filename || "-";
      const retrieveValidRequest = await validateRequest.updateProfileHR(req.body);
      const resp = await new Users(retrieveValidRequest).updateOne(retrieveValidRequest, detailUser);

      if (detailUser.role != "HR") {
        let retrieveHRUser = await this.findHROnly(retrieveValidRequest);
        retrieveHRUser.forEach((val, idx) => {

          const objAssign = {
            users_id: val.id,
            message: `${retrieveValidRequest.username} updated his/her profile. You can see on user list.`,
            eventType: 'notification'
          }
          // send it notification to every HR
          publishNotificationEvent(objAssign);
        })
      }

      return resp;
    } catch (error) {
      throw error;
    }
  }

  deleteOne = async (dto) => {
    try {
      const retrieveValidRequest = await validateRequest.readById(dto);

      const resp = await new Users(retrieveValidRequest).deleteOne(retrieveValidRequest);
      return resp;

    } catch (error) {
      throw error;
    }
  }

  findAll = async (dto) => {
    try {
      const resp = await new Users(dto).findAll(dto);
      return resp;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UseCaseBooks;
