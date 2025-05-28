import { useState } from "react";
import { LuBot, LuSendHorizontal } from "react-icons/lu";
import useChatbot from "../hooks/useChatbot";
import Markdown from "react-markdown";

const ChatComponent = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChatbot();

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col bg-white h-[80vh]">
      <h2 className="p-4 text-lg font-semibold text-center flex bg-blue-100 text-blue-800 justify-center items-center gap-2">
        React + OpenAI Chatbot <LuBot size={25} />
      </h2>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-300 text-black"
            }`}
          >
            <Markdown>{msg.text}</Markdown>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2.5 p-4 bg-gray-50">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-gray-500"
          placeholder="Your message here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="cursor-pointer" onClick={handleSend}>
          <LuSendHorizontal size={25} />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
