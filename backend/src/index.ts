import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute';
import thrpyRoute from './routes/thrpyRoute';
import clientRoute from './routes/clientRoute';
import messageRoute from './routes/messageRoute';
import chatbotRoute from './routes/chatbotRoute';
import sessionandbookingRoute from './routes/sessionandbooking';
import videoCallRoute from './routes/videoCallRoute';
import stripePaymentRoute from  './routes/stripePaymentRoute'

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(express.json());

app.use('/api/v1/users', userRoute);
app.use('/api/v1/thrpy', thrpyRoute);
app.use('/api/v1/client', clientRoute);
app.use('/api/v1/event', sessionandbookingRoute);
app.use('/api/v1/chat', messageRoute);
app.use('/api/v1/chatbot', chatbotRoute);
app.use('/api/v1', videoCallRoute);
app.use('/api/v1/stripe', stripePaymentRoute);

app.get('/', (_req, res) => {
  res.json({ message: "Connected" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});