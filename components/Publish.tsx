"use client"
import { useState } from "react"
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

export const Publish = () => {
    const [selectedValue, setSelectedValue] = useState("2");

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
                            <Input type="text" id="topic" />
                        </div>
                        <div className="col-span-1">
                            <Label>QoS</Label>
                            <Select value={selectedValue} onValueChange={(e)=>setSelectedValue(e)}>
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
                            <Input className="w-5 h-5 m-2" type="checkbox" id="retain" />
                        </div>
                        <div className="col-span-1 flex justify-center items-center">
                            <Button className="bg-blue-500 hover:bg-blue-600">Publish</Button>
                        </div>
                        <div className="col-span-9">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" />
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