import Link from "next/link";
import { mock } from "node:test";

const mockUrls = [
  "https://utfs.io/f/4c5ed905-fb31-46aa-909f-a29a84d5c9f7-z7psj.jpg",
  "https://utfs.io/f/fb2b4e90-5f66-44df-bcff-9e82dbfacf2b-gsemay.jpg",
  "https://utfs.io/f/ea140215-841a-4f06-acb1-013e028559b9-5fuwof.jpg",
  "https://utfs.io/f/89f2f4f5-4573-462d-be99-023ca382f548-4f2rrm.jpg" 
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-wrap gap-4">{ [...mockImages, ...mockImages, ...mockImages].map((image) => (
        <div key={image.id} className="w-48">
          <img src={image.url} />
          </div>
        ))}
        </div>

      Hello (gallery in progress)
    </main>
  );
}
