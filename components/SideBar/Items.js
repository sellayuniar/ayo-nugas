import Link from "next/link";
import { dataSidebarLink } from "@/data/dataSidebarLink";
import { useStateContext } from "@/context/ContextProvider";

const style = {
  active: `font-normal mx-4 text-sm text-blue-600`,
  inactive: `font-light mx-4 text-sm text-gray-900`,
  link: `inline-flex items-center justify-start my-1 p-3 text-black`,
};

const SidebarNavItems = () => {
  return (
    <ul className="mt-6 md:pl-6">
      <li>
        {dataSidebarLink.map((item) => (
          <Link href={item.slug} className="my-10 flex" key={item.id}>
            <span>{item.icon}</span>
            <span className="pl-3">{item.title}</span>
          </Link>
        ))}
      </li>
    </ul>
  );
};

export default SidebarNavItems;
