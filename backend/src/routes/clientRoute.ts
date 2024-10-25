import { getAllClients ,deleteClient,updateClient,getClient,createClient} from '../controllers/clientController';
import express from 'express';

const app = express.Router();

app.post('/clients', createClient);
app.get('/clients/:id', getClient);
app.put('/clients/:id', updateClient);
app.delete('/clients/:id', deleteClient);
app.get('/clients', getAllClients)

export default app;
