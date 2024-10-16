"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PublishForm } from "./PublishFrom";
import { usePublish } from "../hooks/usePublish";
import QoS from "mqtt-packet";

export const Publish = () => {
    const { publish } = usePublish();

    const handlePublish = (topic: string, message: string, qos: QoS.QoS, retain: boolean) => {
        publish(topic, message, qos, retain);
    };

    return (
        <Accordion type="multiple" className="w-full">
            <AccordionItem value="publish">
                <AccordionTrigger>
                    <a className="text-xl font-bold">Publish</a>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="container mx-auto bg-zinc-900">
                        <PublishForm onPublish={handlePublish} />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};