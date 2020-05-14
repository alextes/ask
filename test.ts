import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";
import { makeAsk } from "./mod.ts";
import { StringWriter, StringReader } from "./deps.ts";

const askWithMockInput = (mockUserInput: string) => {
  const testWriter = new StringWriter();
  return {
    ask: makeAsk({
      in: new StringReader(mockUserInput),
      out: testWriter,
    }),
    out: testWriter,
  };
};

Deno.test("Ask single question", async () => {
  const { ask, out } = askWithMockInput("27");
  const answer = await ask({ kind: "text", question: "what is your age?" });
  assertEquals(answer, { kind: "text", value: "27" });
  assertEquals(out.toString(), "what is your age?");
});
