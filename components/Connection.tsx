"use client";
import { useMqttConnection } from "../hooks/useMqttConnection";
import { ConnectionForm } from "./ConnectionFrom";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

export const Connection = () => {
    const {
        host,
        setHost,
        port,
        setPort,
        clientId,
        setClientId,
        username,
        setUsername,
        password,
        setPassword,
        keepAlive,
        setKeepAlive,
        ssl,
        setSsl,
        cleanSession,
        setCleanSession,
        lwtTopic,
        setLwtTopic,
        lwtMessage,
        setLwtMessage,
        lwtQos,
        setLwtQos,
        lwtRetain,
        setLwtRetain,
        isConnecting,
        isConnected,
        text,
        visible,
        handleConnect,
    } = useMqttConnection();

    return (
        <Accordion type="multiple" className="w-full" defaultValue={["connection"]}>
            <AccordionItem value="connection">
                <AccordionTrigger>
                    <div className="flex items-center space-x-2">
                        <a className="text-xl font-bold flex-grow">Connection</a>
                        {isConnecting ? (
                            <>
                                <Loader2 className="ml-2 w-3 h-3 animate-spin" />
                            </>
                        ) : isConnected ? (
                            <span className="ml-2 w-3 h-3 bg-gradient-to-tr animate-pulse from-green-600 to-green-500 rounded-full"></span>
                        ) : (
                            <span className="ml-2 w-3 h-3 bg-gradient-to-tr from-red-600 to-red-500 rounded-full"></span>
                        )}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <ConnectionForm
                        host={host}
                        setHost={setHost}
                        port={port}
                        setPort={setPort}
                        clientId={clientId}
                        setClientId={setClientId}
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        keepAlive={keepAlive}
                        setKeepAlive={setKeepAlive}
                        ssl={ssl}
                        setSsl={setSsl}
                        cleanSession={cleanSession}
                        setCleanSession={setCleanSession}
                        lwtTopic={lwtTopic}
                        setLwtTopic={setLwtTopic}
                        lwtMessage={lwtMessage}
                        setLwtMessage={setLwtMessage}
                        lwtQos={lwtQos}
                        setLwtQos={setLwtQos}
                        lwtRetain={lwtRetain}
                        setLwtRetain={setLwtRetain}
                        isConnecting={isConnecting}
                        isConnected={isConnected}
                        handleConnect={handleConnect}
                    />
                </AccordionContent>
            </AccordionItem>
            {false && (
                <div
                    className={`fixed bottom-0 left-0 w-full transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Alert
                        variant="destructive"
                        className="mt-4 bg-red-100 border border-red-400 text-red-700"
                    >
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle className="font-bold">Error</AlertTitle>
                        <AlertDescription>{}</AlertDescription>
                    </Alert>
                </div>
            )}
            {text && visible && (
                <div
                    className={`fixed bottom-0 left-0 w-full animate-fade-out`}
                >
                    <Alert
                        variant="default"
                        className={`mt-4 ${text.includes("Success")? "bg-green-100 border border-green-400 text-green-700" : "bg-red-100 border border-red-400 text-red-700"}`}
                    >
                        {text.includes("Success")? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}

                        <AlertTitle className="font-bold">{text.includes("Success")? "Success" : "! Heads Up !"}</AlertTitle>
                        <AlertDescription>
                            {text}
                        </AlertDescription>
                    </Alert>
                </div>
            )}
        </Accordion>
    );
};
