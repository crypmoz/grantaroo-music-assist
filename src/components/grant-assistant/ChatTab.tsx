
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { useChatbot } from "@/context/ChatbotContext";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

export const ChatTab = () => {
  const { messages, addMessage } = useChatbot();

  return (
    <>
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Bot className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Welcome to Grant Assistant</h3>
                <p className="text-muted-foreground max-w-sm">
                  I'm here to help you find and apply for music grants that match your profile.
                </p>
              </div>
              <Button onClick={() => addMessage("Hi there! Can you help me with my grant application?", "user")}>
                Start a conversation
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="mt-auto p-4 border-t">
        <ChatInput />
      </div>
    </>
  );
};
