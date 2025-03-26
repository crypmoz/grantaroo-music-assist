
// AI Grant Tool API Service for enhanced AI assistance
// NOTE: In a production app, you should never expose API keys in frontend code
// This is only for demonstration purposes

const AIGRANTTOOL_API_KEY = "sk-92a699787d4c4a7b8b0cfa86bac739a2";
const AIGRANTTOOL_API_URL = "https://api.deepseek.com/chat/completions";

type AIGrantToolMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type AIGrantToolResponse = {
  id: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
};

export const getAIGrantToolResponse = async (
  userMessage: string,
  context: string = "You are a Toronto Music Grant Assistant. Provide expert advice on music grant applications based on data from successful Ontario grants. Be specific and actionable."
): Promise<string> => {
  try {
    console.log("Making API call to DeepSeek API");
    
    const messages: AIGrantToolMessage[] = [
      { role: "system", content: context },
      { role: "user", content: userMessage },
    ];

    const response = await fetch(AIGRANTTOOL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AIGRANTTOOL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        stream: false,
      }),
    });

    console.log("API response status:", response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("AI Grant Tool API error:", errorData);
      throw new Error(`AI Grant Tool API error: ${response.status}`);
    }

    const data = await response.json() as AIGrantToolResponse;
    console.log("API response received successfully");
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling AI Grant Tool API:", error);
    return "I'm having trouble connecting to my enhanced AI capabilities right now. Let me provide basic assistance instead.";
  }
};
