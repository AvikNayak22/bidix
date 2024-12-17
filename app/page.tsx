import ItemCard from "@/components/ItemCard";
import { database } from "@/db/database";

export default async function Home() {
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold mb-8">Items for sale</h1>

      <div className="grid grid-cols-4 gap-4">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
