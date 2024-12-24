const express=require('express');
const cors=require('cors');
const rootRouter = require('./routes/index.js'); 

const app = express();

app.use(cors());


app.use(express.json());

app.use('/api', rootRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
