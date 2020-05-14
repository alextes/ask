import { BufReader, blue, BufWriter, StringReader } from "./deps.ts";

type Reader = Deno.Reader;
type Writer = Deno.Writer;

type Question = TextQuestion;

interface TextQuestion {
  kind: "text";
  question: string;
}

interface Answer {
  kind: "text";
  value: string;
}

type MakeAskOptions = { in: Reader; out: Writer };
export const makeAsk = (options: MakeAskOptions) => async (
  question: Question
): Promise<Answer> => {
  const bufReader = new BufReader(options.in);

  switch (question.kind) {
    case "text": {
      const bufWriter = new BufWriter(options.out);
      await bufWriter.write(new TextEncoder().encode(blue(question.question)));
      const input = await bufReader.readString("\n");

      if (input === null) throw new Error("invalid input");
      return {
        kind: "text",
        value: input,
      };
    }
  }
};

type Ask = (question: Question) => Promise<Answer>;
export const ask: Ask = makeAsk({ in: Deno.stdin, out: Deno.stdout });
