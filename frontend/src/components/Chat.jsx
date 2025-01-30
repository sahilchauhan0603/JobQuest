import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("https://jobquest-backend-v4d2.onrender.com"); // Backend URL

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server with socket ID:", socket.id);
    });

    socket.on("receive_message", (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("connect");
    };
  }, []);

  const sendMessage = async () => {

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const apiUrl = "https://api.openai.com/v1/completions";
    
    if (message.trim() !== "") {
      const userMessage = {
        sender: "User",
        message,
      };

      // Add user message to chat
      setChat((prevChat) => [...prevChat, userMessage]);
      setMessage(""); // Clear input field

      // Call AI API
      setLoading(true);
      try { 
        const response = await axios.post(apiUrl, {
          model: "gpt-4o-mini", // Replace with your GPT model
          prompt: message,
          max_tokens: 150,
        }, {  
          headers: {
            Authorization: `Bearer ${apiKey}`, // Replace with your OpenAI API key
            "Content-Type": "application/json",
          },
        });

        const botResponse = {
          sender: "AI Bot",
          message: response.data.choices[0].text.trim(),
        };

        // Add AI response to chat
        setChat((prevChat) => [...prevChat, botResponse]);
      } catch (error) {
        console.error("Error communicating with AI API:", error);
        setChat((prevChat) => [
          ...prevChat,
          { sender: "AI Bot", message: "Sorry, I couldn't process your request. Please try again." },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "50px auto",
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>AI Chatbot</h2>
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        {chat.map((chatItem, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              display: "flex",
              flexDirection:
                chatItem.sender === "User" ? "row-reverse" : "row",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "90%",
                padding: "10px 20px",
                borderRadius: "15px",
                backgroundColor:
                  chatItem.sender === "User" ? "#007bff" : "#f1f121",
                color: chatItem.sender === "User" ? "#fff" : "#333",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                wordBreak: "break-word",
                textAlign: "right",
                marginLeft: chatItem.sender === "User" ? "auto" : "0",
                marginRight: chatItem.sender === "User" ? "0" : "auto",
              }}
            >
              <strong
                style={{
                  color: "#000",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                ~{chatItem.sender}
              </strong>
              <p style={{ margin: 0 }}>{chatItem.message}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <p style={{ color: "#888" }}>AI Bot is typing...</p>
          </div>
        )}
      </div>
      <div style={{ marginTop: "15px", display: "flex", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            outline: "none",
            fontSize: "16px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
