import { NextApiRequest, NextApiResponse } from 'next';

import Sentry, { configureReq } from '../../utils/sentry';

export const date = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // Allow CORS requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  try {
    configureReq(req);

    const date = new Date().toISOString()
      .replace(/T/, ' ')
      .replace(/\..+/, '');

    res.json({ date });

  } catch (e) {
    let exceptionId = null;
    console.error(e.message);

    Sentry.withScope((scope): void => {
      // req.
      exceptionId = Sentry.captureException(e);
    });

    res.json({
      error: true,
      message: e.message,
      exceptionId,
    });
  }
};

export default date;
