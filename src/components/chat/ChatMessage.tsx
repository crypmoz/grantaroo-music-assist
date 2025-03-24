
import { MessageType } from "@/context/ChatbotContext";
import { cn } from "@/lib/utils";

type ChatMessageProps = {
  message: MessageType;
};

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.sender === "bot";
  
  return (
    <div
      className={cn(
        "flex w-full my-2",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[85%]",
          isBot 
            ? "bg-secondary text-secondary-foreground" 
            : "bg-primary text-primary-foreground"
        )}
      >
        <div className="whitespace-pre-wrap">
          {message.content}
        </div>
        <div className="text-xs opacity-70 mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};
