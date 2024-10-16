"use client"

import { useContext, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import MqttContext from "./mqttContext";

export function MqttAccordionMessageBox() {
    const { messages } = useContext(MqttContext)!;

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="messages">
                <AccordionTrigger className="text-xl font-bold">Messages</AccordionTrigger>
                <AccordionContent>
                    <Card className="w-full bg-zinc-900 border-none rounded-sm">
                        <CardContent className="p-4">
                            <h2 className="text-xl font-semibold mb-4 text-white">MQTT Messages</h2>
                            <ScrollArea className="h-[400px] w-full bg-zinc-950 border border-zinc-600 rounded-md flex flex-col gap-y-4">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg p-2"
                                        style={{ backgroundColor: message.color, color: message.color.startsWith('#fff') ? 'black' : 'white' }}
                                    >
                                        <div className="font-bold">{message.topic}</div>
                                        <div>{message.payload}</div>
                                        <div className="text-xs opacity-75">{message.timestamp.toLocaleString()}</div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}