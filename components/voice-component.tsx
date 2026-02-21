"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image"

// ElevenLabs
import { useConversation } from "@11labs/react";

// UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, ArrowRight, Phone } from "lucide-react";

const VoiceChat = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modeView, setModeView] = useState<"voice" | "text">("voice")
  const [messages, setMessages] = useState<Array<{ id: string; from: "user" | "agent"; text: string }>>([])
  const [textInput, setTextInput] = useState("")

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs");
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs");
    },
    onMessage: (message: any) => {
      console.log("Received message:", message);
      // Try to extract a useful text field, fallback to JSON
      const text = (message && (message.text || message.content || message.message)) || JSON.stringify(message)
      setMessages((prev) => [...prev, { id: message?.id || Date.now().toString(), from: "agent", text }])
    },
    onError: (error: string | Error) => {
      setErrorMessage(typeof error === "string" ? error : error.message);
      console.error("Error:", error);
    },
  });

  const { status, isSpeaking } = conversation;

  useEffect(() => {
    // Request microphone permission on component mount
    const requestMicPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
      } catch (error) {
        setErrorMessage("Microphone access denied");
        console.error("Error accessing microphone:", error);
      }
    };

    requestMicPermission();
  }, []);

  const handleStartConversation = async () => {
    try {
      // Replace with your actual agent ID or URL
      const conversationId = await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!,
        connectionType: "websocket",
      });
      console.log("Started conversation:", conversationId);
    } catch (error) {
      setErrorMessage("Failed to start conversation");
      console.error("Error starting conversation:", error);
    }
  };

  const handleEndConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      setErrorMessage("Failed to end conversation");
      console.error("Error ending conversation:", error);
    }
  };

  const toggleMute = async () => {
    try {
      await conversation.setVolume({ volume: isMuted ? 1 : 0 });
      setIsMuted(!isMuted);
    } catch (error) {
      setErrorMessage("Failed to change volume");
      console.error("Error changing volume:", error);
    }
  };

  const sendTextMessage = async (text: string) => {
    if (!text?.trim()) return
    try {
      // Ensure session is started
      if (status !== "connected") {
        await conversation.startSession({
          agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!,
          connectionType: "websocket",
        })
      }

      // Append user message locally
      const id = Date.now().toString()
      setMessages((prev) => [...prev, { id, from: "user", text }])

      // Send to the conversation hook (library exposes sendUserMessage)
      // @ts-ignore - third-party hook types may not expose full methods here
      if (typeof (conversation as any).sendUserMessage === "function") {
        ;(conversation as any).sendUserMessage(text)
      } else {
        console.warn("sendUserMessage not available on conversation")
      }

      setTextInput("")
    } catch (error) {
      setErrorMessage("Failed to send message")
      console.error("Error sending text message:", error)
    }
  }

  return (
    <Card className="w-72 rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium">Conversation</div>
            <div className="inline-flex rounded-md bg-muted p-1">
              <Button
                size="sm"
                variant={modeView === "voice" ? "default" : "ghost"}
                onClick={() => setModeView("voice")}
              >
                Voice
              </Button>
              <Button
                size="sm"
                variant={modeView === "text" ? "default" : "ghost"}
                onClick={() => setModeView("text")}
              >
                Text
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMute}
              disabled={status !== "connected"}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {modeView === "voice" ? (
            <>
              <div className="flex justify-center">
                {status === "connected" ? (
                  <Button
                    variant="destructive"
                    onClick={handleEndConversation}
                    className="w-full"
                  >
                    <MicOff className="mr-2 h-4 w-4" />
                    End Conversation
                  </Button>
                ) : (
                  <Button
                    onClick={handleStartConversation}
                    disabled={!hasPermission}
                    className="w-full"
                  >
                    <Mic className="mr-2 h-4 w-4" />
                    Start Conversation
                  </Button>
                )}
              </div>

              <div className="text-center text-sm">
                {status === "connected" && (
                  <p className="text-green-600">
                    {isSpeaking ? "Agent is speaking..." : "Listening..."}
                  </p>
                )}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {!hasPermission && (
                  <p className="text-yellow-600">
                    Please allow microphone access to use voice chat
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center gap-4">
                {/* Agent avatar with overlay call button */}
                <div className="relative">
                  <div className="mx-auto w-36 h-36 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shadow">
                    {/* Placeholder image for agent - replace src as needed */}
                    <Image src="/avatar.jpg" alt="Agent" width={144} height={144} className="object-cover" />
                  </div>
                  <button
                    className="absolute left-1/2 -bottom-3 -translate-x-1/2 h-12 w-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg"
                    aria-label="Call agent"
                  >
                    <Phone className="h-5 w-5" />
                  </button>
                </div>

                {/* Messages area */}
                <div className="w-full">
                  <div className="max-h-48 overflow-auto space-y-2 rounded border p-3 bg-muted">
                    {messages.length === 0 && <p className="text-sm text-muted-foreground">No messages yet.</p>}
                    {messages.map((m) => (
                      <div key={m.id} className={`text-sm ${m.from === "user" ? "text-right" : "text-left"}`}>
                        <div className={`${m.from === "user" ? "inline-block bg-primary/80 text-white" : "inline-block bg-card/70 text-foreground"} rounded px-3 py-2`}>{m.text}</div>
                      </div>
                    ))}
                  </div>

                  {/* Input bar styled like image */}
                  <div className="mt-3">
                    <div className="relative">
                      <input
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") sendTextMessage(textInput)
                        }}
                        className="w-full rounded-2xl border px-4 py-4 pr-16 bg-white text-sm"
                        placeholder="Send a message..."
                      />
                      <button
                        onClick={() => sendTextMessage(textInput)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-slate-400 text-white flex items-center justify-center shadow"
                        aria-label="Send message"
                      >
                        <ArrowRight className="h-4 w-4 rotate-45" />
                      </button>
                    </div>
                  </div>
                </div>

                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceChat;