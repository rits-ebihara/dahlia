import { getApp } from './connectApp';

const app = getApp();

app.get('/', (req, res) => {
  res.json({ message: 'Hello Dahlia Next!!' });
});

export default app;
