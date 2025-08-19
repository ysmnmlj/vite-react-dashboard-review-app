import Navbar from "./Navbar";
// import HeroSection from "./HeroSection";
import WelcomeHero from "./WelcomeHero";
import heroImg from "../assets/welcomehero.jpg";

import Footer from "./Footer";

import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF6]">
      <Navbar />
      {/* <HeroSection /> */}
      <WelcomeHero
        imageUrl={heroImg}
        title={`Redefining 'Home'`}
        text={`At The Flex, we believe 'home' should never limit your possibilities. We exist to redefine how people travel, live and work with solutions that prioritise freedom, adaptability, and flexibility. Driven by genuine care and innovative thinking, we provide flexible accommodations that empower you to embrace life's changes.`}
      />
      <main className="bg-[#FFFDF6]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
