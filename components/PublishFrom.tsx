import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QoS } from "mqtt-packet";

interface PublishFormProps {
    onPublish: (topic: string, message: string, qos: QoS, retain: boolean) => void;
}

export const PublishForm: React.FC<PublishFormProps> = ({ onPublish }) => {
    const [selectedValue, setSelectedValue] = useState<QoS>(2);
    const [retain, setRetain] = useState(false);
    const [topic, setTopic] = useState("");
    const [message, setMessage] = useState("");

    const handlePublishClick = () => {
        onPublish(topic, message, selectedValue, retain);
        setMessage("");
    };

    return (
        <div className="grid grid-cols-9 gap-4 p-8">
            <div className="space-y-2 col-span-6">
                <Label htmlFor="topic">Topic</Label>
                <Input
                    id="topic"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full"
                />
            </div>
            <div className="space-y-2 col-span-1">
                <Label>QoS</Label>
                <Select value={selectedValue.toString()} onValueChange={(e) => setSelectedValue(Number(e) as QoS)}>
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
                <Input
                    id="retain"
                    type="checkbox"
                    checked={retain}
                    onChange={(e) => setRetain(e.target.checked)}
                    className="w-5 h-5 m-2"
                />
            </div>
            <div className="col-span-1 flex justify-center items-center">
            <Button onClick={handlePublishClick} className="bg-blue-500 hover:bg-blue-600">
                Publish
            </Button>
            </div>
            <div className="space-y-2 col-span-9">
                <Label htmlFor="message">Message</Label>
                <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full"
                />
            </div>
        </div>
        
    );
};
