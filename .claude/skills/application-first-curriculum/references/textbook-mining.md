# Mining a Source Textbook

Extract structure mechanically. Skimming and guessing produces a curriculum that says "work the end-of-chapter problems," which is useless. The goal is an inventory precise enough to assign specific item numbers to specific weeks.

## 1. Inventory the file

```bash
pdfinfo book.pdf          # page count, size
pdffonts book.pdf         # empty table means scanned → OCR needed
pdftotext -layout book.pdf book.txt
```

Always use `-layout`. Textbooks are multi-column and tabular; without it the journal entries and problem numbering scramble.

## 2. Table of contents

The TOC is usually 15–35 pages in. Find it, then pull chapter titles with their subheadings:

```bash
grep -n "^Chapter [0-9]" book.txt | head -40
sed -n '<toc_start>,<toc_end>p' book.txt | grep -A3 -E "^Chapter [0-9]+"
```

This gives you the chapter-to-topic map that drives sequencing.

## 3. Learning objectives per chapter

Most texts open each chapter with a numbered LO list. They are the best available scaffolding — assign them directly as weekly objectives rather than inventing your own.

```python
import re
txt = open('book.txt', encoding='utf-8', errors='replace').read()
blocks = re.findall(
    r'Learning Objectives\nAfter studying this chapter, you should be able to:\n(.*?)\n\n',
    txt, re.S)
for b in blocks:
    los = re.findall(r'^(\d{1,2}-\d)\s+(.{0,110})', b, re.M)
    for n, t in los:
        print(f"{n}: {t.strip()}")
```

Adjust the anchor phrase to the book. Some use "After reading this chapter" or "Objectives."

## 4. End-of-chapter inventory

This is the payload. Extract every numbered item with its section, title, and LO tags.

```python
import re, collections
lines = open('book.txt', encoding='utf-8', errors='replace').read().split('\n')

START = 1200   # skip front matter and TOC — tune to the book
item_re = re.compile(r'^[\f\t ]*(\d{1,2})[–\-](\d{1,2})\.\s*(.*)')
sec_re  = re.compile(r'^[\f\t ]*(Questions|Cases|Exercises and Problems|Key Terms)\s*$')

items, section = [], None
for ln in lines[START:]:
    m = sec_re.match(ln)
    if m:
        section = m.group(1); continue
    m = item_re.match(ln)
    if m:
        ch, num, rest = int(m.group(1)), int(m.group(2)), m.group(3).strip()
        lo = re.search(r'\((LO[^)]*)\)', rest)
        title = rest.split('(LO')[0].strip() or rest[:90]
        items.append((ch, num, section, title[:95], lo.group(1) if lo else ''))

seen, out = set(), []
for it in items:
    if (it[0], it[1]) in seen: continue
    seen.add((it[0], it[1])); out.append(it)

print(len(out), sorted(collections.Counter(i[0] for i in out).items()))
```

**Gotchas:**
- Item numbers use an **en dash** (`4–20`), not a hyphen. Match both.
- Form feeds (`\f`) prefix items that start a page. Allow for them in the leading-character class.
- The TOC will produce false positives. Set `START` past it and verify the per-chapter counts look plausible.
- A few items land in the wrong section when a page break splits a heading. Spot-check the boundaries between Questions, Cases, and Exercises for each chapter rather than trusting the labels blindly.

## 5. Classify the inventory

From the extracted list, tag each item:

- **Transfer thread** — the recurring "examine the real document" exercise. Search titles for `Examine`, `Analyze the`, `Research Case`. If it exists, it becomes the spine of the curriculum.
- **Milestones** — multi-part problems producing a full statement, report, or artifact. Titles containing `Comprehensive`, `Transactions and`, `and Financial Statements`, `Converting`.
- **Retrieval checkpoints** — the `Multiple Choice` item in each chapter, which typically spans all that chapter's LOs. Administer these one week *late* so retrieval has to work.
- **Drill items** — short classification, matching, and sorting exercises. These become spaced-repetition cards.
- **Domain-specific threads** — items on one topic scattered across chapters (compliance, ethics, a particular regulation). Collect them into a consolidation week.

## 6. Produce the assignment inventory

Close the curriculum with a quick-reference block listing, by category: the transfer thread in order, the graded milestones, the spaced-retrieval quizzes, each scattered thread, and the items worth extra reps when a specific error category persists. This is what a coach actually uses week to week.
