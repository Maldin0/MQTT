import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { QoS } from "mqtt-packet";

interface ConnectionFormProps {
    host: string;
    setHost: (value: string) => void;
    port: string;
    setPort: (value: string) => void;
    clientId: string;
    setClientId: (value: string) => void;
    username: string;
    setUsername: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    keepAlive: number;
    setKeepAlive: (value: number) => void;
    ssl: boolean;
    setSsl: (value: boolean) => void;
    cleanSession: boolean;
    setCleanSession: (value: boolean) => void;
    lwtTopic: string;
    setLwtTopic: (value: string) => void;
    lwtMessage: string;
    setLwtMessage: (value: string) => void;
    lwtQos: QoS;
    setLwtQos: (value: QoS) => void;
    lwtRetain: boolean;
    setLwtRetain: (value: boolean) => void;
    isConnecting: boolean;
    isConnected: boolean;
    handleConnect: () => void;
}

export const ConnectionForm: React.FC<ConnectionFormProps> = ({
    host, setHost, port, setPort, clientId, setClientId, username, setUsername, password, setPassword,
    keepAlive, setKeepAlive, ssl, setSsl, cleanSession, setCleanSession, lwtTopic, setLwtTopic,
    lwtMessage, setLwtMessage, lwtQos, setLwtQos, lwtRetain, setLwtRetain, isConnecting, isConnected, handleConnect
}) => {
    return (
        <div className="grid grid-cols-9 gap-4 p-4">
            <div className="col-span-4">
                <Label htmlFor="host">Host</Label>
                <Input type="url" id="host" value={host} onChange={(e) => setHost(e.target.value)} />
            </div>
            <div className="col-span-1">
                <Label htmlFor="port">Port</Label>
                <Input type="number" id="port" value={port} onChange={(e) => setPort(e.target.value)} />
            </div>
            <div className="col-span-3">
                <Label htmlFor="clientID">ClientID</Label>
                <Input type="text" id="clientID" value={clientId} onChange={(e) => setClientId(e.target.value)} />
            </div>
            <div className="col-span-1 flex justify-center items-center">
                <Button variant={isConnected ? "destructive" : "default"} onClick={handleConnect} disabled={isConnecting} className="bg-green-500 hover:bg-green-600">
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
                <Input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="col-span-3">
                <Label htmlFor="password">Password</Label>
                <Input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="col-span-1">
                <Label htmlFor="keepAlive">Keep Alive</Label>
                <Input type="number" id="keepAlive" value={keepAlive} onChange={(e) => setKeepAlive(parseInt(e.target.value))} />
            </div>
            <div className="col-span-1">
                <Label htmlFor="ssl">SSL</Label>
                <Input className="w-5 h-5 m-2" type="checkbox" id="ssl" checked={ssl} onChange={(e) => setSsl(e.target.checked)} />
            </div>
            <div className="col-span-1">
                <Label htmlFor="cleanSession">Clean Session</Label>
                <Input className="w-5 h-5 m-2" type="checkbox" id="cleanSession" checked={cleanSession} onChange={(e) => setCleanSession(e.target.checked)} />
            </div>
            <div className="col-span-7">
                <Label htmlFor="lwtTopic">Last-Will Topic</Label>
                <Input type="text" id="lwtTopic" value={lwtTopic} onChange={(e) => setLwtTopic(e.target.value)} />
            </div>
            <div className="col-span-1">
                <Label>Last-Will QoS</Label>
                <Select value={lwtQos.toString()} onValueChange={(e) => setLwtQos(e as unknown as QoS)}>
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
                <Input className="w-5 h-5 m-2" type="checkbox" id="lwtRetain" checked={lwtRetain} onChange={(e) => setLwtRetain(e.target.checked)} />
            </div>
            <div className="col-span-9">
                <Label htmlFor="lwtMessage">Last-Will Message</Label>
                <Textarea id="lwtMessage" value={lwtMessage} onChange={(e) => setLwtMessage(e.target.value)} />
            </div>
        </div>
    );
};