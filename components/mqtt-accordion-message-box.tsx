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
import { useSubscriptions } from "../hooks/useMqttSubscription";
import { client } from "../hooks/useMqttConnection";
import MqttContext from "./mqttContext";

export function MqttAccordionMessageBox() {
    const { messages } = useContext(MqttContext)!;

    useEffect(() => {
        if (client) {
            client.on('message', (topic, message) => {
                console.log("MQTT Message Received in Hook:", topic, message.toString()); 
                // ... rest of your handleMessage logic 
            });
        }
        // ... cleanup logic
    }, [client]);


    useEffect(() => {
        console.log("Component Updated Messages:", messages);
    }, [messages]);

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="messages">
                <AccordionTrigger className="text-xl font-bold">Messages</AccordionTrigger>
                <AccordionContent>
                    <Card className="w-full bg-white dark:bg-gray-800">
                        <CardContent className="p-4">
                            <h2 className="text-xl font-semibold mb-4">MQTT Messages</h2>
                            <ScrollArea className="h-[300px] w-full rounded-md border">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className="mb-2 rounded-lg p-2"
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