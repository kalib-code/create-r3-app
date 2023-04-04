import { GetServerSideProps } from "next";
import { authProvider } from "src/providers/authProvider";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { Blog } from "@shared/entities/Blog";

export default function BlogPostEdit() {

  const { formProps, saveButtonProps, queryResult } = useForm<Blog>({
    warnWhenUnsavedChanges: true,
  });
  return (
    <Edit saveButtonProps={saveButtonProps} >
      <Form {...formProps}>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[
            {
              required: true,
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          name="published"
          rules={[
            {
              required: true,
            },
          ]}
        >

          <Select
            options={[
              {
                label: "Published",
                value: "published",
              },
              {
                label: "Draft",
                value: "draft",
              },
              {
                label: "Rejected",
                value: "rejected",
              },
            ]}
          />
        </Form.Item>


      </Form>
    </Edit>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/blog")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
