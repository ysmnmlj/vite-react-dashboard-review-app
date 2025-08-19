import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { Building2, Info, BookOpen, Mail } from "lucide-react";
import logoDark from "../assets/theFlexlogo.png";
import logoWhite from "../assets/theFlexlogoWhite.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currency, setCurrency] = useState("£ GBP");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full transition-colors duration-300 z-50 ${
        scrolled ? "bg-[#284E4C]" : "bg-[#FCFAF6]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between h-20 items-center">
          <a
            href="https://theflex.global/"
            className="flex items-center space-x-2"
          >
            <img
              src={scrolled ? logoWhite : logoDark}
              alt="The Flex"
              className="h-8 w-auto"
            />
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton
                className={`flex items-center gap-1 font-medium ${
                  scrolled ? "text-white" : "text-gray-700"
                }`}
              >
                <Building2 className="w-4 h-4" /> Landlords
              </MenuButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute mt-2 w-40 origin-top-left bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem>
                    <span className="block px-4 py-2 text-sm">🇬🇧 London</span>
                  </MenuItem>
                  <MenuItem>
                    <span className="block px-4 py-2 text-sm">🇫🇷 Paris</span>
                  </MenuItem>
                  <MenuItem>
                    <span className="block px-4 py-2 text-sm">🇩🇿 Algiers</span>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>

            <a
              href="/about-us"
              className={`flex items-center gap-1 font-medium ${
                scrolled ? "text-white" : "text-gray-700"
              }`}
            >
              <Info className="w-4 h-4" /> About Us
            </a>

            <a
              href="/careers"
              className={`flex items-center gap-1 font-medium ${
                scrolled ? "text-white" : "text-gray-700"
              }`}
            >
              <BookOpen className="w-4 h-4" /> Careers
            </a>

            <a
              href="/contact"
              className={`flex items-center gap-1 font-medium ${
                scrolled ? "text-white" : "text-gray-700"
              }`}
            >
              <Mail className="w-4 h-4" /> Contact
            </a>

            <button
              className={`text-sm font-medium ${
                scrolled ? "text-white" : "text-gray-700"
              }`}
            >
              EN English
            </button>

            <Menu as="div" className="relative inline-block text-left">
              <MenuButton
                className={`flex items-center gap-1 font-medium ${
                  scrolled ? "text-white" : "text-gray-700"
                }`}
              >
                <a className="w-4 h-4" /> {currency}
              </MenuButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute mt-2 w-32 origin-top-right bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => setCurrency("$ USD")}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        $ USD
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => setCurrency("€ EUR")}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        € EUR
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => setCurrency("£ GBP")}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        £ GBP
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}
