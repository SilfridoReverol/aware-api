const Pool = require('pg').Pool;
const bcryt = require('bcryptjs');
const dbConfig = require('../config/db');
const dbQueriesUser = require('../config/queries/user');
const passwordUtil = require('../utils/password');
const field = require('../utils/field');

const pool = new Pool(dbConfig);

const newReponse = (message, typeResponse, body) => {
  return { message, typeResponse, body };
};

const dataToUser = (rows) => {
  const users = [];

  rows.forEach((element) => {
    users.push({
      id: element.userid,
      first_name: element.first_name,
      last_name: element.last_name,
      saved_sex: element.sex,
      saved_age: element.age,
      saved_email: element.email,
      encrypted_password: element.password,
      saved_phoneNumber: element.phone_number,
      saved_therapistEmail: element.therapist_email,
    });
  });

  return users;
};

const checkEmail = async (email, callBack) => {
  const data = await pool.query(dbQueriesUser.getUserByEmail, [email]);

  if (data) {
    if (data.rows.length > 0) {
      return callBack(null, dataToUser(data.rows));
    } else {
      return callBack(null, null);
    }
  } else {
    return callBack('Error on query');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const data = await pool.query(dbQueriesUser.getUserByEmail, [email]);

  if (data) {
    if (data.rowCount > 0) {
      const users = dataToUser(data.rows);

      (await bcryt.compare(password, data.rows[0].password))
        ? res.json(newReponse('Logged successfully', 'Success', users))
        : res.json(newReponse('Incorrect password', 'Error', {}));
    } else {
      res.json(newReponse('Email not found', 'Error', {}));
    }
  } else {
    res.json(newReponse('Error searching user with email', 'Error', {}));
  }
};

const getUser = async (req, res) => {
  const data = await pool.query(dbQueriesUser.getAllUsers);

  if (data) {
    data.rowCount > 0
      ? res.json(newReponse('All users', 'Success', dataToUser(data.rows)))
      : res.json(newReponse('Error searhing the users', 'Error', {}));
  } else {
    res.json(newReponse('Without users', 'Success', {}));
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  const data = await pool.query(dbQueriesUser.getUserById, [userId]);

  if (data) {
    data.rowCount > 0
      ? res.json(newReponse('User found', 'Success', dataToUser(data.rows)))
      : res.json(newReponse('User not found', 'Error', {}));
  } else {
    res.json(newReponse('Error searching user with id', 'Error', {}));
  }
};

const createUser = (req, res) => {
  const {
    firstName,
    lastName,
    sex,
    age,
    email,
    phoneNumber,
    password,
    therapistEmail,
  } = req.body;
  const errors = [];

  if (
    !field.checkFields([
      firstName,
      lastName,
      sex,
      age,
      email,
      therapistEmail,
      phoneNumber,
      password,
    ])
  ) {
    errors.push({ text: 'Please fill all the fields' });
  }

  if (!passwordUtil.checkPass(password)) {
    console.log('aqui deberia quedar');
    errors.push({
      text: 'passwords must be uppercase, lowercase, special characters, have more than 8 digits and match each other',
    });
  }

  if (errors.length > 0) {
    console.log('aqui deberia salir');
    res.json(newReponse('Errors detected', 'Fail', { errors }));
  } else {
    checkEmail(email, (err, users) => {
      if (err) {
        res.json(newReponse(err, 'Error', {}));
      } else if (users) {
        res.json(newReponse(`Email ${email} already use`, 'Error', {}));
      } else {
        passwordUtil.encryptPass(password, async (err, hash) => {
          if (err) {
            res.json(newReponse(err, 'Error', {}));
          } else {
            const data = await pool.query(dbQueriesUser.createUsers, [
              firstName,
              lastName,
              sex,
              email,
              hash,
              phoneNumber,
              therapistEmail,
              age,
            ]);

            console.log(data);

            if (data) {
              if (data.rowCount > 0) {
                const users = dataToUser(data.rows);

                res.json(
                  newReponse('User Registered correctly', 'Success', users)
                );
              } else {
                res.json(newReponse('error perro', 'Error', {}));
              }
            }

            // data
            //   ? res.json(
            //       newReponse('User created', 'Success', {
            //         id: data.rows[0].user_ide,
            //       })
            //     )
            //   : res.json(newReponse('Error create user', 'Error', {}));
          }
        });
      }
    });
  }
};

const deleteUserById = async (req, res) => {
  const { userId } = req.params;
  const data = await pool.query(dbQueriesUser.deleteUserById, [userId]);

  data
    ? res.json(newReponse('User deleted successfully', 'Success', {}))
    : res.json(newReponse('Error on delete with id', 'Error', {}));
};

module.exports = {
  login,
  getUser,
  createUser,
  getUserById,
  deleteUserById,
};
