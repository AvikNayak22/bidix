import { Item } from "@/db/schema";
import { getImageUrl } from "@/utils/files";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const ItemCard = ({ item }: { item: Item }) => {
  return (
    <div key={item.id} className="border p-8 rounded-xl space-y-2">
      <Image
        src={getImageUrl(item.fileKey)}
        alt={item.name}
        width={200}
        height={200}
      />
      <h2 className="text-xl font-bold ">{item.name}</h2>
      <p className="text-lg ">startingPrice: {item.startingPrice / 100}</p>

      <Button asChild>
        <Link href={`/bid/${item.id}`}>Place Bid</Link>
      </Button>
    </div>
  );
};
export default ItemCard;
