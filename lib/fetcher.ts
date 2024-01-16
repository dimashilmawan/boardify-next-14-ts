import { QueryFunctionContext } from "@tanstack/react-query";

export const fetcher = async ({ queryKey }: QueryFunctionContext) => {
  if (!queryKey[1]) throw new Error("id is undefined");

  const res = await fetch(`/api/cards/${queryKey[1]}`);

  if (!res.ok) throw new Error("Something went wrong");

  const data = await res.json();

  return await data;
};
