import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import { mockRequest, mockResponse } from '../../utils/tests-mocks';
import error from './error';

describe('error', () => {
  test('should be a function', async () => {
    expect(error).toBeInstanceOf(Function);
  });

  test('should return expected variables', async () => {
    // @ts-ignore
    const req: NextApiRequest = mockRequest({}, {});
    const res: NextApiResponse = mockResponse();
    await error(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ // https://stackoverflow.com/a/55569458/2391795
      error: true,
      message: 'Something bad happened!',
    }));
  });
});
