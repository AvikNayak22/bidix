"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemAction } from "./actions";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";

export default function CreatePage() {
  const [fileKey, setFileKey] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    // const file = formData.get("file") as File;
    const name = formData.get("name") as string;

    const startingPrice = parseInt(formData.get("startingPrice") as string);
    const startingPriceInCents = Math.floor(startingPrice * 100);

    await createItemAction({
      name,
      fileKey,
      startingPrice: startingPriceInCents,
    });
  };

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold mb-8">Post an item</h1>
      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
        onSubmit={handleSubmit}
      >
        <Input
          required
          className="max-w-lg"
          name="name"
          placeholder="Name your item"
        />
        <Input
          required
          className="max-w-lg"
          name="startingPrice"
          type="number"
          step="0.01"
          placeholder="What to start your auction at?"
        />
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            setFileKey(res[0].key);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  );
}
