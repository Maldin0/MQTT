import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { MqttSubscriptionCard } from './mqtt-subscription-card'

export const Subscriptions = () => {
    return (
        <Accordion type="multiple" className="w-full">
            <AccordionItem value="subscriptions">
                <AccordionTrigger>
                    <a className="text-xl font-bold">Subscriptions</a>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="container mx-auto p-4 dark:border dark:border-zinc-800 dark:rounded-md">
                        <MqttSubscriptionCard />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}