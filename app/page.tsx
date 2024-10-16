import { Navbar } from "@/components/Navbar";
import { Connection } from "@/components/Connection";
import { Publish } from "@/components/Publish";
import { Subscriptions } from "@/components/Subscriptions";
import { MqttAccordionMessageBox } from "@/components/mqtt-accordion-message-box";
import { MqttProvider } from "@/components/mqttContext";
export default function Home() {
  return (
    <MqttProvider>
      <div className="flex flex-col min-h-scree">
        <Navbar />
        <div className="sm:w-screen md:w-2/3 self-center">
          <Connection />
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <div className="col-span-2">
              <Publish />
              <div className="md:p-4">
                <MqttAccordionMessageBox />
              </div>
            </div>
            <div className="col-span-1">
              <Subscriptions />
            </div>
          </div>
        </div>
      </div>
    </MqttProvider>
  );
}
