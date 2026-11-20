import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { loadBank, loadImages } from "../../src/content/load";
import { type Question, toLegacy } from "../../src/content/schema";
import { orderBank, type SourceFile, validateBank } from "../../src/content/validate";

describe("content/questions", () => {
  const report = loadBank();

  it("validates with no errors", () => {
    expect(report.issues.filter((i) => i.level === "error")).toEqual([]);
  });

  it("has 1,105 guide and 956 real GVA questions", () => {
    const { guide, gva } = orderBank(report.questions);
    expect([guide.length, gva.length]).toEqual([1105, 956]);
  });

  it("converts back to exactly the pre-split bank (tests/baseline/bank.jsonl)", () => {
    const images = loadImages();
    const { guide, gva } = orderBank(report.questions);
    const lines = [...guide.map((q) => toLegacy(q)), ...gva.map((q) => toLegacy(q, images))].map((q) =>
      JSON.stringify(q),
    );
    expect(`${lines.join("\n")}\n`).toBe(readFileSync("tests/baseline/bank.jsonl", "utf8"));
  });
});

describe("validateBank", () => {
  const g = (over: Partial<Question> = {}): Question => ({
    id: "g-0001",
    topic: "nom",
    q: "¿Qué es la obra viva?",
    options: ["La parte sumergida", "La cubierta", "El francobordo", "La quilla"],
    answer: 0,
    explanation: "Lo que queda bajo la flotación.",
    ...over,
  });
  const r = (over: Partial<Question> = {}): Question => ({
    ...g({ id: "gva-0007", q: "Pregunta real", gva: { index: 7, sittings: ["2024-04"] } }),
    ...over,
  });
  const errors = (files: SourceFile[], img?: (p: string) => boolean) =>
    validateBank(files, img)
      .issues.filter((i) => i.level === "error")
      .map((i) => `${i.id ?? ""} ${i.message}`);

  it("accepts a valid guide and real question", () => {
    expect(
      errors([
        { path: "guide/nom.json", data: [g()] },
        { path: "gva/nom.json", data: [r()] },
      ]),
    ).toEqual([]);
  });

  it("rejects an answer index out of range", () => {
    expect(errors([{ path: "guide/nom.json", data: [g({ answer: 4 })] }]).join()).toMatch(/answer/);
  });

  it("rejects an unknown topic and a topic that doesn't match the file", () => {
    expect(errors([{ path: "guide/nom.json", data: [{ ...g(), topic: "xyz" }] }]).join()).toMatch(/topic/);
    expect(errors([{ path: "guide/ripa.json", data: [g()] }]).join()).toMatch(/doesn't match the file/);
  });

  it("rejects repeated options but not options that differ only in sign", () => {
    const opts = ["La cubierta", "la cubierta.", "Otra", "Más"];
    expect(errors([{ path: "guide/nom.json", data: [g({ options: opts })] }]).join()).toMatch(
      /repeated options/,
    );
    expect(
      errors([{ path: "guide/nom.json", data: [g({ options: ["+5°", "−5°", "0°", "+10°"] })] }]),
    ).toEqual([]);
  });

  it("rejects duplicate ids and shared progress keys", () => {
    const two = [g(), g({ id: "g-0002", q: "Otra pregunta" })];
    expect(errors([{ path: "guide/nom.json", data: two }])).toEqual([]);
    expect(errors([{ path: "guide/nom.json", data: [g(), g({ q: "Otra" })] }]).join()).toMatch(
      /duplicate id/,
    );
    // Same topic and first 70 characters → the app would store their progress together.
    const long = "x".repeat(70);
    const clash = [g({ q: `${long} A` }), g({ id: "g-0002", q: `${long} B` })];
    expect(errors([{ path: "guide/nom.json", data: clash }]).join()).toMatch(/old-style progress key/);
  });

  it("ties gva ids to their index and folder", () => {
    expect(errors([{ path: "gva/nom.json", data: [r({ id: "gva-0008" })] }]).join()).toMatch(/gva.index/);
    expect(errors([{ path: "guide/nom.json", data: [r()] }]).join()).toMatch(/wrong folder/);
  });

  it("requires ids in increasing order within a file", () => {
    const data = [g({ id: "g-0002" }), g({ id: "g-0001", q: "Otra" })];
    expect(errors([{ path: "guide/nom.json", data }]).join()).toMatch(/increasing order/);
  });

  it("reports missing images", () => {
    const withImg = r({ gva: { index: 7, sittings: ["2024-04"], image: "img/gva-0007.jpg" } });
    expect(errors([{ path: "gva/nom.json", data: [withImg] }], () => false).join()).toMatch(/missing image/);
  });

  it("warns on empty explanations and repeated question text", () => {
    const rep = validateBank([
      {
        path: "guide/nom.json",
        data: [g({ explanation: "" }), g({ id: "g-0002", q: "¿QUÉ es la obra viva" })],
      },
    ]);
    expect(rep.errors).toBe(0);
    expect(rep.issues.map((i) => i.message)).toEqual(["empty explanation", "same question text as g-0001"]);
  });
});
