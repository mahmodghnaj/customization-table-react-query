import Delete from "@/components/svg/Delete";
import Table from "@/components/table";
import { TableAction } from "@/service/types";
import { columns, useDeleteUserMutation, useListUsers } from "@/service/users";
import { User } from "@/service/users/type";
import { useRef } from "react";

export default function Home() {
  const refTable = useRef(null);
  const { mutate: deleteUser } = useDeleteUserMutation();
  const actions: TableAction<User>[] = [
    {
      name: "delete",
      icon: <Delete />,
      handler: (row) => deleteUser(row.id),
    },
  ];
  return (
    <>
      <div className="flex items-center justify-center  w-full h-full flex-col">
        <div className="mx-10  mt-10 overflow-hidden">
          <Table
            className="h-5/6"
            columns={columns}
            actions={actions}
            fetchQuery={useListUsers}
            stickyActions
            syncRoute
            ref={refTable}
          ></Table>
        </div>
      </div>
    </>
  );
}
