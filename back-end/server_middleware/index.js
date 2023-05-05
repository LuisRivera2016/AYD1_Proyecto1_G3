import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import { login, register, validateUrl } from './middleware.js';

const app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

app.post('/login', login);
app.post('/register', register);
app.use(validateUrl);

app.listen(4500, () => {
  console.log('Server started on port 4500');
});