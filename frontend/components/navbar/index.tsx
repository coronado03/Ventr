import {
  FaHouse,
  FaUser,
  FaClipboardList,
  FaAddressCard,
} from "react-icons/fa6";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed flex flex-col bg-blue-200 w-14 h-screen">
      <h1 className="font-bold mx-auto">Ventr</h1>
      <SideBarIcon icon={<FaHouse />} text="Home" link="/" />
      <SideBarIcon icon={<FaAddressCard />} text="Resumes" link="/resumes" />
      <SideBarIcon
        icon={<FaClipboardList />}
        text="Applications"
        link="/applications"
      />
      <div className="mt-auto">
        <SideBarIcon icon={<FaUser />} text="Account" link="/account" />
      </div>
    </nav>
  );
}
const SideBarIcon = ({
  icon = <FaHouse />,
  text = "tooltip 💡",
  link = "/",
}) => (
  <Link href={link}>
    <div className="sidebar-item group">
      {icon}

      <span className="group-hover:scale-100 tooltip">{text}</span>
    </div>
  </Link>
);
