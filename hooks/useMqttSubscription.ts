import { useState, useCallback, useEffect } from "react";
import { client } from '../hooks/useMqttConnection';
import QoS from "mqtt-packet";
import { Message } from "../types/Message";

export interface Subscription {
    color: string;
    qos: QoS.QoS;
    topic: string;
}

export function useSubscriptions() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
        // Load subscriptions from local storage
        const savedSubscriptions = localStorage.getItem('subscriptions');
        return savedSubscriptions ? JSON.parse(savedSubscriptions) : [];
    });

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        // Save subscriptions to local storage whenever they change
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }, [subscriptions]);

    const handleSubscribe = useCallback((topic: string, qos: QoS.QoS, color: string) => {
        if (topic && client) {
            client.subscribe(topic, { qos }, (err) => {
                if (err) {
                    console.error("Subscription error:", err);
                } else {
                    setSubscriptions(prev => [...prev, { color, qos, topic }]);
                    // Set up message listener
                    const handleMessage = (topic: string, message: Buffer) => {
                        const newMessage: Message = {
                            topic: topic,
                            payload: message.toString(),
                            timestamp: new Date(),
                            color: color,
                        };
                        console.log("Received message:", newMessage); // Log the message to the console
                        setMessages(prevMessages => [...prevMessages, newMessage].slice(-100)); // Keep last 100 messages
                    };
                    client?.on('message', handleMessage);
                }
            });
        }
    }, []);

    const handleRemoveSubscription = useCallback((subscriptionToRemove: Subscription) => {
        if (client) {
            client.unsubscribe(subscriptionToRemove.topic, (err) => {
                if (err) {
                    console.error("Unsubscription error:", err);
                } else {
                    setSubscriptions(prev => prev.filter(s => s !== subscriptionToRemove));
                }
            });
        }
    }, []);

    return {
        subscriptions,
        messages,
        handleSubscribe,
        handleRemoveSubscription,
    };
}