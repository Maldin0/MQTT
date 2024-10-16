"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { QoS } from "mqtt-packet/types";
import { useSubscriptions, Subscription } from "../hooks/useMqttSubscription";

function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function MqttSubscriptionCard() {
    const [color, setColor] = useState(getRandomColor());
    const [qos, setQos] = useState<QoS>(2);
    const [topic, setTopic] = useState("");
    const { subscriptions, handleSubscribe, handleRemoveSubscription } = useSubscriptions();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubscribeClick = () => {
        handleSubscribe(topic, qos, color);
        setTopic("");
        setColor(getRandomColor());
    };

    useEffect(() => {
        console.log(subscriptions);
    }, [subscriptions])

    if (!mounted) return null;

    return (
        <Card className="w-full max-w-md dark:border-zinc-800 dark:text-white rounded-sm">
            <CardHeader>
                <CardTitle className="text-2xl">MQTT Subscription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="color-picker">Color</Label>
                    <div className="flex items-center space-x-2 flex-shrink-0 hover:">
                        <Input
                            id="color-picker"
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="h-10 w-15 p-0 border-0 appearance-none hover:cursor-pointer"
                            style={{ backgroundColor: color }}
                        />
                        <Input
                            type="text"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="max-w-full"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Input
                        id="topic"
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="space-y-2">
                    <Label>QoS</Label>
                    <Select value={qos.toString()} onValueChange={(e) => setQos(Number(e) as QoS)}>
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
                <Button onClick={handleSubscribeClick} className="bg-blue-500 hover:bg-blue-600">
                    Subscribe
                </Button>
                <div className="space-y-4">
                    {subscriptions.map((sub, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex items-center space-x-2">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: sub.color }}
                                />
                                <span className="select-all">{sub.topic}</span>
                            </div>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRemoveSubscription(sub)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export { useSubscriptions };
