"use client";
import { useState } from "react";

export const ClientComponent = () => {
  const [first, setfirst] = useState("dimas");
  return <div>{first}</div>;
};
