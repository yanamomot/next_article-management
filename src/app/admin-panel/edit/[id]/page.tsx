"use client";

import { useParams } from "next/navigation";
import { Form } from "../../../../components/Form";
import { Article } from "@/types/Article";
import { useStore } from "../../../../store/store";

const Update = () => {
  const { id } = useParams();
  const { articles } = useStore();

  const findedItem = articles.find((item) => item.id === +id);

  return (
      <Form article={findedItem} />
  );
};

export default Update;
