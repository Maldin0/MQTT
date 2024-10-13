import { client } from './useMqttConnection';
import QoS from "mqtt-packet";

export function usePublish() {
    const publish = (topic: string, message: string, qos: QoS.QoS, retain: boolean) => {
        if (client) {
            const options = {
                qos: qos,
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
            console.error("MQTT client is not connected");
        }
    };

    return { publish };
}