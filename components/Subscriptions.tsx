import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export const Subscriptions = () => {
    return (
        <Accordion type="multiple" className="w-full">
            <AccordionItem value="subscriptions">
                <AccordionTrigger>
                <a className="text-xl font-bold">Subscriptions</a>
                </AccordionTrigger>
                <AccordionContent>
                    Nuh uh
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}