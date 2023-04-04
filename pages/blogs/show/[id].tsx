import { GetServerSideProps } from "next";
import { authProvider } from "src/providers/authProvider";
import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";
const { Title, Text } = Typography;
import { Blog } from "@shared/entities/Blog";

export default function BlogPostShow() {
  const { queryResult } = useShow<Blog>()
  const { data, isLoading } = queryResult

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>

      <Title level={5}>Content</Title>
      <Text>
        {record?.content}
      </Text>
      <Title level={5}>Status</Title>
      <Text>
        {record?.published}
      </Text>

    </Show>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/blogs")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
