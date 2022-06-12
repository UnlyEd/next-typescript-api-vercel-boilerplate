import { NextApiRequest, NextApiResponse } from 'next';
import Sentry, { configureReq } from '../../utils/sentry';

export const status = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    configureReq(req);

    throw Error('Something bad happened!');
  } catch (e) {
    let exceptionId = null;
    console.error(e.message);

    Sentry.withScope((scope): void => {
      scope.setContext('body', req.body)
      exceptionId = Sentry.captureException(e);
    });

    console.debug(`Exception catch for "${e.message}". Sentry exceptionId="${exceptionId}"`);

    res.json({
      error: true,
      message: e.message,
      exceptionId,
    });
  }
};

export default status;
