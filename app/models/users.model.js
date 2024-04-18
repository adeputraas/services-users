require("dotenv").config();
const sql = require("./db.js");
const uuid = require("uuid");
// const axios = require("axios");
// const BookProvider = require("../providers/users.provider");

class Users {
  constructor(user) {
    this.uid =  uuid.v4() || user.uid  ;
    this.username = user.username;
    // this.password = user.password;
    // this.role = user.role;
    // this.email = user.email;
    // this.phoneNumber = user.phoneNumber;
    // this.photo = user.photo;
  }

  Create = async (user) => {
    try {
      const dto = [
        {
          id: this.uid,
          username: user.username,
          password: user.password,
          role: user.role,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photo: user.photo,
        },
      ];
      const results = await new Promise((resolve, reject) => {
        sql.query(/* sql */ `INSERT INTO users SET ?`, dto, (err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      }).then((response) => response);
      return results;
    } catch (error) {
      throw error;
    }
  };

  findOne = async (user) => {
    try {
      const results = await new Promise((resolve, reject) => {
        sql.query(
          /* sql */ `SELECT * FROM users WHERE id =?`,
          [user.uid],
          (err, res) => {
            if (err) reject(err);
            resolve(res);
          }
        );
      }).then((response) => response);
      return results;
    } catch (error) {
      throw error;
    }
  };

  findOneByUsername = async (user) => {
    try {
      const results = await new Promise((resolve, reject) => {
        sql.query(
          /* sql */ `SELECT * FROM users WHERE username =?`,
          [user.username],
          (err, res) => {
            if (err) reject(err);
            resolve(res);
          }
        );
      }).then((response) => response);
      return results;
    } catch (error) {
      throw error;
    }
  };

  findAll = async () => {
    try {
      const results = await new Promise((resolve, reject) => {
        sql.query(
          /* sql */ `SELECT * FROM users WHERE active = 1`,
          [],
          (err, res) => {
            if (err) reject(err);
            resolve(res);
          }
        );
      }).then((response) => response);
      return results;
    } catch (error) {
      throw error;
    }
  };

  findHROnly = async () => {
    try {
      const results = await new Promise((resolve, reject) => {
        sql.query(
          /* sql */ `SELECT id FROM users WHERE role = 'HR'`,
          [],
          (err, res) => {
            if (err) reject(err);
            resolve(res);
          }
        );
      }).then((response) => response);
      return results;
    } catch (error) {
      throw error;
    }
  };

  updateOne = async (user, detailUserToken) => {
    try {
      let dto = [];
      let query = "";
      if (detailUserToken.role === "HR") {
        dto = [
          user.username,
          user.password,
          user.role,
          user.email,
          user.phoneNumber,
          user.photo,
          user.uid,
        ];

        query =
          "UPDATE users SET username=?, password=?, role=?, email=?, phoneNumber=?, photo=? WHERE id=?";
      } else {
        dto = [user.password, user.phoneNumber, user.photo, user.uid];

        query =
          "UPDATE users SET password=?, phoneNumber=?, photo=? WHERE id=?";
      }

      console.log(dto, query,'?????')
      const results = await new Promise((resolve, reject) => {
        sql.query(/* sql */ query, dto, (err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      }).then((response) => response);
      return results;
    } catch (error) {
      throw error;
    }
  };

  deleteOne = async (user) => {
    try {
      let dto = [user.uid];
      const results = await new Promise((resolve, reject) => {
        sql.query(
          /* sql */ `UPDATE users SET active=0 WHERE id=?`,
          dto,
          (err, res) => {
            if (err) reject(err);
            resolve(res);
          }
        );
      }).then((response) => response);
      return results;
    } catch (error) {
      throw error;
    }
  };

  sendNotification = async (user) => {
    try {
      const results = await new Promise((resolve, reject) => {
        sql.query(
          /* sql */ `INSERT INTO notifications SET ?`,
          user,
          (err, res) => {
            if (err) reject(err);
            resolve(res);
          }
        );
      }).then((response) => response);
      return results;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = Users;
