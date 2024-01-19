import { QueryFunctionContext } from "@tanstack/react-query";

export const fetcher = async ({ queryKey }: QueryFunctionContext) => {
  let url = "";

  if (!queryKey[1]) throw new Error("id is undefined");

  switch (queryKey[0]) {
    case "card":
      url = `/api/cards/${queryKey[1]}`;
      break;
    case "card-logs":
      url = `/api/cards/${queryKey[1]}/logs`;
      break;
  }

  const res = await fetch(url);

  if (!res.ok) throw new Error("Something went wrong");

  const data = await res.json();

  return await data;
};
