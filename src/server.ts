import express from 'express';
import userRoute from './routes';

const app = express()

const PORT = 3333;

app.use(express.json())
app.use(userRoute);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})