"use client";
// MqttContext.js (or a similar file)
import React, { createContext, useState } from "react";
import { Message } from "@/types/Message"; // Adjust the path if needed

interface MqttContextValue {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    // Add other values you want to share through context if needed
}
const MqttContext = createContext<MqttContextValue | null>(null);


export const MqttProvider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    return (
        <MqttContext.Provider value={{ messages, setMessages }}>
            {children}
        </MqttContext.Provider>
    );
};

export default MqttContext; 