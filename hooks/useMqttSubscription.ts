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
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const savedSubscriptions = localStorage.getItem('subscriptions');
        if (savedSubscriptions) {
            setSubscriptions(JSON.parse(savedSubscriptions));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }, [subscriptions]);

    const handleMessage = useCallback((topic: string, message: Buffer) => {
        console.log("Message received:", topic, message.toString());
        const newMessage: Message = {
            topic: topic,
            payload: message.toString(),
            timestamp: new Date(),
            color: subscriptions.find(sub => sub.topic === topic)?.color || 'white',
        };
        setMessages(prevMessages => [...prevMessages, newMessage].slice(-100));
    }, [subscriptions]);

    useEffect(() => {
        if (client) {
            client.on('message', handleMessage);
        }
        return () => {
            if (client) {
                client.off('message', handleMessage);
            }
        };
    }, [handleMessage]);

    const handleSubscribe = useCallback((topic: string, qos: QoS.QoS, color: string) => {
        if (topic && client) {
            client.subscribe(topic, { qos }, (err) => {
                if (err) {
                    console.error("Subscription error:", err);
                } else {
                    setSubscriptions(prev => [...prev, { color, qos, topic }]);
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
        handleMessage, // Export handleMessage
    };
}