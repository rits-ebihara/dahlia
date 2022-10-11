import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import hello from '~/middleware/hello';

const app = nc<
  NextApiRequest & { params: Record<string, string> },
  NextApiResponse
>({
  attachParams: true,
  onError: (err, req, res) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  },
  onNoMatch: (req, res) => {
    res.status(404).json({ error: 'Not Found' });
  },
});

app.use('/api/hello', hello);

export default app;
