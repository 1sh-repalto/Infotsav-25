import { useState } from "react";
import managerialEvents from "@/Constants/Events/ManagerialEvents.json";
import roboticsEvents from "@/Constants/Events/RoboticsEvents.json";
import Domain from "@/Components/EventsPage/Domain";
import Hero from "@/Components/EventsPage/Hero-Events";
import Footer from "@/Components/Other/Footer";
import { FlagshipEventsCarousel } from "@/Components/EventsPage/FlagshipEventsCarousel";

// Extend the Window interface to include __DOMAIN_EVENTS__
declare global {
  interface Window {
    __DOMAIN_EVENTS__?: any;
  }
}

const domainJsons = [
  { domainName: "Managerial Events", events: managerialEvents },
  { domainName: "Robotics Events", events: roboticsEvents },
];

const EventsPage = () => {
  // State for each domain's current card index
  const [currentSection] = useState("technical");
  const [domainIndices, setDomainIndices] = useState(domainJsons.map(() => 0));

  // Setter for a specific domain index
  const setDomainIndex = (domainIdx: number, cardIdx: number) => {
    setDomainIndices((prev) => {
      const updated = [...prev];
      updated[domainIdx] = cardIdx;
      return updated;
    });
  };

  // Expose domain events for navigation
  // @ts-ignore
  if (typeof window !== "undefined") {
    window.__DOMAIN_EVENTS__ = domainJsons.map((domain) => domain.events);
  }

  return (
    <div>
      <Hero />
      <div className="h-auto w-full py-10 md:py-30 px-[8vw] space-y-15 md:space-y-40">
        {/* Flagship Events Section */}
        <h2 className="w-full font-cattedrale text-[6vw] md:text-[5vw] lg:text-7xl text-center text-white drop-shadow-2xl tracking-wide mb-4">
          FEATURED EVENTS
        </h2>
        <section className="flex-1 flex items-start justify-center pt-20">
          <div className="w-full">
            <FlagshipEventsCarousel currentSection={currentSection} />
          </div>
        </section>

        {domainJsons.map((domain, idx) => (
          <Domain
            key={idx}
            domainName={domain.domainName}
            cards={domain.events.map((event: any) => ({
              title: event.name,
              description: event.about,
            }))}
            currentIndex={domainIndices[idx]}
            setCurrentIndex={(cardIdx: number) => setDomainIndex(idx, cardIdx)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;
