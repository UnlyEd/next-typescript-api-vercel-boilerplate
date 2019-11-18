import { NowRequest, NowResponse } from '@now/node';

import Sentry, { configureReq } from '../../utils/sentry';

export const date = async (req: NowRequest, res: NowResponse): Promise<void> => {
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
