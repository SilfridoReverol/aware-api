const table = 'user_1';

module.exports = {
  createUsers: `INSERT INTO ${table} (first_name, last_name, sex, email, password, phone_number, therapist_email, age) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
    RETURNING user_id, first_name, last_name, therapist_email`,

  getAllUsers: `SELECT * FROM ${table}`,

  getUserById: `SELECT * FROM ${table}  WHERE user_id = $1`,

  getUserByEmail: `SELECT * FROM ${table} WHERE email = $1`,

  getUsersByEmailAndPassword: `SELECT * FROM ${table}  WHERE email = $1 AND password = $2`,

  deleteUserById: `DELETE FROM ${table} WHERE user_ide = $1`,
};
