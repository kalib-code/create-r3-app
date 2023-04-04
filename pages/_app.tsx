import React from "react";
import { AppProps } from "next/app";
import type { NextPage } from "next";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { notificationProvider, ThemedLayout } from "@refinedev/antd";
import routerProvider, {
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";

import { remultDataProvider } from "src/providers/dataProvider/dataProvider";
import { liveProvider } from "src/providers/liveProvider";
import "@refinedev/antd/dist/reset.css";
import { Header } from "@components/header";
import { ColorModeContextProvider } from "@contexts";
import { authProvider } from "src/providers/authProvider";
import { entities } from "@shared/entities";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayout Header={Header}>
        <Component {...pageProps} />
      </ThemedLayout>
    );
  };

  return (
    <>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            liveProvider={liveProvider(entities)}
            routerProvider={routerProvider}
            dataProvider={remultDataProvider(entities)}
            notificationProvider={notificationProvider}
            authProvider={authProvider}
            resources={[
              {
                name: "blogs",
                list: "/blogs",
                create: "/blogs/create",
                edit: "/blogs/edit/:id",
                show: "/blogs/show/:id",
                meta: {
                  canDelete: true,
                },
              }
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            {renderComponent()}
            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </>
  );
}

export default MyApp;
