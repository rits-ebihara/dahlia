import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

export const getApp = () =>
  nc<NextApiRequest & { params: Record<string, string> }, NextApiResponse>({
    attachParams: true,
  });
