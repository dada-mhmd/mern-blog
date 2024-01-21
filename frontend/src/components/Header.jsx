/* eslint-disable react/no-unescaped-entities */
import { Link, useLocation } from "react-router-dom";
import { Button, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
const Header = () => {
  const { pathname } = useLocation();

  return (
    <Navbar className="border-b-2">
      {/* logo */}
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white"
      >
        <span className="text-white px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Dada's
        </span>
        Blog
      </Link>
      {/* end logo */}

      {/* search form */}
      <form>
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      {/* end search form */}

      {/* search btn in medium screens and below */}
      <Button className="w-12 h-10 lg:hidden" pill color="gray">
        <AiOutlineSearch />
      </Button>
      {/* search btn in medium screens and below */}

      {/* toggle theme btn and hamburger btn */}
      <div className="flex items-center gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button outline gradientDuoTone="purpleToBlue">
            Sign In
          </Button>
        </Link>

        <Navbar.Toggle />
      </div>
      {/* toggle theme btn and hamburger btn */}

      {/* collapse */}
      <Navbar.Collapse>
        <Navbar.Link active={pathname === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>

        <Navbar.Link active={pathname === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={pathname === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
