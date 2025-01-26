import express from 'express';
import anthropicRouter from './src/routes/anthropic.route.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/api', anthropicRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port 8080`);
});
