import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { CoreAreas } from "@/components/sections/CoreAreas";
import { Specialties } from "@/components/sections/Specialties";
import { Markets } from "@/components/sections/Markets";
import { Process } from "@/components/sections/Process";
import { Apply } from "@/components/sections/Apply";
import { Contact } from "@/components/sections/Contact";
import { ActionBar } from "@/components/sections/ActionBar";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <CoreAreas />
      <About />
      <Stats />
      <Specialties />
      <Markets />
      <Process />
      <Apply />
      <Contact />
      <ActionBar />
    </>
  );
}
