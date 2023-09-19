const express = require('express');
const cors = require('cors');
const appRouter = require('./routes/route');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', appRouter);

app.get('/hello', (req, res) => {
  res.send('Hello World!')
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})