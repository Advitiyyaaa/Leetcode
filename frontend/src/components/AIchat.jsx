import { Send, Bot, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserMessage, sendMessageToAI } from "../chatSlice";


export default function AIchat({ problem, code }) {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chat);


  const { register, handleSubmit, reset } = useForm();
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = (data) => {
    const text = data.message.trim();
    if (!text) return;

    dispatch(addUserMessage(text));
    
    dispatch(
      sendMessageToAI({
        messages: [...messages, { role: "user", parts: [{ text }] }],
        problem,
        code,
      })
    );
    
    reset();
  };


  return (
    <div className="h-[calc(100vh-100px)] rounded-2xl border border-white/10 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
        <Bot className="w-5 h-5 text-purple-300" />
        <div>
          <p className="text-sm font-semibold text-white">AI Assistant</p>
          <p className="text-xs text-gray-400">
            Ask about constraints, edge cases or logic.
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`chat ${msg.role === "model" ? "chat-start" : "chat-end"}`}>
            <div className="chat-image avatar">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  msg.role === "model" ? "bg-purple-600/30" : "bg-blue-600/30"
                }`}
              >
                {msg.role === "model" ? (
                  <Bot className="text-purple-300" />
                ) : (
                  <User className="text-blue-300" />
                )}
              </div>
            </div>
            <div className="chat-bubble bg-black text-gray-100 max-w-[80%]">
              {msg.parts[0].text}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-t border-white/10 px-3 py-2 bg-black/80 flex items-center gap-2"
      >
        <input
          {...register("message", { required: true, minLength: 2 })}
          disabled={loading}
          className="input input-sm sm:input-md bg-black/80 border border-white/20 w-full rounded-2xl text-sm"
          placeholder="Ask something about this problem..."
        />
        <button
          type="submit"
          className="btn btn-circle btn-sm sm:btn-md bg-purple-600/80 hover:bg-purple-600 border-none"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </form>
    </div>
  );
}