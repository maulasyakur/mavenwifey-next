import Image from "next/image";
import Link from "next/link";
import BlogIcon from "@/assets/blog.png";
import ContactIcon from "@/assets/contact.png";
import GuestBookIcon from "@/assets/guest-book.png";
import ChatRoomIcon from "@/assets/chat-room.png";
import PhotoAlbumIcon from "@/assets/photo-album.png";
import AboutMeIcon from "@/assets/about-me.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const apps = [
  { icon: BlogIcon, name: "Blog", url: "/blog" },
  {
    icon: ContactIcon,
    name: "Socials & Contact",
    url: "/socials-contact",
  },
  { icon: GuestBookIcon, name: "Guest Book", url: "/guest-book" },
  { icon: ChatRoomIcon, name: "Chat Room", url: "/chat-room" },
  { icon: PhotoAlbumIcon, name: "Photo Album", url: "/photo-album" },
  { icon: AboutMeIcon, name: "About Me", url: "/about-me" },
];

export default function Home() {
  return (
    <div className="p-2 flex flex-col h-screen-header">
      {/* app grid */}
      <ul className="grid grid-cols-4 gap-4 justify-items-center">
        {apps.map((item, index) => {
          return (
            <AppIcon
              icon={item.icon}
              name={item.name}
              key={index}
              url={item.url}
            />
          );
        })}
      </ul>

      {/* dock */}
      <ul className="bg-neutral-300/40 grid grid-cols-4 gap-4 justify-items-center rounded-2xl mt-auto">
        {apps
          .filter((app) =>
            ["Blog", "Socials & Contact", "Guest Book", "Chat Room"].includes(
              app.name,
            ),
          )
          .map((item, index) => {
            return (
              <AppIcon
                icon={item.icon}
                name={item.name}
                key={index}
                url={item.url}
              />
            );
          })}
      </ul>
    </div>
  );
}

function AppIcon({
  icon,
  name,
  url,
}: {
  icon: StaticImport;
  name: string;
  url: string;
}) {
  return (
    <li>
      <Link href={url} className="flex flex-col items-center p-2">
        <Image
          src={icon}
          alt={`${name} icon`}
          className="pixel-art object-cover w-20 h-20"
        />
        <p className="text-center text-xs capitalize">{name}</p>
      </Link>
    </li>
  );
}
