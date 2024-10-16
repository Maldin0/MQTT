import { useState, useCallback, useEffect, useContext } from "react";
import { client } from "../hooks/useMqttConnection";
import QoS from "mqtt-packet";
import { Message } from "../types/Message";
import MqttContext from "@/components/mqttContext";

export interface Subscription {
  color: string;
  qos: QoS.QoS;
  topic: string;
}

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const { messages, setMessages } = useContext(MqttContext)!;

  useEffect(() => {
    const savedSubscriptions = localStorage.getItem("subscriptions");
    if (savedSubscriptions) {
      setSubscriptions(JSON.parse(savedSubscriptions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
  }, [subscriptions]);

  const handleMessage = useCallback((topic: string, message: Buffer) => {
    const messageString = message.toString(); // Convert Buffer to string

    setMessages(prevMessages => {
        const subscription = subscriptions.find(sub => sub.topic === topic);
        let color = subscription?.color || '#eeeeee';

        if (!subscription) {
          // Check for wildcard subscriptions
          const wildcardSubscription = subscriptions.find(sub => {
            const wildcardIndex = sub.topic.indexOf('#');
            if (wildcardIndex === -1) return false;
            const baseTopic = sub.topic.substring(0, wildcardIndex);
            return topic.startsWith(baseTopic);
          });
          if (wildcardSubscription) {
            color = wildcardSubscription.color;
          }
        }

        const newMessage: Message = {
            topic: topic,
            payload: messageString,
            timestamp: new Date(),
            color: color,
        };
        return [...prevMessages, newMessage].slice(-100);
    });
}, [subscriptions, setMessages]);

  useEffect(() => {
    if (client) {
      client.on("message", handleMessage);
    }
    return () => {
      if (client) {
        client.off("message", handleMessage);
      }
    };
  }, [handleMessage, client]);

  const handleSubscribe = useCallback(
    (topic: string, qos: QoS.QoS, color: string) => {
      if (topic && client) {
        client.subscribe(topic, { qos }, (err) => {
          if (err) {
            console.error("Subscription error:", err);
          } else {
            setSubscriptions((prev) => [...prev, { color, qos, topic }]);
          }
        });
      }
    },
    []
  );

  const handleRemoveSubscription = useCallback(
    (subscriptionToRemove: Subscription) => {
      if (client) {
        client.unsubscribe(subscriptionToRemove.topic, (err) => {
          if (err) {
            console.error("Unsubscription error:", err);
          } else {
            setSubscriptions((prev) =>
              prev.filter((s) => s !== subscriptionToRemove)
            );
          }
        });
      }
    },
    []
  );

  return {
    subscriptions,
    messages,
    handleSubscribe,
    handleRemoveSubscription,
    handleMessage,
  };
}
