import { BufReader, blue, BufWriter, StringReader } from "./deps.ts";

let testReader: Deno.Reader | null = null;

export const setInputForTesting = (inputFromTest: string) => {
  testReader = new StringReader(inputFromTest);
};

interface Ask {
  kind: "text";
  question: string;
}

interface Answer {
  kind: "text";
  value: string;
}

export const ask = async (ask: Ask): Promise<Answer> => {
  // As a convenience for testing, we allow to set testing input that
  // we read instead of stdin.
  let inputReader = testReader === null ? Deno.stdin : testReader;

  const reader = new BufReader(inputReader);

  switch (ask.kind) {
    case "text": {
      const writer = new BufWriter(Deno.stdout);
      await writer.write(new TextEncoder().encode(blue(ask.question)));
      const input = await reader.readString("\n");

      if (input === null) throw new Error("invalid input");
      return {
        kind: "text",
        value: input,
      };
    }
  }
};
