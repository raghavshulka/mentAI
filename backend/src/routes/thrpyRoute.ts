import express from 'express'
import { create,get,update,remove,getAll } from '../controllers/thrpyController';
const app = express.Router()
app.post('/therapists', create);
app.get('/therapists/:id', get);
app.put('/therapists/:id', update);
app.delete('/therapists/:id', remove);
app.get('/therapists', getAll);
export default app