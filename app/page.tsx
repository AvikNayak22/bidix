import { auth } from "@/auth";
import SignIn from "@/components/SignIn";
import { SignOut } from "@/components/SignOut";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const session = await auth();

  const allItems = await database.query.items.findMany();

  if (!session) return null;

  const user = session.user;

  if (!user) return null;

  return (
    <div>
      <main className="container mx-auto py-12">
        {session ? <SignOut /> : <SignIn />}

        {session?.user?.name}
        <form
          action={async (formData: FormData) => {
            "use server";

            await database.insert(items).values({
              name: formData.get("name") as string,
              userId: user.id,
            });

            revalidatePath("/");
          }}
        >
          <Input name="name" placeholder="Name your item" />
          <Button type="submit">Post Item</Button>
        </form>

        {allItems.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </main>
    </div>
  );
}
