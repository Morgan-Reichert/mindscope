"use client";

import { createContext, useContext, useState } from "react";

interface ChatContextType {
  chatOpen: boolean;
  setChatOpen: (v: boolean) => void;
}

const ChatContext = createContext<ChatContextType>({
  chatOpen: false,
  setChatOpen: () => {},
});

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <ChatContext.Provider value={{ chatOpen, setChatOpen }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  return useContext(ChatContext);
}
