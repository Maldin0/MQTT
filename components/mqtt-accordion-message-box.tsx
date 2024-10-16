"use client"

import { useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import MqttContext from "./mqttContext";

function isColorLight(color: string): boolean {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000
    return brightness > 155
}

export function MqttAccordionMessageBox() {
    const { messages } = useContext(MqttContext)!;

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="messages">
                <AccordionTrigger className="text-xl font-bold">Messages</AccordionTrigger>
                <AccordionContent>
                    <Card className="w-full dark:border dark:border-zinc-800 dark:rounded-md">
                        <CardContent className="p-4">
                            <h2 className="text-xl font-semibold mb-4 dark:text-white">MQTT Messages</h2>
                            <ScrollArea className="h-[400px] w-full dark:bg-zinc-950 rounded-md flex flex-col gap-y-4">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg p-2 m-2"
                                        style={{ backgroundColor: message.color, color: isColorLight(message.color) ? 'black' : 'white' }}
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