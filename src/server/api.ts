import { createRemultServer } from "remult/server";
import { Task } from "@shared/Task";
import { Blog } from "@shared/Blog";

export const api = createRemultServer({
  entities: [Task, Blog],
});

import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";


export function withRemult<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(
  getServerPropsFunction: GetServerSideProps<P, Q, D>
): GetServerSideProps<P, Q, D> {
  return (context: GetServerSidePropsContext<Q, D>) => {
    return new Promise<GetServerSidePropsResult<P>>((res, err) => {
      api.withRemult(context, undefined!, async () => {
        try {
          let r = await getServerPropsFunction(context);
          res(JSON.parse(JSON.stringify(r)));
        } catch (e) {
          err(e);
        }
      });
    });
  };
}