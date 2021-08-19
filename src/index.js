const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
  res.send(`server running on port ${PORT}`);
});

app.use('/api/users', require('./routes/user'));
app.use('/api/becks', require('./routes/beck'));
// app.use('/api/anamnesis', require('./routes/anamnesis'));
// app.use('/api/files', require('./routes/files'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server initialized on port ${PORT}`));
