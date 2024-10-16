import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import mqtt, { IClientOptions, MqttClient } from "mqtt";
import { QoS } from "mqtt-packet";

export let client: MqttClient | null = null;

export function useMqttConnection() {
    const [host, setHost] = useState("161.246.49.10");
    const [port, setPort] = useState("1883");
    const [ssl, setSsl] = useState(false);
    const [clientId, setClientId] = useState(`client_${uuidv4()}`);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [keepAlive, setKeepAlive] = useState(60);
    const [cleanSession, setCleanSession] = useState(true);
    const [lwtTopic, setLwtTopic] = useState("lwtTopic/default");
    const [lwtMessage, setLwtMessage] = useState("");
    const [lwtQos, setLwtQos] = useState<QoS>(0);
    const [lwtRetain, setLwtRetain] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (error || success) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(() => {
                    setError("");
                    setSuccess("");
                }, 500); // Wait for the transition to complete
            }, 3000); // Show the alert for 3 seconds

            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const handleConnect = () => {
        if (isConnected && client) {
            client.end();
            setIsConnected(false);
            setSuccess("Successfully disconnected from the server");
            return;
        }
        const protocol = ssl ? "wss" : "ws";
        const brokerUrl = `${protocol}://${host}:${port}`;

        const lwtOptions: IClientOptions["will"] = {
            topic: lwtTopic,
            payload: Buffer.from(lwtMessage), // Convert string to Buffer
            qos: lwtQos,
            retain: lwtRetain,
        };

        const options: IClientOptions = {
            clientId: clientId,
            keepalive: keepAlive,
            clean: cleanSession,
            username: username,
            password: password,
            will: lwtOptions,
            reconnectPeriod: 0, // Disable automatic reconnection
        };

        console.log(brokerUrl);
        console.log(options);

        setIsConnecting(true);
        const newClient = mqtt.connect(brokerUrl, options);

        newClient.on("connect", () => {
            setIsConnecting(false);
            setIsConnected(true);
            client = newClient;
            setError(""); // Clear any previous errors
            setSuccess("Successfully connected to the server");
            console.log("connected");
        });

        newClient.on("error", (error) => {
            setIsConnecting(false);
            setIsConnected(false);
            setError(`Connection error: ${error.message}`);
            console.log("error", error);
        });

        newClient.on("close", () => {
            setIsConnecting(false);
            setIsConnected(false);
            setError("");
            setSuccess("Successfully disconnected to the server");
            console.log("disconnected");
        });

        newClient.on("offline", () => {
            setIsConnecting(false);
            setIsConnected(false);
            setError("The client is offline");
            console.log("offline");
        });

        newClient.on("reconnect", () => {
            setIsConnecting(true);
            setError("Attempting to reconnect...");
            console.log("reconnecting");
        });
    };

    return {
        host, setHost, port, setPort, clientId, setClientId, username, setUsername, password, setPassword,
        keepAlive, setKeepAlive, ssl, setSsl, cleanSession, setCleanSession, lwtTopic, setLwtTopic,
        lwtMessage, setLwtMessage, lwtQos, setLwtQos, lwtRetain, setLwtRetain, isConnecting, isConnected,
        error, success, visible, handleConnect
    };
}