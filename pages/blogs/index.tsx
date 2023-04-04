import {
  useTable,
  List,
  DateField,
  ShowButton,
  TagField,
} from "@refinedev/antd";
import {
  Table,
} from "antd";
import { GetServerSideProps } from "next";
import { authProvider } from "src/providers/authProvider";

import { Blog } from "@shared/entities/Blog";


export default function BlogList() {
  const { tableProps } = useTable<Blog[]>({
    syncWithLocation: true
  });

  return (
    <List>
      <Table {...tableProps} rowKey={"id"}>
        <Table.Column
          title="Title"
          dataIndex="title"
        />
        <Table.Column
          title="Content"
          dataIndex="content"
        />
        <Table.Column
          title="Created At"
          dataIndex="createdAt"
          render={(createdAt) => {
            return <DateField value={createdAt} />;
          }}

        />
        <Table.Column
          dataIndex="published"
          title="Status"
          render={(value: string) => <TagField value={value} />}
        />
        <Table.Column
          title="Action"
          render={(_, record: Blog) => {
            return (
              <>
                <ShowButton recordItemId={record.id} />
              </>
            );
          }}
        />

      </Table>

    </List>
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
