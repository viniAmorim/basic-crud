import express from 'express';

import userRoute from './routes';

const app = express();

app.use(express.json());
app.use(userRoute);

export { app };
