import axios from "axios";
import { useState } from "react";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (message: string) => {
    const updatedMessages: Message[] = [
      ...messages,
      { text: message, sender: "user" },
    ];
    setMessages(updatedMessages);

    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-8b-8192",
          messages: [{ role: "user", content: message }],
        },
        {
          headers: {
            Authorization: `Bearer `, // Replace with env/secure proxy
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = response.data.choices[0].message.content;
      setMessages([...updatedMessages, { text: botMessage, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching AI response", error);
    }
  };

  return { messages, sendMessage };
};

export default useChatbot;
