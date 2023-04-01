import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
// cors stands for Cross-Origin Resource Sharing and is used to 
// allow or restrict cross-origin requests (requests made from a different domain or port).
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.send('Hello from AI');
});

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server started on port 8080'));
      } catch (error) {
        console.log(error);
      }};
  
startServer();