"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, AlertCircle, CheckCircle} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import mqtt, { IClientOptions, MqttClient, QoS } from "mqtt";
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

  

export const Connection = () => {
    const [host, setHost] = useState("");
    const [port, setPort] = useState("");
    const [ssl, setSsl] = useState(false);
    const [clientId, setClientId] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [keepAlive, setKeepAlive] = useState(60);
    const [cleanSession, setCleanSession] = useState(true);
    const [lwtTopic, setLwtTopic] = useState("");
    const [lwtMessage, setLwtMessage] = useState("");
    const [lwtQos, setLwtQos] = useState<QoS>(0);
    const [lwtRetain, setLwtRetain] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [client, setClient] = useState<MqttClient|null>(null);
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
    
        const protocol = ssl ? 'wss' : 'ws';
        const brokerUrl = `${protocol}://${host}:${port}`;
    
        const lwtOptions = {
            topic: lwtTopic,
            payload: Buffer.from(lwtMessage),
            qos: lwtQos,
            retain: lwtRetain
        };
    
        const options: IClientOptions = {
            clientId: clientId,
            keepalive: keepAlive,
            clean: cleanSession,
            username: username,
            password: password,
            will: lwtOptions
        };
        try {
            setIsConnecting(true);
            const newClient = mqtt.connect(brokerUrl, options);
            newClient.on("connect", () => {
                setIsConnecting(false);
                setIsConnected(true);
                setClient(newClient);
                setError(""); // Clear any previous errors
                setSuccess("Successfully connected to the server");
                console.log("connected");
            });
        } catch (error) {
            client?.on("error", (error) => {
                setIsConnecting(false);
                setIsConnected(false);
            });
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error));
            }
            console.log("error", error);

            client?.on("close", () => {
                setIsConnected(false);
                setIsConnecting(false);
                setError("The connection has been closed by the server");
                console.log("disconnected");
            });
        }
      };

    return (
        <Accordion type="multiple" className="w-full">
            <AccordionItem value="connection">
                <AccordionTrigger>
                <div className="flex items-center space-x-2">
                    <a className="text-xl font-bold flex-grow">
                        Connection
                    </a>
                    {isConnecting ? (
                    <>
                        <Loader2 className="ml-2 w-3 h-3 animate-spin" />
                    </>
                    ) : isConnected ? (
                        <span className="ml-2 w-3 h-3 bg-green-500 rounded-full"></span>
                    ) : (
                        <span className="ml-2 w-3 h-3 bg-red-500 rounded-full"></span>
                    )}
                </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="grid grid-cols-9 gap-4 p-4">
                        <div className=" col-span-4">
                            <Label htmlFor="host">Host</Label>
                            <Input type="url" id="host" value={host} onChange={(e) => setHost(e.target.value)}/>
                        </div>
                        <div className=" col-span-1">
                            <Label htmlFor="port">Port</Label>
                            <Input type="number" id="port" value={port} onChange={(e) => setPort(e.target.value)}/>
                        </div>
                        <div className="col-span-3">
                            <Label htmlFor="clientID">ClientID</Label>
                            <Input type="text" id="clientID" value={clientId} onChange={(e) => setClientId(e.target.value)}/>
                        </div>
                        <div className="col-span-1 flex justify-center items-center">
                        <Button
                            variant={isConnected ? "destructive" : "default"}
                            onClick={handleConnect}
                            disabled={isConnecting}
                            >
                            {isConnecting ? (
                                <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                                </>
                            ) : isConnected ? (
                                "Disconnect"
                            ) : (
                                "Connect"
                            )}
                        </Button>
                        </div>
                        <div className="col-span-3">
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="col-span-3">
                            <Label htmlFor="password">Password</Label>
                            <Input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="col-span-1">
                            <Label htmlFor="keepAlive">Keep Alive</Label>
                            <Input type="number" id="keepAlive" value={keepAlive} onChange={(e) => setKeepAlive(parseInt(e.target.value))}/>
                        </div>
                        <div className="col-span-1">
                            <Label htmlFor="ssl">SSL</Label>
                            <Input className="w-5 h-5 m-2" type="checkbox" id="ssl" checked={ssl} onChange={(e) => setSsl(e.target.checked)}/>
                        </div>
                        <div className="col-span-1">
                            <Label htmlFor="cleanSession">Clean Session</Label>
                            <Input className="w-5 h-5 m-2" type="checkbox" id="cleanSession" checked={cleanSession} onChange={(e) => setCleanSession(e.target.checked)}/>
                        </div>
                        <div className="col-span-7">
                            <Label htmlFor="lwtTopic">Last-Will Topic</Label>
                            <Input type="text" id="lwtTopic" value={lwtTopic} onChange={(e) => setLwtTopic(e.target.value)}/>
                        </div>
                        <div className="col-span-1">
                            <Label>Last-Will QoS</Label>
                            <Select value={lwtQos} onValueChange={(e)=>setLwtQos(e)}>
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
                            <Label htmlFor="lwtRetain">Last-Will Retain</Label>
                            <Input className="w-5 h-5 m-2" type="checkbox" id="lwtRetain" />
                        </div>
                        <div className="col-span-9">
                            <Label htmlFor="lwtMessage">Last-Will Message</Label>
                            <Textarea id="lwtMessage" value={lwtMessage} onChange={(e) => setLwtMessage(e.target.value)}/>
                        </div>
                    </div>
                    
                </AccordionContent>
            </AccordionItem>
            {error && (
                <div
                className={`fixed bottom-0 left-0 w-full transition-opacity duration-500 ${
                    visible ? "opacity-100" : "opacity-0"
                }`}
                >
                <Alert variant="destructive" className="mt-4 bg-red-100 border border-red-400 text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="font-bold">Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                </div>
            )}
            {isConnected && (
                <div
                className={`fixed bottom-0 left-0 w-full transition-opacity duration-500 ${
                    visible ? "opacity-100" : "opacity-0"
                }`}
                >
                <Alert variant="default" className="mt-4 bg-green-100 border border-green-400 text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle className="font-bold">Success</AlertTitle>
                    <AlertDescription>Successfully connected to the server</AlertDescription>
                </Alert>
                </div>
            )}
        </Accordion>
    )
}