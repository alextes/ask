import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";
import { ask, setInputForTesting } from "./mod.ts";

Deno.test("Ask single question", async () => {
  setInputForTesting("27");
  const answer = await ask({ kind: "text", question: "what is your age?" });
  assertEquals(answer, { kind: "text", value: "27" });
});
