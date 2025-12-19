import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";

/**
 * CopilotKit API Route Handler
 *
 * This route acts as a proxy between the CopilotKit frontend and the ADK agent backend.
 * It transforms CopilotKit's AG-UI protocol events to work with your ADK service.
 */

const AGENT_BASE_URL = "http://127.0.0.1:8001";
const APP_NAME = "datetime_agent";
const USER_ID = "copilotkit-user";
const SESSION_ID = `copilotkit-session-${Date.now()}`;

// Initialize session on first load
let sessionInitialized = false;

async function initializeSession() {
  if (sessionInitialized) return;

  try {
    await fetch(`${AGENT_BASE_URL}/apps/${APP_NAME}/users/${USER_ID}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId: SESSION_ID }),
    });
    sessionInitialized = true;
  } catch (error) {
    console.warn("Session initialization warning:", error);
  }
}

export const POST = async (req: NextRequest) => {
  try {
    // Ensure session is initialized
    await initializeSession();

    const body = await req.json();

    // For simple implementations, create a custom adapter
    // that calls your ADK backend
    const serviceAdapter = new OpenAIAdapter({
      model: "gpt-4", // Dummy model name for compatibility
    });

    const runtime = new CopilotRuntime();

    const response = await copilotRuntimeNextJSAppRouterEndpoint({
      runtime,
      serviceAdapter,
      endpoint: "/api/copilotkit",
    })(req);

    return response;
  } catch (error) {
    console.error("Error in CopilotKit route:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
