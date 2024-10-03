"use client"
import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import QoS from "mqtt-packet";
import { client } from './Connection';

export const Publish = () => {
    const [selectedValue, setSelectedValue] = useState<QoS.QoS>(2);
    const [retain, setRetain] = useState(false);
    const [topic, setTopic] = useState("");
    const [message, setMessage] = useState("");

    const handlePublish = () => {
        if (client) {
            const options = {
                qos: selectedValue,
                retain: retain
            };
            client.publish(topic, message, options, (error) => {
                if (error) {
                    console.error("Publish error:", error);
                } else {
                    console.log("Message published successfully");
                }
            });
        } else {
            console.error("Client is not connected");
        }
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRetain(event.target.checked);

    };
    return (
        <Accordion type="multiple" className="w-full">
            <AccordionItem value="publish">
                <AccordionTrigger>
                    <a className="text-xl font-bold">Publish</a>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="grid grid-cols-9 gap-4 p-4">
                        <div className="col-span-6">
                            <Label htmlFor="topic">Topic</Label>
                            <Input type="text" id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
                        </div>
                        <div className="col-span-1">
                            <Label>QoS</Label>
                            <Select value={selectedValue.toString()} onValueChange={(e) => setSelectedValue(e as unknown as QoS.QoS)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="QoS" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">0</SelectItem>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="col-span-1">
                            <Label htmlFor="retain">Retain</Label>
                            <Input className="w-5 h-5 m-2" type="checkbox" id="retain" checked={retain} onChange={handleCheckboxChange} />
                        </div>
                        <div className="col-span-1 flex justify-center items-center">
                            <Button className="bg-blue-500 hover:bg-blue-600" onClick={handlePublish}>Publish</Button>
                        </div>
                        <div className="col-span-9">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Messages">
                <AccordionTrigger>
                    <a className="text-xl font-bold">Messages</a>
                </AccordionTrigger>
                <AccordionContent>
                    Nuh uh
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}