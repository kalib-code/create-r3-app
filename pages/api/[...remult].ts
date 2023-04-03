import { NextApiRequest, NextApiResponse } from 'next'
import { handlerRemult } from '@server/api';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await handlerRemult(req, res);
}

export default handler