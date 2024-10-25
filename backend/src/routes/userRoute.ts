import { create,get,update,remove,getAll } from '../controllers/userControl';
import express from 'express';

const app = express.Router();

app.post('/users', create);
app.get('/users/:id', get);
app.put('/users/:id', update);
app.delete('/users/:id', remove);
app.get('/users', getAll);

export default app;
