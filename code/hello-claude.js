// Import the Anthropic SDK — this is the official library for calling Claude's API.
const Anthropic = require("@anthropic-ai/sdk");

// Import the path module — Node.js built-in for working with file system paths.
const path = require("path");

// Load environment variables from the .env file located one directory above this folder.
// The `path` argument tells dotenv exactly where to look instead of the default (current dir).
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

// Create a new Anthropic client. It automatically reads the ANTHROPIC_API_KEY
// that dotenv just loaded into process.env from the parent directory's .env file.
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Wrap the API call in an async function because network requests return promises.
async function main() {
  // Send one message to Claude and wait for the full response.
  const response = await client.messages.create({
    // The specific Claude model to use, as requested.
    model: "claude-sonnet-4-6",
    // Maximum number of tokens (roughly words/word-pieces) Claude may produce.
    max_tokens: 1024,
    // The conversation: a single user message with our question.
    messages: [
      {
        role: "user",
        content:
          "What are the three main steps of an ASC 842 lease classification test?",
      },
    ],
  });

  // `response.content` is an array of content blocks. Loop through and print every text block.
  for (const block of response.content) {
    if (block.type === "text") {
      console.log(block.text);
    }
  }
}

// Run the async function and print any errors to stderr so failures are visible.
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
