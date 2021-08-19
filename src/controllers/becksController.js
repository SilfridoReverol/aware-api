const Pool = require('pg').Pool;
const dbConfig = require('../config/db');
const field = require('../utils/field');
const dbQueriesBeck = require('../config/queries/becks');
const dbQueriesUser = require('../config/queries/user');
const becksPdfCreator = require('../utils/becksPdf');
const { sendMail } = require('../utils/mailer');
const pool = new Pool(dbConfig);
const path = require('path');

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
      saved_phoneNumber: element.phone_number,
      saved_therapistEmail: element.therapist_email,
    });
  });

  return users;
};

const dataToBecks = (rows) => {
  const Becks = [];

  rows.forEach((element) => {
    Becks.push({
      id: element.becks_id,
      q1: element.q1,
      q2: element.q2,
      q3: element.q3,
      q4: element.q4,
      q5: element.q5,
      q6: element.q6,
      q7: element.q7,
      q8: element.q8,
      q9: element.q9,
      q10: element.q10,
      q11: element.q11,
      q12: element.q12,
      q13: element.q13,
      q14: element.q14,
      q15: element.q15,
      q16: element.q16,
      q17: element.q17,
      q18: element.q18,
      q19: element.q19,
      q20: element.q20,
      q21: element.q21,
      total_score: element.total_score,
      test_date: element.test_date,
      send_date: element.send_date,
      userId: element.user_id,
    });
  });

  return Becks;
};

const createBeck = async (req, res) => {
  const {
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    thirteen,
    fourteen,
    fifteen,
    sixteen,
    seventeen,
    eighteen,
    nineteen,
    twenty,
    twentyone,
    totalScore,
    testDate,
    sendDate,
    userId,
  } = req.body;

  const data = await pool.query(dbQueriesBeck.createBecks, [
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    thirteen,
    fourteen,
    fifteen,
    sixteen,
    seventeen,
    eighteen,
    nineteen,
    twenty,
    twentyone,
    totalScore,
    testDate,
    sendDate,
    userId,
  ]);

  if (data) {
    if (data.rowCount > 0) {
      const becks = dataToBecks(data.rows);

      res.json(newReponse('User Registered correctly', 'Success', becks));
    } else {
      res.json(newReponse('error perro', 'Error', {}));
    }
  }
};

const getBecks = async (req, res) => {
  const { userId } = req.params;
  const data = await pool.query(dbQueriesBeck.getUserBecks, [userId]);

  if (data) {
    data.rowCount > 0
      ? res.json(newReponse('Becks found', 'Success', dataToBecks(data.rows)))
      : res.json(newReponse('Becks not found', 'Error', {}));
  } else {
    res.json(newReponse('Error searching Establishmen with id', 'Error', {}));
  }
};

const createBecksPdf = async (req, res) => {
  const { becksId } = req.params;
  const data = await pool.query(dbQueriesBeck.getBeckById, [becksId]);

  if (data) {
    // console.log(data);
    const becks = dataToBecks(data.rows);
    const becksData = becks[0];
    console.log(becksData);
    const userId = becksData.userId;

    const user = await pool.query(dbQueriesUser.getUserById, [userId]);

    if (user) {
      const userData = dataToUser(user.rows);
      const becksUser = userData[0];

      becksPdfCreator(becksData, becksUser);
      console.log(becksData.send_date);

      res.json(newReponse('a', 'b', dataToUser(user.rows)));
    } else {
      console.log('err');
    }
  } else {
    res.send('wrong');
  }
};

const sendBecks = async (req, res) => {
  const { becksId } = req.params;
  const data = await pool.query(dbQueriesBeck.getBeckById, [becksId]);

  if (data) {
    const becks = dataToBecks(data.rows);
    const becksData = becks[0];
    console.log(becksData);
    const userId = becksData.userId;

    const user = await pool.query(dbQueriesUser.getUserById, [userId]);

    if (user) {
      const userData = dataToUser(user.rows);
      const becksUser = userData[0];
      sendMail(
        becksUser.saved_therapistEmail,
        becksUser.first_name + becksUser.last_name + 'Inventario de Beck',
        `
        <p >${becksUser.first_name} ha tomado el inventario de Beck</p>
        <span style="color: green">Este correo se ha enviado desde una cuenta no monitoreada. Por favor no responder</span>
      `,
        [
          {
            filename: 'Document.pdf',
            path: 'C:/Users/silfr/Desktop/aware/aware-api/beck.pdf',
            contentType: 'application/pdf',
          },
        ],
        () => res.status(200).json('success')
      );
    }
  }
};

const deleteBecks = async (req, res) => {
  const { becksId } = req.params;
  const data = await pool.query(dbQueriesBeck.deleteBecksById, [becksId]);

  data
    ? res.json(newReponse('Becks deleted successfully', 'Success'))
    : res.json(newReponse('Error on delete with id', 'Error'));
};

module.exports = {
  sendBecks,
  createBeck,
  getBecks,
  createBecksPdf,
  deleteBecks,
};
