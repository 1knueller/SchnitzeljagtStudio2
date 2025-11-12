
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

interface SchnitzeljagtInputs {
  theme: string;
  story?: string;
  details?: string;
  suggestions?: string;
}

export const generateSchnitzeljagt = async ({
  theme,
  story,
  details,
  suggestions,
}: SchnitzeljagtInputs): Promise<string> => {
  const prompt = `
You are a world-class Schnitzeljagt Author working for an elite Schnitzeljagt Publishing Studio. Your task is to create a complete, imaginative, and coherent scavenger hunt (Schnitzeljagt) based on the user's provided details. The final output must be a single, well-structured Markdown document.

**User's Requirements:**
*   **Theme:** ${theme}
*   **Story Elements to Incorporate:** ${story || 'None provided. Create a compelling story based on the theme.'}
*   **Real-Life Details (Names, Places, Objects):** ${details || 'None provided. Use placeholders like [Player Name], [Location], [Object].'}
*   **Additional Suggestions/Requirements:** ${suggestions || 'None provided. Use your creative expertise.'}

**Output Structure (Strict Markdown Format):**

# Schnitzeljagt Title: [Create a Catchy Title Based on the Theme]

## 1. Introduction & Story

*   **Synopsis:** A brief, exciting overview of the adventure.
*   **The Story Begins:** The full narrative that kicks off the hunt. This should be engaging and set the scene for the participants. Incorporate the user's story elements and details if provided.

## 2. Game Master's Guide

*   **Objective:** Clearly state the goal of the Schnitzeljagt.
*   **Preparation Checklist:** A step-by-step list of everything the Game Master needs to do *before* the hunt begins. This includes printing materials, hiding clues, and preparing any props.
*   **Materials Needed:** A bulleted list of all items required (e.g., scissors, envelopes, specific objects for puzzles).
*   **How to Run the Hunt:** Instructions for the Game Master on how to start the game, give hints, and manage the flow.

## 3. The Stations (Puzzles & Clues)

Create a logical sequence of 5-7 stations. For each station, provide the following:

### Station [Number]: [Name of the Station]

*   **Location Hint:** A riddle or clue that leads players to this station's location. The first station's hint is given at the start. Subsequent hints are found at the previous station.
*   **The Task/Puzzle:** A clear description of the challenge players must solve. This could be a riddle, a physical task, a logic puzzle, or an observation question about the surroundings. Incorporate the user's provided real-life details where appropriate.
*   **Clue for the Next Station:** The text of the clue that players receive upon completing the task. This will lead them to the *next* station.
*   **Game Master's Notes:** (Optional) Any specific instructions or solutions for the Game Master for this particular station.

*... (Repeat for all stations) ...*

## 4. The Grand Finale

*   **The Final Location:** The clue from the last station should lead here.
*   **The Final Challenge:** The last puzzle or task to complete the hunt.
*   **The Resolution:** The concluding part of the story, revealing the outcome and rewarding the players. This should tie back to the initial story.

## 5. Appendix: Printable Materials

This section should contain all the text that needs to be printed and cut out. Use horizontal rulers (\`---\`) to separate each printable item clearly.

---
**Printable for Station 1:**
[Content of the clue/riddle for Station 1]
---
**Printable for Station 2:**
[Content of the clue/riddle for Station 2]
---
*(... and so on for all stations and the final challenge)*

---

Now, generate the complete Schnitzeljagt based on the user's requirements. Be creative, detailed, and ensure the entire experience is cohesive and fun.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate Schnitzeljagt from API.");
  }
};
