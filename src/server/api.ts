import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { remultNext } from "remult/remult-next"
import { entities } from "@shared/entities";

export const handlerRemult = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  })
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser()

  console.log('user', user)
  const api = remultNext({
    getUser: () => user as any,
    entities
  });
  return api.handle(req, res);
}

