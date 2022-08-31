/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { products } from '../../../mock/product';
export default (req: NextApiRequest, res: NextApiResponse) => {
  const response = products
  res.status(200).json(response);
};