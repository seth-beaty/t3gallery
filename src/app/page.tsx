import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/db/queries";

export const dynamic = "force-dynamic";

async function Images({}) { 

const images = await getMyImages();

  return ( 
  <div className="flex flex-wrap gap-4">
    { images.map((image) => (
    <div key={image.id} className=" flex w-48 flex-col">
      <img src={image.url} />
      <div>{image.name}</div>
      </div>
    ))}
    </div>)
}

export default async function HomePage() {

  
  
  return (
    <main>
      <SignedOut>
        <div className="w-full h-full text-2xl text-center">Please sign in above</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
     
    </main>
  );
}
