import { Navbar } from "@/components/Navbar";
import { Connection } from "@/components/Connection";
import { Publish } from "@/components/Publish";
import { Subscriptions } from "@/components/Subscriptions";
import { MqttAccordionMessageBox } from "@/components/mqtt-accordion-message-box";
import { MqttProvider } from "@/components/mqttContext";
import { Footer } from "@/components/Footer";
export default function Home() {
  return (
    <MqttProvider>
      <div className="flex flex-col">
        <Navbar />
        <div className="w-full h-[50px]"></div>
        <div className="max-w-screen-xl w-full xl:px-0 px-8 self-center min-h-[65vh]">
          <Connection />
          <div className="grid md:grid-cols-3 grid-cols-1 md:gap-x-4">
            <div className="col-span-2">
              <Publish />
              <div className="mt-6"></div>
              <div>
                <MqttAccordionMessageBox />
              </div>
            </div>
            <div className="col-span-1">
              <Subscriptions />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </MqttProvider>
  );
}
