
import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  RotateCcw,
} from "lucide-react";
import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const initialMessages = [
    {
      id: 1,
      sender: "bot",
      text: "Hello! 👋 Welcome to HomeNest.",
    },
    {
      id: 2,
      sender: "bot",
      text: "I'm your virtual assistant. How can I help you find your perfect PG, hostel, or flat?",
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isOpen]);

  // Generate a reply to the user's question
  const getBotResponse = (message) => {
    const text = message.toLowerCase();

    if (
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("hey")
    ) {
      return "Hi there! 😊 Welcome to HomeNest. Are you looking for a PG, hostel, or flat?";
    }

    if (
      text.includes("pg") ||
      text.includes("hostel") ||
      text.includes("flat") ||
      text.includes("room")
    ) {
      return "🏠 You can explore PGs, hostels, and flats on HomeNest. Use the search section to select your location, budget, property type, and room type.";
    }

    if (
      text.includes("rent") ||
      text.includes("price") ||
      text.includes("budget") ||
      text.includes("cost")
    ) {
      return "💰 You can search for accommodation within your monthly budget. Enter your maximum rent in the HomeNest search section to find suitable options.";
    }

    if (
      text.includes("food") ||
      text.includes("wifi") ||
      text.includes("wi-fi") ||
      text.includes("bathroom") ||
      text.includes("facility") ||
      text.includes("amenities")
    ) {
      return "✨ HomeNest lets you look for facilities such as food, Wi-Fi, and attached bathrooms. Check each property's details to confirm which amenities are available.";
    }

    if (
      text.includes("book") ||
      text.includes("booking") ||
      text.includes("reserve")
    ) {
      return "📅 To book a property, select a suitable listing and complete the booking form with your name, contact details, check-in date, and duration of stay.";
    }

    if (
      text.includes("owner") ||
      text.includes("register") ||
      text.includes("list")
    ) {
      return "🏢 Property owners can provide their PG or hostel details, including location, rent, room availability, facilities, photos, and contact information.";
    }

    if (
      text.includes("single") ||
      text.includes("double") ||
      text.includes("triple")
    ) {
      return "🛏️ HomeNest supports searches for single, double-sharing, and triple-sharing rooms. Choose your preferred room type in the search section.";
    }

    if (
      text.includes("contact") ||
      text.includes("support") ||
      text.includes("help")
    ) {
      return "🤝 I'm here to help with finding accommodation and understanding the booking process. For account-specific or booking-specific help, please contact the HomeNest support team when available.";
    }

    if (
      text.includes("thank")
    ) {
      return "You're welcome! 😊 Thank you for choosing HomeNest.";
    }

    return "I'm happy to help! You can ask me about PGs, hostels, monthly rent, room types, food, Wi-Fi, or how to book a property.";
  };

  // Send message
  const handleSend = (event) => {
    event.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedInput,
    };

    const botMessage = {
      id: Date.now() + 1,
      sender: "bot",
      text: getBotResponse(trimmedInput),
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      botMessage,
    ]);

    setInput("");
  };

  // Start a new conversation
  const handleReset = () => {
    setMessages(initialMessages);
    setInput("");
  };

  // Use a suggested question
  const handleSuggestion = (question) => {
    setInput(question);
  };

  return (
    <div className="homenest-chatbot">
      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-brand">
              <div className="chatbot-logo">
                <Bot size={25} />
              </div>

              <div>
                <h3>HomeNest Assistant</h3>
                <p>
                  <span className="online-dot"></span>
                  Your accommodation helper
                </p>
              </div>
            </div>

            <div className="chatbot-header-actions">
              <button
                type="button"
                className="chatbot-icon-button"
                onClick={handleReset}
                title="Start new chat"
                aria-label="Start new chat"
              >
                <RotateCcw size={18} />
              </button>

              <button
                type="button"
                className="chatbot-icon-button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chatbot"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            <div className="chatbot-date-label">
              HomeNest Virtual Assistant
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-message ${
                  message.sender === "user"
                    ? "chatbot-user-message"
                    : "chatbot-bot-message"
                }`}
              >
                <div className="chatbot-message-avatar">
                  {message.sender === "user" ? (
                    <User size={17} />
                  ) : (
                    <Bot size={17} />
                  )}
                </div>

                <div className="chatbot-message-content">
                  {message.text}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          <div className="chatbot-suggestions">
            <button
              type="button"
              onClick={() =>
                handleSuggestion("How can I find a PG?")
              }
            >
              Find a PG
            </button>

            <button
              type="button"
              onClick={() =>
                handleSuggestion("What is the monthly rent?")
              }
            >
              Rent
            </button>

            <button
              type="button"
              onClick={() =>
                handleSuggestion("How do I book a room?")
              }
            >
              Booking
            </button>
          </div>

          {/* Input form */}
          <form
            className="chatbot-input-form"
            onSubmit={handleSend}
          >
            <input
              type="text"
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder="Ask me anything..."
              aria-label="Enter your message"
            />

            <button
              type="submit"
              className="chatbot-send-button"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <Send size={19} />
            </button>
          </form>

          <div className="chatbot-footer">
            Powered by HomeNest
          </div>
        </div>
      )}

      {/* Floating chat button */}
      <button
        type="button"
        className="chatbot-toggle-button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        {isOpen ? (
          <X size={28} />
        ) : (
          <MessageCircle size={28} />
        )}
      </button>
    </div>
  );
}

export default Chatbot;

