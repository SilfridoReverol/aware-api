const table = 'becks';

module.exports = {
  createBecks: `INSERT INTO ${table} (q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, total_score, test_date, send_date, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) 
  RETURNING becks_id`,
  getUserBecks: `SELECT * FROM ${table} WHERE user_id = $1`,
  getBeckById: `SELECT * FROM ${table} WHERE becks_id = $1`,
  deleteBecksById: `DELETE FROM ${table} WHERE becks_id = $1`,
};
