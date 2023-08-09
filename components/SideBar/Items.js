import Link from "next/link";
import { dataSidebarLink } from "@/data/dataSidebarLink";
import { useRouter } from "next/router";

const style = {
  active: `font-normal mx-4 text-sm text-blue-600`,
  inactive: `font-light mx-4 text-sm text-gray-900`,
  link: `inline-flex items-center justify-start my-1 p-3 text-black`,
};

const SidebarNavItems = () => {
  const router = useRouter();

  return (
    <ul className="mt-6 px-5 lg:px-2">
      <li>
        {dataSidebarLink.map((item) => (
          <Link
            href={item.slug}
            className={`${
              router.pathname === item.slug
                ? "bg-[#F05050] text-white  shadow-lg"
                : ""
            } my-7 mr-2 flex items-center rounded-full px-4 py-2.5 text-[#404040]`}
            key={item.id}
          >
            <span className="h-8 w-8">
              {router.pathname === item.slug ? item.iconActive : item.icon}
            </span>
            <span className="pl-2 font-medium">{item.title}</span>
          </Link>
        ))}
      </li>
    </ul>
  );
};

export default SidebarNavItems;
