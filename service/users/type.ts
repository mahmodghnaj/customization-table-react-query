export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  dataJoin: string;
  status: "Online" | "Offline";
};
export type InfinityPaginationResultType<T> = {
  data: T[];
  total?: number;
};
