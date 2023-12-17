import { useMutation, useQuery } from "react-query";
import {
  Column,
  IPaginationOptions,
  InfinityPaginationResultType,
} from "../types";
import { User } from "./type";
import { queryClient } from "@/pages/_app";

export async function deletePost(id: number) {
  //TODO::
  const response = await fetch(`/api/users?id=${id}`, {
    method: "DELETE",
  });
  return response.json();
}
export const useListUsers = (params: IPaginationOptions) =>
  useQuery<InfinityPaginationResultType<User>>(
    ["listUsers", params],
    async () => {
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined)
      );
      const queryParams = new URLSearchParams(filteredParams as any);
      const url = `/api/users${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      return data;
    }
  );

export const useDeleteUserMutation = () =>
  useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listUsers"] });
    },
  });
export const columns: Column<User>[] = [
  {
    name: "id",
    label: "ID",
    filed: (row) => row.id,
  },
  {
    name: "firstName",
    label: "First Name",
    filed: (row) => row.firstName,
  },
  {
    name: "lastName",
    label: "Last Name",
    filed: (row) => row.lastName,
  },
  {
    name: "email",
    label: "Email",
    filed: (row) => row.email,
  },
  {
    name: "status",
    label: "Status",
    filed: (row) => row.status,
    classes: (row) =>
      row.status === "Offline" ? "text-red-400" : "text-green-400",
  },
  {
    name: "birthday",
    label: "BirthDay",
    filed: (row) => row.birthday,
  },
  {
    name: "joinDate",
    label: "Join Date",
    filed: (row) => row.dataJoin,
  },
];
