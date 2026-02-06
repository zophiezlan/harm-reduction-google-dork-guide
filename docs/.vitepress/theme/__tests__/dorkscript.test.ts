import { describe, it, expect } from "vitest";
import {
  isDorkQuery,
  lintDorkScript,
  highlightDorkText,
  highlightDorkWithLint,
} from "../utils/dorkscript";

describe("isDorkQuery", () => {
  it("detects operator-based queries", () => {
    expect(isDorkQuery("site:example.com")).toBe(true);
    expect(isDorkQuery("filetype:pdf")).toBe(true);
    expect(isDorkQuery("intitle:test")).toBe(true);
  });

  it("detects AROUND proximity operator", () => {
    expect(isDorkQuery('"term" AROUND(5) "other"')).toBe(true);
  });

  it("detects boolean operators", () => {
    expect(isDorkQuery("harm reduction OR drug policy")).toBe(true);
    expect(isDorkQuery("harm AND reduction")).toBe(true);
  });

  it("detects exclusion operator", () => {
    expect(isDorkQuery("-opioid")).toBe(true);
  });

  it("detects wildcard operator", () => {
    expect(isDorkQuery("*drug")).toBe(true);
  });

  it("detects hashtag patterns", () => {
    expect(isDorkQuery("#harmreduction")).toBe(true);
  });

  it("rejects plain text", () => {
    expect(isDorkQuery("just some words")).toBe(false);
    expect(isDorkQuery("hello world")).toBe(false);
  });
});

describe("lintDorkScript", () => {
  it("returns no issues for valid queries", () => {
    expect(lintDorkScript("site:example.com filetype:pdf")).toEqual([]);
    expect(lintDorkScript('"harm reduction" after:2024')).toEqual([]);
  });

  it("detects unclosed quotes", () => {
    const issues = lintDorkScript('"unclosed quote');
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe("error");
    expect(issues[0].message).toContain("Unclosed quote");
  });

  it("detects unmatched closing parenthesis", () => {
    const issues = lintDorkScript("site:example.com)");
    const parenIssue = issues.find((i) =>
      i.message.includes("closing parenthesis"),
    );
    expect(parenIssue).toBeDefined();
    expect(parenIssue!.severity).toBe("error");
  });

  it("detects unmatched opening parenthesis", () => {
    const issues = lintDorkScript("(site:example.com");
    const parenIssue = issues.find((i) =>
      i.message.includes("opening parenthesis"),
    );
    expect(parenIssue).toBeDefined();
    expect(parenIssue!.severity).toBe("error");
  });

  it("detects unknown operators", () => {
    const issues = lintDorkScript("foobar:value");
    const unknownIssue = issues.find((i) =>
      i.message.includes("Unknown operator"),
    );
    expect(unknownIssue).toBeDefined();
    expect(unknownIssue!.severity).toBe("warning");
  });

  it("detects empty operator values", () => {
    const issues = lintDorkScript("site:");
    const emptyIssue = issues.find((i) => i.message.includes("Missing value"));
    expect(emptyIssue).toBeDefined();
    expect(emptyIssue!.severity).toBe("error");
  });

  it("detects multiple site operators without OR", () => {
    const issues = lintDorkScript("site:a.com site:b.com");
    const multiSite = issues.find((i) => i.message.includes("Multiple site:"));
    expect(multiSite).toBeDefined();
    expect(multiSite!.severity).toBe("warning");
  });

  it("does not warn about multiple site operators with OR", () => {
    const issues = lintDorkScript("site:a.com OR site:b.com");
    const multiSite = issues.find((i) => i.message.includes("Multiple site:"));
    expect(multiSite).toBeUndefined();
  });

  it("detects invalid date format", () => {
    const issues = lintDorkScript("after:not-a-date");
    const dateIssue = issues.find(
      (i) => i.message.includes("Invalid") && i.message.includes("date"),
    );
    expect(dateIssue).toBeDefined();
  });

  it("accepts valid date formats", () => {
    const issues = lintDorkScript("after:2024 before:2024-01-15");
    const dateIssues = issues.filter(
      (i) => i.message.includes("Invalid") && i.message.includes("date"),
    );
    expect(dateIssues).toHaveLength(0);
  });

  it("detects invalid imagesize format", () => {
    const issues = lintDorkScript("imagesize:invalid");
    const sizeIssue = issues.find((i) => i.message.includes("imagesize"));
    expect(sizeIssue).toBeDefined();
  });

  it("accepts valid imagesize format", () => {
    const issues = lintDorkScript("imagesize:1920x1080");
    const sizeIssue = issues.find((i) =>
      i.message.includes("Invalid imagesize"),
    );
    expect(sizeIssue).toBeUndefined();
  });

  it("detects AROUND without distance", () => {
    const issues = lintDorkScript('"term" AROUND "other"');
    const aroundIssue = issues.find((i) => i.message.includes("AROUND"));
    expect(aroundIssue).toBeDefined();
  });

  it("produces consistent results across multiple calls (no lastIndex leak)", () => {
    const query = "site: filetype:";
    const issues1 = lintDorkScript(query);
    const issues2 = lintDorkScript(query);
    expect(issues1.length).toBe(issues2.length);
    expect(issues1.map((i) => i.message)).toEqual(
      issues2.map((i) => i.message),
    );
  });
});

describe("highlightDorkText", () => {
  it("wraps operators in span elements", () => {
    const result = highlightDorkText("site:example.com");
    expect(result).toContain("dork-operator");
    expect(result).toContain("dork-op-site");
    expect(result).toContain("dork-domain");
  });

  it("wraps filetype operator with file class", () => {
    const result = highlightDorkText("filetype:pdf");
    expect(result).toContain("dork-op-file");
    expect(result).toContain("dork-filetype");
  });

  it("wraps date operators with date class", () => {
    const result = highlightDorkText("after:2024");
    expect(result).toContain("dork-op-date");
    expect(result).toContain("dork-date");
  });

  it("wraps content operators", () => {
    const result = highlightDorkText("intitle:test");
    expect(result).toContain("dork-op-content");
    expect(result).toContain("dork-content-value");
  });

  it("wraps quoted phrases with phrase class", () => {
    const result = highlightDorkText('"harm reduction"');
    expect(result).toContain("dork-phrase");
  });

  it("wraps single-word quoted strings with string class", () => {
    const result = highlightDorkText('"naloxone"');
    expect(result).toContain("dork-string");
  });

  it("wraps boolean operators", () => {
    const result = highlightDorkText("a OR b");
    expect(result).toContain("dork-boolean");
    expect(result).toContain("dork-or");
  });

  it("wraps AND boolean operator", () => {
    const result = highlightDorkText("a AND b");
    expect(result).toContain("dork-and");
  });

  it("wraps exclusion operator", () => {
    const result = highlightDorkText("-excluded");
    expect(result).toContain("dork-exclusion");
    expect(result).toContain("dork-exclusion-term");
  });

  it("wraps wildcard characters", () => {
    const result = highlightDorkText("site:*.example.com");
    expect(result).toContain("dork-wildcard");
  });

  it("wraps AROUND proximity operator", () => {
    const result = highlightDorkText("AROUND(5)");
    expect(result).toContain("dork-function");
    expect(result).toContain("dork-number");
  });

  it("wraps parentheses", () => {
    const result = highlightDorkText("(a OR b)");
    expect(result).toContain("dork-paren");
  });

  it("wraps pipe separator", () => {
    const result = highlightDorkText("a|b");
    expect(result).toContain("dork-pipe");
  });

  it("wraps hashtags", () => {
    const result = highlightDorkText("#harmreduction");
    expect(result).toContain("dork-tag");
  });

  it("escapes HTML in values", () => {
    const result = highlightDorkText('site:<script>alert("xss")</script>');
    expect(result).not.toContain("<script>");
    expect(result).toContain("&lt;script&gt;");
  });

  it("handles complex multi-part queries", () => {
    const result = highlightDorkText(
      'site:*.gov.au filetype:pdf "harm reduction" -opioid after:2024',
    );
    expect(result).toContain("dork-op-site");
    expect(result).toContain("dork-op-file");
    expect(result).toContain("dork-phrase");
    expect(result).toContain("dork-exclusion");
    expect(result).toContain("dork-op-date");
  });
});

describe("highlightDorkWithLint", () => {
  it("returns plain highlight when no issues", () => {
    const text = "site:example.com";
    const result = highlightDorkWithLint(text, []);
    expect(result).toBe(highlightDorkText(text));
  });

  it("wraps error spans around issues", () => {
    const text = '"unclosed';
    const issues = lintDorkScript(text);
    const result = highlightDorkWithLint(text, issues);
    expect(result).toContain("dork-error");
    expect(result).toContain("data-message");
  });

  it("escapes issue messages in data attributes", () => {
    const text = "site:";
    const issues = lintDorkScript(text);
    const result = highlightDorkWithLint(text, issues);
    expect(result).toContain("dork-error");
  });
});
