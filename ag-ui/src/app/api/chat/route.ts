import { NextRequest, NextResponse } from "next/server";

const AGENT_BASE_URL = "http://127.0.0.1:8001";
const APP_NAME = "datetime_agent";
const USER_ID = "ag-ui-user";

// Session management
const sessions = new Map<string, boolean>();

interface ChatRequest {
  message: string;
  sessionId: string;
}

interface AgentEvent {
  author?: string;
  content?: {
    parts?: Array<{
      text?: string;
      functionCall?: unknown;
      functionResponse?: unknown;
    }>;
  };
  timestamp?: number;
}

async function ensureSession(sessionId: string) {
  if (sessions.has(sessionId)) return;

  try {
    await fetch(`${AGENT_BASE_URL}/apps/${APP_NAME}/users/${USER_ID}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    });
    sessions.set(sessionId, true);
  } catch (error) {
    console.warn("Session creation warning:", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId }: ChatRequest = await req.json();

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: "Message and sessionId are required" },
        { status: 400 }
      );
    }

    // Ensure session exists
    await ensureSession(sessionId);

    // Call ADK agent
    const response = await fetch(`${AGENT_BASE_URL}/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appName: APP_NAME,
        userId: USER_ID,
        sessionId,
        newMessage: {
          parts: [
            {
              text: message,
            },
          ],
        },
        streaming: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Agent request failed: ${response.statusText}`);
    }

    const events: AgentEvent[] = await response.json();

    // Find the last message from the agent with text content
    for (let i = events.length - 1; i >= 0; i--) {
      const event = events[i];
      if (event.author === APP_NAME && event.content?.parts) {
        for (const part of event.content.parts) {
          if (part.text) {
            return NextResponse.json({ message: part.text });
          }
        }
      }
    }

    return NextResponse.json({ message: "No response from agent" });
  } catch (error) {
    console.error("Error in chat route:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
