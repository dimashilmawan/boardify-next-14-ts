import { CardWithList } from "@/types";

export const Header = ({ data }: { data: CardWithList }) => {
  // console.log("header");
  return <div>{data.title}</div>;
};
