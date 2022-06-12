import { NextApiRequest, NextApiResponse } from 'next';

import Sentry, { configureReq } from '../../utils/sentry';

export const status = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    configureReq(req);

    res.json({
      nodejs: process.version,
      nodejsAWS: process.env.AWS_EXECUTION_ENV,
      regionNOW: process.env.NOW_REGION,
      regionAWS: process.env.AWS_REGION,
      timezone: process.env.TZ,
      memory: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
      environment: process.env.NODE_ENV,
      stage: process.env.APP_STAGE,
      buildTime: process.env.BUILD_TIME,
      buildTimestamp: process.env.BUILD_TIMESTAMP,
    });

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

export default status;
