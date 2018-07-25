import { retrieveOnlyNumbers } from "./retrieveOnlyNumbers";

test("Given a string, remove all non-numeric characters", () => {
  expect(retrieveOnlyNumbers("a1bc23")).toBe("123");
});
