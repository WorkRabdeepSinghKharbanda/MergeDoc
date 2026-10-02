import type { BlogPost } from '../blogTypes'

export const EXPANDED_POSTS_2: BlogPost[] = [
  {
    slug: 'how-to-test-a-regex',
    title: 'How to Test a Regex Online Before You Ship It',
    description: 'A regex that looks right can still match too much, too little, or hang. Test it against real inputs in your browser before it reaches production.',
    date: '2026-04-02',
    updated: '2026-10-03',
    category: 'developer-tools',
    keywords: ['how to test a regex', 'regex tester online', 'test regular expression', 'greedy vs lazy regex', 'regex flags', 'javascript regex tester', 'regex edge cases'],
    relatedTools: ['/regex-tester', '/text-diff', '/json-formatter'],
    faqs: [
      { q: 'How do I test a regular expression online?', a: 'Paste your pattern into a regex tester, paste sample text below it, and look at what gets highlighted. Then try inputs that should not match, because a pattern that matches everything you expect can still be matching things you did not expect.' },
      { q: 'Why does my regex match too much text?', a: 'Almost always a greedy quantifier. `+` and `*` grab as much as they can, so `".+"` runs from the first quote to the last quote on the line. Switch to a lazy quantifier (`.+?`) or, better, a negated character class like `[^"]+`.' },
      { q: 'What do regex flags like g, i and m do?', a: '`g` finds every match instead of stopping at the first, `i` ignores case, and `m` makes `^` and `$` match at each line break instead of only the start and end of the whole string. `s` lets `.` match newlines, and `u` turns on full Unicode handling.' },
      { q: 'Is a regex tester the same in every language?', a: 'No. Regex syntax differs between engines. The MergeDoc tester uses your browser\'s JavaScript engine, so a pattern that works there will behave the same in JavaScript but may need changes for Python, PCRE, Java or Go.' },
      { q: 'Can a regex freeze my browser?', a: 'Yes. Nested quantifiers such as `(a+)+` can cause catastrophic backtracking on certain inputs, where matching time explodes. If the tab hangs while you type a pattern, that is a sign the pattern needs to be rewritten, not that the tool is broken.' },
      { q: 'Does my test text get uploaded anywhere?', a: 'No. The pattern and the sample text are processed in your browser by the JavaScript RegExp engine. Nothing is sent to a server, so it is safe to paste log lines or data you would not want to share.' }
    ],
    content: `A regular expression is quick to write and surprisingly easy to get subtly wrong. It matches too much, too little, or falls over on an input you never thought to try. The pattern that validated your three test strings in five seconds can still reject a real customer's email address or swallow half a log file.

The fix is not to become a regex expert. It is to test the pattern against a deliberate spread of inputs before it goes anywhere that matters, and to see the results highlighted rather than infer them from the pattern text. This guide covers how to do that, the handful of mistakes behind most regex bugs, and what the MergeDoc tester does and does not show you.

## Why regex bugs slip through

Reading a regex is a poor way to predict what it does. Behavior on edge cases (empty strings, trailing whitespace, accented characters, several matches on one line) is rarely obvious from the pattern itself. And most people test with the one example that prompted them to write the pattern in the first place, which is the input most likely to work.

Take the sample pattern that ships in the tester, \`\\w+@\\w+\\.\\w+\`. It matches \`hello@example.com\` perfectly. Feed it \`first.last@example.co.uk\` and it highlights only \`last@example.co\`, because \`\\w\` does not match dots and the pattern allows exactly one dot after the @ sign. The pattern is not wrong for the example it was written for. It is wrong for real data, and you only find that out by trying real data.

## How to test a regex step by step

1. Open the [Regex Tester](/regex-tester) and enter your pattern in the pattern box. Leave the flags field at \`g\` unless you know you need others.
2. Paste a block of sample text into the text area. Use real data if you can: a few lines of the actual log, CSV or form input the pattern will see.
3. Check the highlighted preview. Every match is highlighted in place, and a counter underneath tells you how many matches were found.
4. Add inputs designed to fail. Put in the near-miss, the empty value, the one with extra spaces. Confirm the pattern ignores them.
5. If the pattern is invalid, the tester shows the engine's error message in red. Read it; it usually names the unclosed group or bad escape.
6. Adjust and repeat until every typical case matches, every deliberate non-case does not, and the match count is what you expect.

## What to throw at your pattern

Before using a regex for form validation or data cleaning, run it against at least these:

- The typical case you designed for
- An empty or minimal input
- The same input with extra whitespace, punctuation or line breaks around it
- Two or more matches on a single line, to check that matches do not merge
- A value with unusual characters: accents, apostrophes, plus signs, a trailing dot
- A near-miss that must be rejected, such as \`user@@example.com\` or a phone number one digit short

Keep that list next to the pattern in a comment or test file. When someone changes the regex in six months, the list tells them what it was supposed to do.

## The greedy versus lazy trap

\`+\` and \`*\` are greedy: they match as much as they possibly can. Given the text \`"red" and "blue"\`, the pattern \`".+"\` matches the whole thing from the first quote to the last, not the two words separately. Adding \`?\` makes the quantifier lazy (\`".+?"\`), so it stops at the earliest closing quote.

Lazy quantifiers fix the symptom. The sturdier fix is to say what you actually mean: \`"[^"]+"\` matches a quote, then any run of non-quote characters, then a quote. It cannot overshoot, and it runs faster because the engine never has to backtrack.

## Flags change everything

The flags field is easy to ignore and responsible for a lot of confusion:

- **g** finds all matches rather than the first only. The tester always scans for every match so it can highlight them all, even if you remove this flag.
- **i** ignores case, so \`error\` matches \`ERROR\`.
- **m** makes \`^\` and \`$\` anchor at each line instead of the whole string. Without it, a pattern like \`^\\d+\` finds only a number at the very start of the text.
- **s** lets the dot match newlines, which it does not do by default.
- **u** enables full Unicode matching, which matters for emoji and characters outside the basic plane.

If a pattern works on one line of sample text but fails on a pasted multi-line block, check \`m\` first.

## Where typical regex testing falls short

Many online regex testers are fine, but a few habits are worth watching for. Some run your text through a server, which is a poor idea when the sample contains customer emails, tokens or log lines with internal hostnames. Some are cluttered with ads that shift the layout while you type. Others support a different regex flavor than the one you will run in production, so a pattern that passes in the tester fails in your code.

The MergeDoc tester runs entirely in your browser using the JavaScript \`RegExp\` engine, with no upload and no sign-up. That is a plus for privacy and an honest limit for compatibility. It is a JavaScript tester. It highlights matches and counts them, but it does not break out capture groups into a separate panel, and it will not tell you how Python's \`re\` or PCRE would behave. If your production language differs, use this to sanity-check the logic and then re-test in the real runtime.

## Everyday uses for a quick regex test

- **Cleaning an export.** Strip stray whitespace or pull order numbers out of a messy spreadsheet column before pasting it back.
- **Searching logs.** Check that a pattern for error codes catches \`E1042\` and \`E-1042\` but not a timestamp that happens to contain similar digits.
- **Validating a form field.** Confirm a postcode or product-code format accepts real examples before it blocks a customer at checkout.
- **Find-and-replace in an editor.** Test the search side first so a global replace does not mangle a file.
- **Comparing results.** After a replace, put the before and after into the [Text Diff Checker](/text-diff) to see exactly what changed.

## Mistakes to avoid

Do not rely on a regex for things regexes are bad at. Validating an email address fully is famously impractical; a loose check for one @ and a dot, followed by a confirmation email, beats an elaborate pattern. Parsing nested structures such as HTML or JSON is the same story. For JSON, run it through the [JSON Formatter](/json-formatter), which validates it properly instead.

Watch for unescaped special characters. A literal dot, plus, parenthesis or question mark needs a backslash. \`example.com\` also matches \`exampleXcom\`.

Avoid nested quantifiers like \`(a+)+\` or \`(.*)*\`. On a non-matching input they can trigger catastrophic backtracking. The tester evaluates on the page's main thread, so a runaway pattern can freeze the tab. If that happens, close it, and rewrite the pattern with a more specific character class.

Finally, anchor patterns used for validation. Without \`^\` and \`$\`, \`\\d{5}\` happily "validates" \`abc123456xyz\`.

One more habit pays off: change one thing at a time. If a pattern stops matching after an edit, you want to know which edit broke it. Build the pattern in small pieces, confirming each piece highlights what you expect before you add the next quantifier, group or anchor. A regex assembled in one go and debugged afterward takes much longer to fix than one grown a step at a time.

## Related reading

If you work with encoded or structured text, [Base64 Encoding: What It Is For](/blog/base64-encoding-what-its-for) and [CSV vs JSON](/blog/csv-vs-json-when-to-use-each) cover two formats where a regex is often the wrong tool. For another case where small checks prevent expensive mistakes, see [Minified JSON Debugging](/blog/minified-json-debugging). More utilities for this kind of work live in the [developer tools](/developer-tools) category.`
  },
  {
    slug: 'uuid-v4-explained',
    title: 'UUID v4 Explained: How Random IDs Avoid Collisions',
    description: 'What a UUID guarantees, why version 4 is the common default, how unlikely a collision really is, and when a UUID is the wrong choice for your database.',
    date: '2026-04-09',
    updated: '2026-10-03',
    category: 'developer-tools',
    keywords: ['uuid v4', 'uuid generator', 'what is a uuid', 'uuid collision probability', 'uuid vs auto increment', 'generate uuid online', 'guid vs uuid'],
    relatedTools: ['/uuid-generator', '/hash-generator', '/timestamp-converter'],
    faqs: [
      { q: 'What is a UUID v4?', a: 'A 128-bit identifier written as 32 hex digits in five groups, where 122 of the bits are random and the remaining six mark the version and variant. Version 4 has no timestamp, counter or machine ID inside it.' },
      { q: 'Can two UUID v4 values ever be the same?', a: 'In theory yes, in practice effectively never. You would need to generate roughly 2.7 quintillion (2.7 x 10^18) of them before reaching a 50 percent chance of a single collision. Real-world duplicates almost always come from a broken random source or copy-pasted values.' },
      { q: 'Is a UUID the same as a GUID?', a: 'Practically, yes. GUID is the name Microsoft uses for the same 128-bit format, and the two terms are used interchangeably. The textual form is the same 8-4-4-4-12 layout.' },
      { q: 'Should I use UUIDs or auto-increment integers as primary keys?', a: 'Use auto-increment if one database creates every ID and you want small, sequential keys. Use UUIDs if IDs are created by several systems without coordination or you do not want them to reveal how many rows exist. Random v4 keys can slow inserts on large indexed tables.' },
      { q: 'Are UUIDs secret or safe to use as passwords or tokens?', a: 'Not by themselves. A v4 UUID from a secure random source is hard to guess, but the format is public and UUIDs are often logged and shared. Use a dedicated session or API token with proper expiry and storage for anything that grants access.' },
      { q: 'How does the MergeDoc UUID generator create IDs?', a: 'It calls your browser\'s built-in crypto.randomUUID() function, which uses a cryptographically secure random source. You pick how many to generate, from 1 to 50, and nothing leaves the page.' }
    ],
    content: `A UUID (Universally Unique Identifier) is a 128-bit value written as 32 hexadecimal digits in five groups, like \`3f2b8c1e-9a4d-4e7b-8c21-5d6f0a1b2c3d\`. The interesting question is not what it looks like but how something generated on your laptop, with no central server and no coordination, can be trusted not to collide with one generated on someone else's machine a year later.

This guide explains how version 4 works, how safe it really is, where it is the wrong tool, and how to generate a batch in your browser.

## How a UUID v4 is built

Count the characters in the example: eight, four, four, four, then twelve, separated by hyphens. That is 32 hex digits, or 128 bits. In a version 4 UUID, six of those bits are fixed:

- The first digit of the third group is always **4**. That is the version marker. In the example above it is the \`4\` in \`4e7b\`.
- The first digit of the fourth group is always **8, 9, a or b**. That marks the variant (the standard layout). In the example it is the \`8\` in \`8c21\`.

The other **122 bits** are random. There is no counter, no timestamp, no MAC address and no machine name baked in, which is what separates v4 from older versions. Two v4 UUIDs created a millisecond apart on the same machine are unrelated to each other.

## Why collisions are not a practical worry

122 random bits means 2^122 possible values, roughly 5.3 x 10^36. By the birthday-paradox math, you would need to generate about 2.7 x 10^18 UUIDs, around 2.7 quintillion, before the chance of any pair colliding reaches 50 percent. At a billion UUIDs per second, that is around 85 years of continuous generation.

So when duplicates do appear in a real system, the cause is almost never bad luck. It is a weak random source (an old library seeded with the clock), a copied value, a restored backup replayed twice, or a bug that reuses one ID. Check those before blaming probability.

## How to generate UUIDs

1. Open the [UUID Generator](/uuid-generator).
2. Move the slider to the number you need, from 1 up to 50.
3. Generate the list. Each value comes from the browser's \`crypto.randomUUID()\`, a cryptographically secure source.
4. Copy the values into your seed file, test fixtures or spreadsheet.

If you need more than 50, generate in batches or use the same call in code: \`crypto.randomUUID()\` is built into modern browsers and Node.

## Benefits of random IDs

- **No coordination.** Any service, mobile app or offline client can mint an ID without asking a database for the next number. That makes merging data from several sources far simpler.
- **No information leak.** A sequential ID like \`/orders/1042\` tells a visitor roughly how many orders you have and invites them to try \`1041\`. A random ID does not.
- **Safe to create early.** A client can generate an ID before the record is saved, then use it in related records and retries without waiting for the server.
- **Uniform format.** Every system recognizes the 8-4-4-4-12 shape, so validation and logging are straightforward.

## When a UUID is the wrong choice

Random v4 UUIDs are not free. Be honest about the costs:

- **Index locality.** A random key scatters new rows across a B-tree index instead of appending them at the end. On large tables with a clustered primary key, that increases page splits and can slow inserts. A timestamp-ordered scheme or a plain auto-increment integer behaves better here. Newer UUID versions that put a timestamp first (such as version 7, defined in RFC 9562) exist for exactly this reason.
- **Storage size.** A UUID is 16 bytes as binary, and 36 characters if stored as text. A 4-byte or 8-byte integer is smaller, and every secondary index copies the key.
- **Readability.** Nobody reads a UUID over the phone. If support staff need to quote an ID, a short human-friendly reference code is kinder.
- **Not a secret.** A UUID is an identifier, not a credential. Do not treat "unguessable" as "authorized".

The deciding question is whether you need "no collisions with no coordination" or "sorts naturally by creation time". A v4 UUID solves only the first.

## Where typical ID tools fall short

Many UUID generator sites work fine, but some put a generate button under a wall of ads, cap you at one value per click, or run generation on a server so the IDs travel over the network. For test data that is harmless. For anything you plan to use as a real identifier, you would rather it be created locally. The MergeDoc generator runs in your browser with no sign-up, and it is simply a front end to the same \`crypto.randomUUID()\` you would call in code, so the results are equivalent.

## Everyday uses

- **Seeding a development database.** Generate 50 IDs for fixture rows instead of typing fake ones.
- **Naming uploaded files.** Rename user uploads to a UUID to avoid collisions and avoid exposing original filenames.
- **Tracking correlation IDs.** Paste a UUID into a request header so one transaction can be followed across logs.
- **Placeholder keys in a spreadsheet or mock API response.**
- **Idempotency keys.** Send a UUID with a payment or order request so a retry is not processed twice.

## Tips and mistakes

Store UUIDs in your database's native UUID or 16-byte binary type if it has one, not as a 36-character string, to save space and speed up comparisons. Keep the case consistent: the hex digits are case-insensitive, but comparing \`ABC\` with \`abc\` as strings will fail.

Do not truncate a UUID to make it shorter. Cutting it to 8 characters leaves 32 bits, and collisions then become realistic after tens of thousands of IDs.

Never use an older UUID generator that is not clear about its random source. If a library seeds from the clock, duplicates become genuinely possible. And remember that UUIDs are not a hash of anything: if you need a fingerprint of some content, use the [Hash Generator](/hash-generator) and read [SHA-256 Hash Explained](/blog/sha-256-hash-explained).

## UUID versions at a glance

You will meet several versions in the wild, and knowing which is which saves confusion when you read someone else's schema.

- **Version 1** combines a timestamp with a node identifier, historically the MAC address. It sorts roughly by time but can leak when and where it was generated.
- **Version 3 and 5** are name-based: the same namespace and name always produce the same UUID, using MD5 (v3) or SHA-1 (v5). Useful when you need a stable ID derived from, say, a URL.
- **Version 4** is random, and it is what browsers and most libraries produce by default.
- **Version 7** puts a Unix millisecond timestamp first, followed by random bits, so values sort by creation time while staying unguessable in the low bits.

If you are starting a new table and you expect heavy insert volume, version 7 is worth a look, provided your language or database library supports it. If you just need a unique label for a test row, v4 is perfectly good.

## Checking a UUID by eye

You can sanity-check a v4 UUID without a tool. Count 8-4-4-4-12 characters. Look at the first character of the third group: it must be 4. Look at the first character of the fourth group: it must be 8, 9, a or b. A value that fails either check was not produced by a standard v4 generator, which is a handy clue when you are debugging IDs that came from a hand-edited import.

## Related reading

For another time-related identifier question, see [Unix Timestamp Explained](/blog/unix-timestamp-explained), which covers the other common way to order records. If you need unguessable secrets rather than identifiers, read [Strong Passwords vs Passphrases](/blog/strong-passwords-vs-passphrases). For debugging payloads that carry these IDs, [Minified JSON Debugging](/blog/minified-json-debugging) helps, and the [developer tools](/developer-tools) page lists everything else in this category.`
  },
  {
    slug: 'loan-emi-formula-explained',
    title: 'Loan EMI Formula Explained, With a Worked Example',
    description: 'How the monthly payment formula works, why a longer term cuts the payment but raises total interest, and how to check your own numbers in a calculator.',
    date: '2026-04-17',
    updated: '2026-10-03',
    category: 'calculators',
    keywords: ['emi formula', 'loan payment formula', 'amortization explained', 'loan calculator', 'monthly payment calculator', 'how much interest on a loan', 'loan term vs interest'],
    relatedTools: ['/loan-calculator', '/percentage-calculator', '/sales-tax-calculator'],
    faqs: [
      { q: 'What is the EMI formula?', a: 'EMI = P x r x (1+r)^n / ((1+r)^n - 1), where P is the principal, r is the monthly interest rate (annual rate divided by 12, as a decimal) and n is the number of monthly payments. It gives a fixed payment that clears the loan exactly at the end.' },
      { q: 'How do I calculate monthly loan payments by hand?', a: 'Convert the annual rate to a monthly decimal, work out (1+r)^n, then plug the values into the formula. For anything beyond a rough check, enter the principal, rate and years into a loan calculator, which does the same arithmetic without rounding mistakes.' },
      { q: 'Why is most of my early payment interest?', a: 'Interest is charged on the outstanding balance, which is largest at the start. A fixed payment is split into that month\'s interest first and the remainder goes to principal. As the balance falls, the interest share shrinks and the principal share grows.' },
      { q: 'Does a longer loan term save money?', a: 'It lowers the monthly payment but usually raises the total interest paid, because the balance stays outstanding for longer. A shorter term costs more each month and less overall. Which is better depends on what your budget can sustain.' },
      { q: 'What if the interest rate is variable or there are fees?', a: 'The formula assumes one fixed rate for the whole term and no fees. A variable-rate loan, an arrangement fee, or insurance changes the real cost, so treat the calculator\'s figure as an estimate and ask your lender for the full schedule.' },
      { q: 'Is the MergeDoc loan calculator financial advice?', a: 'No. It is an arithmetic tool that shows the monthly payment, total interest and total paid for the numbers you enter. It is not financial advice, and lender quotes can differ because of fees, rounding rules and rate changes.' }
    ],
    content: `Every loan or EMI calculator, including the [Loan & EMI Calculator](/loan-calculator) on this site, runs the same standard amortization formula. Once you see what the formula does, three things that seem puzzling become obvious: why a longer loan has a smaller payment, why it costs more overall, and why the first year of payments barely dents the balance.

This is an explanation of the arithmetic, not financial advice. Real loans have fees, variable rates and lender-specific rounding that a simple formula leaves out.

## The formula

For a fixed-rate loan repaid in equal monthly installments, the payment is:

\`M = P × [r(1+r)^n] / [(1+r)^n − 1]\`

- **P** is the principal, the amount you borrow.
- **r** is the monthly interest rate: the annual rate divided by 12, written as a decimal. A 6.5 percent annual rate gives r = 0.065 / 12 ≈ 0.005417.
- **n** is the total number of monthly payments: years times 12.

The result is a single fixed payment that, if made every month, brings the balance to exactly zero at the end of the term.

## A worked example

Borrow 20,000 at 6.5 percent a year over 5 years. Here r ≈ 0.005417 and n = 60.

1. Work out (1+r)^60. That is 1.005417 multiplied by itself 60 times, about 1.3828.
2. The top of the fraction is r × 1.3828 ≈ 0.007490.
3. The bottom is 1.3828 − 1 = 0.3828.
4. Divide: 0.007490 / 0.3828 ≈ 0.019566.
5. Multiply by the principal: 20,000 × 0.019566 ≈ **391.3** per month.

Over 60 payments you pay about 23,479 in total, so roughly 3,479 of it is interest. Run the same inputs through the calculator and you should land within a few cents; any difference is rounding.

## Why a longer term lowers the payment but raises the cost

Change only the term to 10 years (n = 120) and the same formula gives a payment of about 227.1. The monthly bill drops by over 40 percent. But 120 payments of 227.1 add up to roughly 27,253, so interest is about 7,253. That is more than double the 5-year interest figure.

The mechanism is simple. A longer n spreads the same principal over more installments, so each is smaller. But the unpaid balance stays above zero for longer, and interest is charged on whatever is outstanding each month. More months with a high balance means more interest. A 30-year mortgage has a lower payment than a 15-year one for the same amount and rate, and costs far more in interest by the end.

## Why early payments are mostly interest

Take the first payment of the 5-year example. Interest for month one is the full balance times the monthly rate: 20,000 × 0.005417 ≈ 108.3. The payment is 391.3, so only about 283 goes to principal. After that the balance is slightly lower, so next month's interest is slightly lower, and a little more of the same payment reduces principal. The split drifts, month by month, from mostly interest to mostly principal.

On the 10-year version the effect is stronger: the first payment of 227.1 has the same 108.3 of interest, which is nearly half. This is why paying a bit extra early has an outsized effect. Every extra unit of principal you clear early stops accruing interest for all the remaining months.

## How to check your own numbers

1. Open the [Loan & EMI Calculator](/loan-calculator).
2. Enter the loan amount (principal), the annual interest rate and the term in years.
3. Read the monthly payment, total interest and total paid shown in the results.
4. Change only the term, then only the rate, and compare. Seeing what one variable does on its own is the fastest way to build intuition.
5. If you want to know what a small rate difference is worth, use the [Percentage Calculator](/percentage-calculator) to express the change as a percentage of the total.

## Where typical loan calculators fall short

Some online calculators ask for an email address before they show a full result. Others bury the answer under comparison widgets, lead forms or affiliate offers, or are tied to one lender's products and quietly assume that lender's fee structure. Those are fine for shopping, less so for neutral arithmetic. This one runs in your browser: the numbers you type stay on the page, there is no sign-up, and it computes the standard formula and nothing else.

Its honest limit is the same as the formula's. It assumes a fixed rate for the entire term, equal monthly payments, no fees, no insurance and no extra payments. Real quotes from a lender can differ, and the lender's own schedule is what you are legally bound by.

## Everyday uses

- **Comparing a car loan at 3, 4 and 5 years.** See how much extra interest the lower payment buys.
- **Sizing a home loan.** Test what a half-point rate change does to the payment before talking to a bank.
- **Checking a quote.** If a lender's monthly figure is noticeably higher than the formula suggests, ask what fees or insurance are included.
- **Planning an early payoff.** Understand why overpaying in the first years saves the most.
- **Student or personal loans.** Check whether the advertised payment matches the stated rate and term.

## Tips and mistakes to avoid

Do not enter the annual rate as the monthly rate. Dividing by 12 is the single most common manual error. Make sure the term is in months in the formula and in years in the calculator.

Compare total cost, not only the monthly payment. A low payment is attractive, but check the "total paid" line before accepting a longer term.

Watch for rates quoted as "flat" in some markets. A flat rate applies to the original principal for the whole term and works out to a much higher effective rate than the same number used with the reducing-balance formula above. Ask the lender for the annual percentage rate (APR) on a reducing balance basis.

Finally, rounding: lenders round each payment to the cent and adjust the last one, so your final installment may differ by a few cents from the formula.

## What the formula leaves out

The textbook formula is a clean model, and real loans add layers on top of it. Knowing what they are helps you read a lender's offer with the right questions in mind.

- **Fees.** Arrangement, processing or early-repayment fees are not in the formula. Ask for the total cost of credit, not just the rate.
- **Insurance and add-ons.** Payment protection and similar products raise the real monthly outflow without changing the amortization maths.
- **Variable rates.** If the rate resets, r changes and the payment is recalculated on the remaining balance and remaining term. The formula still applies, but only one stretch at a time.
- **Interest-only periods.** During these, you pay just the interest and the balance does not fall, so the later payments are higher than a standard schedule would give.
- **Day-count conventions.** Some lenders charge daily interest, so month length slightly changes the interest portion.

None of that makes the formula useless. It gives you a baseline. If a quote is far above the baseline for the same principal, rate and term, the difference is fees, add-ons or a different rate than the one advertised, and that is a question worth asking before you sign anything.

## Reading an amortization schedule

Lenders can provide a month-by-month table. Check the first row: the interest column should equal the balance times the monthly rate. Check the last row: the balance should reach zero, give or take a few cents of rounding. If both hold, the schedule follows the standard model.

## Related reading

If you are also working with percentages in other situations, the [Sales Tax Calculator](/sales-tax-calculator) works on the same kind of arithmetic. To keep paperwork organized around a loan or a freelance project, see [Create a Freelance Invoice](/blog/create-a-freelance-invoice). For files you need to send to a lender, [Merge PDFs Without Uploading](/blog/merge-pdf-without-uploading) explains how to bundle statements without handing them to a third-party server. The [calculators](/calculators) category has the rest.`
  },
  {
    slug: 'base64-encoding-what-its-for',
    title: 'Base64 Encoding: What It Does and Why It Is Not Security',
    description: 'Base64 turns binary data into plain text so it can travel through text-only systems. It protects nothing. Here is how it works and when to use it.',
    date: '2026-04-24',
    updated: '2026-10-03',
    category: 'developer-tools',
    keywords: ['base64 encoding', 'base64 decode online', 'is base64 encryption', 'base64 vs encryption', 'base64url', 'data uri base64', 'base64 encoder'],
    relatedTools: ['/base64-tool', '/text-encryptor', '/url-encoder'],
    faqs: [
      { q: 'What is Base64 encoding used for?', a: 'It represents binary data using 64 printable ASCII characters so it can pass through systems built for text: email attachments, JSON fields, data URIs in HTML and CSS, and parts of HTTP headers and tokens.' },
      { q: 'Is Base64 encryption?', a: 'No. Base64 is a reversible format conversion with no key and no secret. Anyone can decode it in a second, so it provides zero confidentiality. Use real encryption such as AES-256 when you need to keep data private.' },
      { q: 'Why does Base64 make data bigger?', a: 'Every 3 bytes of input become 4 characters of output, so the encoded form is about 33 percent larger, plus a little padding. That overhead is the price of being text-safe.' },
      { q: 'What does the = at the end of a Base64 string mean?', a: 'It is padding. Base64 works in blocks of 3 bytes, and when the input is not a multiple of 3, one or two = signs fill the last block so the output length is a multiple of 4.' },
      { q: 'What is the difference between Base64 and Base64url?', a: 'Base64url swaps + and / for - and _ and often drops the = padding, so the result is safe inside URLs and filenames. JWT tokens use it. Standard Base64 with + or / in a URL can be misread.' },
      { q: 'Can I decode a JWT with a Base64 decoder?', a: 'The header and payload of a JWT are Base64url-encoded JSON, so they are readable, which is why you should never put secrets in them. The signature part is what proves the token was not altered, and it cannot be forged by decoding.' }
    ],
    content: `Base64 shows up constantly: in image data URIs, in email attachments, in API tokens, in the \`Authorization\` header of a basic-auth request. Because the output looks like gibberish, people routinely assume it is encrypted. It is not. Base64 is a format conversion, and understanding the difference prevents a surprisingly common class of security mistakes.

## The problem Base64 solves

Plenty of systems were designed to carry text, not arbitrary bytes. Early email protocols, XML and JSON fields, URLs and many logging pipelines can mangle, truncate or reject raw binary: a stray byte might be read as a line ending or a control character. Base64 sidesteps this by re-encoding any binary data as a string drawn from just 64 safe characters: A–Z, a–z, 0–9, plus \`+\` and \`/\`.

The mechanics are simple. Take the input three bytes (24 bits) at a time and split them into four groups of six bits. Each six-bit value (0 to 63) maps to one character in the alphabet. That is why 3 bytes become 4 characters, and why the output is roughly 33 percent larger than the input.

A tiny example: the text \`Man\` is three bytes, and it encodes to \`TWFu\`. The text \`Hello\` is five bytes, which is not a multiple of three, so the last block is padded with \`=\` and you get \`SGVsbG8=\`.

## How to encode and decode Base64

1. Open the [Base64 Encoder/Decoder](/base64-tool).
2. Paste your text into the input box.
3. Click Encode to convert plain text to Base64, or Decode to turn a Base64 string back into text.
4. Copy the result with the copy button.
5. If decoding fails, you will see an "Invalid Base64 input" message. Check for missing characters, stray spaces, or a Base64url string that uses \`-\` and \`_\` instead of \`+\` and \`/\`.

The tool handles ordinary text, including accented letters and emoji, because it encodes the text as UTF-8 before converting. It is designed for text. If you need to encode an entire file such as an image, a different approach is required.

## Why Base64 is not security

There is no key and no secret anywhere in the process. The mapping from bytes to characters is public, fixed and reversible by anyone. Paste \`cGFzc3dvcmQxMjM=\` into a decoder and you get \`password123\` immediately. That is why basic authentication over plain HTTP is unsafe: the credentials are only Base64-encoded, so anyone who can see the traffic can read them.

A surprising number of real incidents have started with someone Base64-encoding an API key or password and treating that as protection. It offers the same protection as writing the secret in plain text and reversing the letters.

If you need confidentiality, you need encryption: an algorithm like AES with a secret key. The [Text Encryptor](/text-encryptor) on this site uses AES-256-GCM with a passphrase-derived key. (Its output is itself packed as Base64 so it can be copied as text, which is the legitimate use of the format: Base64 as the wrapper, encryption as the protection.) For the full picture, read [AES-256 Text Encryption Explained](/blog/aes-256-text-encryption-explained).

## Where Base64 is the right tool

- **Data URIs.** Embedding a small image directly in HTML or CSS as \`data:image/png;base64,...\` saves a request for tiny icons.
- **Email attachments.** MIME encodes binary attachments as Base64 so they survive text-based mail transport.
- **JSON and XML payloads.** If an API has to carry a small binary blob inside a text field, Base64 is the standard approach.
- **Tokens.** JWT headers and payloads are Base64url-encoded JSON, so they travel safely in URLs and headers.
- **Config and certificates.** PEM-format certificates and keys are Base64 between the BEGIN and END lines.

## Where typical Base64 tools fall short

Many online encoders send your input to a server for processing, which is a bad habit when the text you are decoding is a token, a config value or something copied from a production log. Others add ads around the output box, cap the input size, or treat anything non-ASCII incorrectly so that accented characters decode as garbage. The MergeDoc tool runs in your browser, with no upload, no sign-up and UTF-8 handled correctly. Its limits are that it works on text input rather than whole files, and it does not auto-detect or convert the URL-safe variant for you, so swap \`-\` and \`_\` for \`+\` and \`/\` first if you hit an error.

## Everyday uses

- **Reading a basic-auth header.** Decode the value after "Basic " to see the username:password pair and confirm what a client is sending.
- **Inspecting a JWT.** Decode the middle section to read its claims and see when it expires, for example together with the [Timestamp Converter](/timestamp-converter).
- **Checking a data URI.** Decode the string to confirm what is embedded.
- **Preparing text for a JSON field** that must hold special characters or line breaks.
- **Debugging an encoded string** pasted into a support ticket.

## Tips and mistakes to avoid

Never treat Base64 as hiding. If a secret must live in a config file, encrypt it or keep it in a proper secrets manager. Do not post Base64 strings of credentials in public places on the assumption that nobody will decode them; bots do exactly that.

Mind the size. Base64 inflates data by a third, so inlining a 200 KB image as a data URI makes the HTML 270 KB and removes the browser's ability to cache the image separately. Reserve data URIs for small icons.

Do not confuse Base64 with URL encoding. Base64 changes the representation of bytes; percent-encoding makes characters safe inside a URL. They solve different problems, and if you need the second one, use the [URL Encoder/Decoder](/url-encoder).

Finally, remember padding and whitespace. Some decoders require the trailing \`=\`; others choke on line breaks. If a decode fails, check those first.

## Reading a Base64 string

With a little practice you can spot Base64 and guess its content. A string made only of letters, digits, plus and slash, ending in one or two equals signs, is very likely Base64. Its length is a multiple of four if padding is present. Some tell-tale starts help:

- **eyJ** at the start usually means Base64-encoded JSON beginning with an open brace and a quote. This is how every JWT header and payload begins.
- **iVBORw0KGgo** is the start of a PNG image.
- **/9j/** is the start of a JPEG.
- **JVBERi0** is the start of a PDF file.
- **UEsDB** is the start of a ZIP archive, which includes Office documents.

Recognising these tells you what you are looking at before you decode it, and warns you when something is not what it claims to be. A "text" field that starts with the PNG signature is an image, not a string.

## Size and performance

Because every three bytes become four characters, Base64 inflates payloads by about a third before any compression. On HTTP responses that are gzip-compressed, the extra size shrinks a lot, but you still pay CPU to encode and decode and you lose streaming. For large files, send them as binary with a normal upload or download, and keep Base64 for small values where convenience beats efficiency.

A last practical point: always decode before you trust. If a webhook, config file or user-supplied field arrives Base64-encoded, decode it and inspect the result before passing it to anything that executes or renders it. Encoding does not make content safe or sanitized; it only changes how the bytes are written down.

## Related reading

For a related misunderstanding, see [SHA-256 Hash Explained](/blog/sha-256-hash-explained), which covers why hashing is neither encoding nor encryption. [Why Client-Side Tools Matter](/blog/why-client-side-tools-matter) explains why sensitive strings are better decoded locally. And if you want to test patterns that extract Base64 chunks from text, [How to Test a Regex](/blog/how-to-test-a-regex) is a good companion. The [developer tools](/developer-tools) page lists the full set.`
  },
  {
    slug: 'flesch-reading-ease-explained',
    title: 'Flesch Reading Ease Score: What the Number Means',
    description: 'How the Flesch Reading Ease formula works, what each score range means, how to improve a low score, and why a readability number is only a rough guide.',
    date: '2026-05-01',
    updated: '2026-10-03',
    category: 'text-writing-tools',
    keywords: ['flesch reading ease', 'readability score', 'flesch reading ease formula', 'reading time calculator', 'readability checker', 'plain english score', 'how to improve readability'],
    relatedTools: ['/reading-time', '/word-counter', '/word-frequency-analyzer'],
    faqs: [
      { q: 'What is a good Flesch Reading Ease score?', a: 'For general audiences, 60 to 70 is considered plain English. Scores of 70 and above are easy; scores below 50 are difficult and suit specialist or academic readers. Aim for the level of your actual audience, not the highest number.' },
      { q: 'What is the Flesch Reading Ease formula?', a: '206.835 − 1.015 × (words ÷ sentences) − 84.6 × (syllables ÷ words). Longer sentences and more syllables per word lower the score; shorter sentences and shorter words raise it.' },
      { q: 'Can the score be above 100 or below 0?', a: 'Yes. A string of very short words in very short sentences can exceed 100, and dense legal or academic text can go negative. The 0 to 100 scale is a typical range, not a hard limit.' },
      { q: 'How is reading time calculated?', a: 'By dividing the word count by an assumed reading speed. The MergeDoc tool uses 200 words per minute. Real speeds vary with the reader and the material, so treat the figure as a rough estimate.' },
      { q: 'Does Flesch Reading Ease work for other languages?', a: 'The formula was calibrated on English and the MergeDoc syllable counter is built for English spelling. Results for other languages are not meaningful, although the sentence-length measurement still shows how long your sentences run.' },
      { q: 'Is a high readability score always better?', a: 'No. The formula only measures sentence length and syllables. Short, simple-looking sentences can still be unclear or wrong, and chopping every sentence in half to raise the number tends to make writing choppy rather than better.' }
    ],
    content: `The [Reading Time & Readability](/reading-time) tool reports an estimated reading time and a Flesch Reading Ease score for any text you paste in. The reading time is easy to understand. The score looks arbitrary until you know what it is measuring, and it becomes much more useful once you also know what it ignores.

## What the Flesch Reading Ease score is

Rudolph Flesch published the formula in 1948 as a way to estimate how difficult a passage is to read, using two things that can be counted mechanically:

- **Average sentence length**, measured in words per sentence.
- **Average word length**, measured in syllables per word.

The formula is:

\`206.835 − 1.015 × (words ÷ sentences) − 84.6 × (syllables ÷ words)\`

Longer sentences subtract more. Longer words subtract much more, since the syllable term carries a bigger weight. The scale typically runs from 0 to 100, with higher meaning easier. It is not capped, so very short words in very short sentences can score above 100, while dense legal prose can dip below zero.

## What the score ranges mean

The commonly cited bands are:

- **90–100:** very easy; roughly fifth-grade level.
- **80–90:** easy.
- **70–80:** fairly easy.
- **60–70:** plain English, understood by most adults and teens.
- **50–60:** fairly difficult.
- **30–50:** difficult; roughly college-level reading.
- **0–30:** very difficult; specialist, academic or legal writing.

Most web content aimed at a general audience sits comfortably between 60 and 70. Technical documentation for engineers can reasonably sit lower. A children's story should sit much higher. There is no universally correct number, only a number that matches your readers.

## How to check your text

1. Open [Reading Time & Readability](/reading-time).
2. Paste a paragraph, a page or a full draft into the text box.
3. Read the three results: estimated reading time, Flesch Reading Ease score and the descriptive level.
4. Edit the draft: split your longest sentences and swap long words for shorter ones where the meaning survives.
5. Paste the new version and compare. The change in score is more informative than the absolute value.

Reading time is the word count divided by 200 words per minute, so a 1,000-word article shows five minutes. Real speeds vary with the reader and the material, so use it as a ballpark, for example to add a "5 min read" label. If you need exact counts of words, sentences and characters first, the [Word Counter](/word-counter) gives them.

## Benefits of checking readability

- **A fast, objective second opinion.** Authors are poor judges of their own prose. A number flags paragraphs that deserve another look.
- **A way to compare drafts.** Did the rewrite make the text denser or lighter? The score answers that in a second.
- **Consistency across a team.** Pick a target range for help articles and keep every writer within it.
- **Accessibility.** Plain language helps readers with dyslexia, with limited attention, or who are reading in a second language.

## What the formula deliberately ignores

Flesch only counts sentence length and syllables. It has no concept of vocabulary difficulty, jargon, ambiguity, structure or whether the ideas themselves are complex. "Notwithstanding the aforementioned" scores worse than "Use the second form", but a short sentence like "The party of the first part shall indemnify the party of the second part" is a mouthful of legal meaning that a short-word score will understate.

The syllable count itself is an approximation. The tool counts vowel groups and adjusts for a silent final "e", which is accurate on most English words but wrong on some: it will miscount words like "queue", "area" or "business" occasionally. Treat the score as accurate to within a few points, not exact.

## Where typical readability tools fall short

Many readability checkers live inside paid writing platforms, require an account, or send your draft to a server for analysis, which is awkward when the text is an unpublished article, a client document or an internal policy. Some reduce everything to a single grade with no explanation of how it was reached. The MergeDoc tool runs in your browser: nothing is uploaded, there is no sign-up, and the formula is the standard one shown above. Its limits are honest ones. It is English-only, it uses a heuristic syllable counter, and it reports only the Flesch score and reading time rather than a full suite of metrics.

## Everyday uses

- **Blog posts and web copy.** Check that a landing page reads at a plain-English level before publishing.
- **Emails to customers.** Run a long announcement through it and break up whatever scores lowest.
- **Student essays and reports.** See whether the draft is wordier than the assignment audience needs.
- **Policies and terms.** Find the clauses that are hardest going and rewrite them first.
- **Spotting repetitive vocabulary.** Pair it with the [Word Frequency Analyzer](/word-frequency-analyzer) to catch overused words.

## Tips and mistakes to avoid

Do not chase a number. Chopping every sentence in half to inflate the score produces staccato writing that is tiring to read. Vary sentence length on purpose: a long sentence that builds an idea, followed by a short one that lands it, reads better than a uniform rhythm.

Score in chunks. A single score for a 5,000-word document hides its worst section. Paste in a section at a time to find the hard parts.

Remove headings, code samples and lists before measuring if they are not real prose. Fragments without full stops can be counted as one enormous sentence and drag the score down.

Know your audience. A 45 is fine for a specialist journal and a problem for a how-to guide for beginners.

Finally, read the text aloud. If you stumble, the formula may not have noticed, but your readers will.

## A quick worked example

Take the sentence: "The cat sat on the mat." That is 6 words, 1 sentence and 6 syllables, so words per sentence is 6 and syllables per word is 1. The score comes out at 206.835 − 6.09 − 84.6 = about 116. That is above the usual 0 to 100 range, which shows why the scale is a guide and not a hard scale.

Now try: "Notwithstanding the aforementioned provisions, the undersigned acknowledges responsibility." That is 8 words, 1 sentence and about 27 syllables. Words per sentence is 8 and syllables per word is about 3.4, so the score is 206.835 − 8.12 − 285.5 = about −87. Same grammar, completely different feel, and the score captures the difference.

## How to raise a low score without ruining the writing

- Split sentences at conjunctions such as "and", "but" and "which" when each half can stand alone.
- Replace long Latinate words with short ones when the meaning is unchanged: "use" for "utilize", "help" for "facilitate", "start" for "commence".
- Cut filler phrases like "in order to" and "it is important to note that".
- Keep the hard words you genuinely need. A technical term your audience knows is not a defect.

Re-run the tool after each pass and stop when the writing reads naturally, not when the number peaks.

Finally, remember that readability is relative to the reader. The same score can be perfect for a technical audience that knows the vocabulary and poor for newcomers who do not. If you can, test a draft on one real person from your target audience and ask where they slowed down. Their answer beats any formula, and the score then helps you check that the fix worked.

## Related reading

If you write about tools and technical topics, [Minified JSON Debugging](/blog/minified-json-debugging) is a good example of a how-to written for a general technical audience. For another kind of timed work, see [The Pomodoro Technique: Why 25 Minutes Works](/blog/pomodoro-technique-why-25-minutes). And if your writing includes numbers worth checking, [Color Contrast and WCAG](/blog/wcag-color-contrast-explained) covers the other half of readability: whether the text can actually be seen. The [text tools](/text-tools) category has more.`
  },
  {
    slug: 'wcag-color-contrast-explained',
    title: 'WCAG Color Contrast Ratio Explained: AA vs AAA',
    description: 'What a contrast ratio measures, the 4.5:1, 3:1 and 7:1 WCAG thresholds, and how to check a color pair so light gray text does not fail accessibility.',
    date: '2026-05-08',
    updated: '2026-10-03',
    category: 'developer-tools',
    keywords: ['wcag contrast ratio', 'color contrast checker', 'wcag aa vs aaa', '4.5:1 contrast', 'accessible text color', 'light gray text accessibility', 'relative luminance'],
    relatedTools: ['/color-tool', '/color-blind-simulator', '/color-palette-extractor'],
    faqs: [
      { q: 'What contrast ratio does WCAG AA require?', a: 'At least 4.5:1 for normal-size text and 3:1 for large text. Large means roughly 18 point (24 pixels) and up, or 14 point (about 18.7 pixels) and up if bold. Level AAA raises these to 7:1 and 4.5:1.' },
      { q: 'How is the WCAG contrast ratio calculated?', a: 'It is (L1 + 0.05) / (L2 + 0.05), where L1 is the relative luminance of the lighter color and L2 of the darker, each on a 0 to 1 scale. The result runs from 1:1 (no contrast) to 21:1 (black on white).' },
      { q: 'Is gray text on a white background accessible?', a: 'Only if it is dark enough. #767676 on white is about 4.5:1, the lightest gray that passes AA for body text. #999999 on white is about 2.8:1 and fails.' },
      { q: 'Do icons and buttons need contrast too?', a: 'Yes. WCAG 2.1 asks for at least 3:1 for user interface components and meaningful graphics, such as the border of an input field or an icon that carries information.' },
      { q: 'Does passing contrast mean my design is accessible?', a: 'No. Contrast is one requirement among many. Also check that color is not the only way information is shown, test with color blindness in mind, and make sure text remains readable when zoomed or in dark mode.' },
      { q: 'Does the Color Converter check contrast for any two colors?', a: 'Yes. Enter a foreground and a background color and it shows the ratio plus pass or fail for AA normal text, AA large text and AAA normal text. It calculates from the exact colors you give it, so check each state of a design, not just the default.' }
    ],
    content: `Low-contrast text is one of the most common accessibility failures on the web, and one of the cheapest to catch. Light gray on white is the classic offender: it looks refined in a mockup and becomes a squint on a phone in daylight. The Web Content Accessibility Guidelines (WCAG) turn "enough contrast" into a number you can test, which means you never have to argue about it by eye.

## What a contrast ratio measures

WCAG compares the **relative luminance** of two colors: roughly, how bright each one is as the human eye perceives it, on a scale from 0 (black) to 1 (white). The ratio is:

\`(L1 + 0.05) / (L2 + 0.05)\`

where L1 is the lighter color's luminance and L2 the darker one's. The 0.05 stops the math from blowing up near black. The result runs from **1:1** (identical colors, invisible text) to **21:1** (pure black on pure white).

Relative luminance is not just an average of red, green and blue. Green contributes far more to perceived brightness than red, and red more than blue, and the values are first converted out of the screen's gamma curve. That is why two colors with similar-looking hex codes can have very different contrast ratios, and why guessing is unreliable.

## The thresholds that matter

- **4.5:1** is the minimum for normal-size text at WCAG level AA. This is the baseline most laws and organizational policies point to.
- **3:1** is the AA minimum for large text: roughly 18 point (24 pixels) or bigger, or 14 point (about 18.7 pixels) and bold. Big, heavy letters are easier to distinguish.
- **7:1** is the stricter AAA level for normal text (4.5:1 for large), aimed at low-vision readers and difficult viewing conditions.
- **3:1** is also the minimum for user-interface components and meaningful graphics under WCAG 2.1: input borders, focus rings, chart lines and icons that carry information.

Purely decorative elements and logos are exempt, as is disabled UI. Placeholder text is not automatically exempt, which catches a lot of forms out.

## How to check a color pair

1. Open the [Color Converter](/color-tool).
2. Enter your text color and your background color as HEX, RGB or HSL. The tool converts between the three.
3. Read the ratio and the three verdicts: AA normal text, AA large text and AAA normal text.
4. If the pair fails, darken the text (or lighten the background) a step at a time and re-check until it passes. Keep the hue and adjust only the lightness to preserve your brand color.
5. Repeat for every state: hover, disabled-looking-but-readable, error messages, text over gradients and text over images.

A quick benchmark worth memorizing: **#767676 on white is about 4.5:1**, the lightest neutral gray that passes AA for body text. **#999999 on white is about 2.8:1** and fails. If your "subtle" gray is lighter than #767676, it fails on white.

## Why this matters beyond compliance

Low contrast does not only affect people with diagnosed vision impairments. It affects anyone reading on a low-quality screen, in bright sunlight, with the brightness turned down to save battery, or simply tired at the end of the day. A design that looks fine on a calibrated monitor in a dim office can be nearly unreadable in the conditions most people actually use their phones. Meeting AA also lowers legal risk, since many accessibility laws and procurement requirements reference WCAG 2.x AA.

## Where typical contrast checkers fall short

Browser developer tools will show a ratio for text on a page, and they are great for checking a live site. But a lot of web-based contrast checkers want a sign-up, load slowly under ads, or only check one pair at a time with no conversion between color formats, which is a nuisance when your design file uses HSL and your CSS uses HEX. The MergeDoc [Color Converter](/color-tool) does the conversion and the contrast math together in the browser, with no upload and no account.

Its limits matter. It evaluates two flat colors. It does not sample text over a photo or gradient, it does not account for semi-transparent colors, and it does not measure the newer APCA model that some design teams are experimenting with, which gives different answers. For text on images, test the worst-case spot where the text overlaps the lightest or darkest part of the picture.

## Everyday uses

- **Choosing a brand palette.** Check text, button and link colors against each background before the brand guide is finalized.
- **Fixing a design handoff.** Verify the designer's gray caption text before developers implement it.
- **Auditing a site.** Check the footer links, placeholder text and form error messages, which are the usual suspects.
- **Building a dark mode.** Contrast needs re-checking: a color that passes on white may fail on near-black.
- **Preparing a presentation.** Slides are read from the back of rooms with projectors that wash out light colors.

## Tips and mistakes to avoid

Do not rely on color alone to carry meaning. A red error with no icon or text label is invisible to some color-blind users. Use the [Color Blindness Simulator](/color-blind-simulator) to preview how an image or interface appears under the common deficiencies, and add a second cue such as an icon, underline or text.

Check hover and focus states separately. A link that passes at rest can fail when the hover color is lighter.

Do not forget text sizes. A pair that passes at 3:1 only qualifies if the text really is large or bold-large. Body copy at 16 pixels needs 4.5:1.

Pulling a palette from a photograph? The [Color Palette Extractor](/color-palette-extractor) finds dominant colors, but extracted colors are not guaranteed to be readable together, so run each text and background pairing through the checker.

Last, treat the ratio as a floor. Passing 4.5:1 by a hair on a small light-weight font can still be tiring. If you can comfortably go higher, do.

## A worked example

Suppose your caption text is #888888 on a white background. Convert each channel to linear light and weight them: the gray works out to a relative luminance of about 0.25, and white is exactly 1. The ratio is (1 + 0.05) / (0.25 + 0.05) = 1.05 / 0.30 = about 3.5:1. That passes the large-text threshold of 3:1 but fails the 4.5:1 needed for normal body text. Darken the gray to #767676 and the ratio rises to roughly 4.5:1, enough for AA.

The same logic works in reverse for light text on dark. White on #767676 gives about 4.5:1, so mid-gray backgrounds are an awkward zone where neither black nor white text is especially comfortable. Check both before you commit to one.

## Where WCAG contrast has limits

The WCAG 2.x formula is simple and widely required, but it is not perfect. It treats light-on-dark and dark-on-light symmetrically, which does not match how people actually perceive them, and it ignores font weight and size beyond the single large-text switch. Some teams also test against the proposed APCA model for a second opinion. Use the WCAG ratio as your compliance baseline, since that is what audits and laws reference, and use your own eyes on a real phone as the final check. A pair that scores 4.6:1 in a thin 12-pixel font may still be poor to read.

If you are working to a deadline, prioritize in this order: body text, links, form labels and error messages, then buttons and icons, then decorative text. Fixing those first covers the content people actually need to read and click. Record the approved color pairs in your design tokens so developers reuse them instead of picking a new gray each time.

## Related reading

Contrast is the visual half of readability. The textual half is covered in [Flesch Reading Ease Explained](/blog/flesch-reading-ease-explained). For design-side utilities, [CSS Gradients, Shadows and Border Radius](/blog/css-gradients-shadows-border-radius-guide) shows how to build effects that keep text legible, and [Resize Images Without Losing Quality](/blog/resize-image-without-losing-quality) covers preparing the graphics that sit behind it. The [developer tools](/developer-tools) category holds the rest of the toolbox.`
  },
  {
    slug: 'pomodoro-technique-why-25-minutes',
    title: 'The Pomodoro Technique: Why 25 Minutes Works',
    description: 'Why the Pomodoro Technique uses 25-minute focus blocks and 5-minute breaks, how to run a session step by step, and when to adjust the timing.',
    date: '2026-05-15',
    updated: '2026-10-03',
    category: 'fun-productivity-tools',
    keywords: ['pomodoro technique', 'pomodoro timer online', '25 minute focus timer', 'how long is a pomodoro', 'pomodoro technique steps', 'focus timer', 'pomodoro break length'],
    relatedTools: ['/pomodoro-timer', '/todo-list', '/countdown-stopwatch'],
    faqs: [
      { q: 'What is the Pomodoro Technique?', a: 'A time-management method where you work with full focus for a fixed interval, traditionally 25 minutes, then take a short 5-minute break. After about four rounds you take a longer break. It was developed by Francesco Cirillo in the late 1980s and named after a tomato-shaped kitchen timer.' },
      { q: 'Why is a pomodoro 25 minutes?', a: '25 minutes was what Cirillo found practical with his kitchen timer. It is long enough to make real progress and short enough that most people can stay focused. The number is a starting point rather than a scientific constant, so adjust it to your work.' },
      { q: 'How long should the breaks be?', a: 'Traditionally 5 minutes between pomodoros and 15 to 30 minutes after every fourth one. Step away from your screen during the break: stand up, stretch, get water. Checking email or social media does not rest your attention.' },
      { q: 'What do I do if I get interrupted mid-pomodoro?', a: 'Note the interruption on paper, deal with it after the interval if it can wait, and keep going. If a genuine emergency ends the session, the traditional rule is to discard that pomodoro and start a fresh one later.' },
      { q: 'Can I change the timer lengths on the MergeDoc Pomodoro Timer?', a: 'No. It runs the fixed 25-minute work and 5-minute break pattern and counts completed cycles. If you want different lengths, use the Countdown Timer & Stopwatch to set your own duration.' },
      { q: 'Does the Pomodoro Technique work for everyone?', a: 'Not equally. It suits tasks you can start and stop, such as writing, studying or admin. People doing deep work that takes a long time to get into, or jobs full of unpredictable interruptions, often need longer blocks or a looser approach.' }
    ],
    content: `The Pomodoro Technique is simple enough to sound arbitrary: work for a fixed interval, take a short break, repeat. The 25-minute default has a practical rationale behind it, even though the exact number isn't magic. Understanding what the technique is really doing helps you decide when to follow it strictly and when to bend it.

## Where the technique comes from

Francesco Cirillo, then a university student in the late 1980s, struggled to concentrate on his studies. He challenged himself to focus for just ten minutes and used a tomato-shaped kitchen timer to track it. The Italian word for tomato is *pomodoro*, which is how the method got its name. He later refined the idea into the 25-minute interval and the five-minute break that most people use today.

That origin is worth remembering: 25 minutes was what worked for him with the timer he had, not a number derived from lab results. I will not claim a study proving 25 is optimal, because there isn't a reliable one that settles it for everyone.

## The core idea: a bounded commitment

The technique's real mechanism is not the specific number of minutes. It turns an open-ended, vague task ("work on this report for a while") into a bounded one ("give this report my full attention for 25 minutes, then I'm allowed to stop"). A bounded interval is psychologically easier to begin than an open-ended one, and starting is where most procrastination lives.

Two supporting effects come with it. First, the ticking clock makes interruptions visible: you notice the urge to check your phone because you have promised to wait. Second, the forced break prevents the slow drift into tired, low-quality work that happens when you push through a whole afternoon without stopping.

## Why roughly 25 minutes, and a 5-minute break

Twenty-five minutes is short enough that most people can hold real attention for the whole interval, and long enough to get past the orienting phase and make measurable progress. The five-minute break is deliberately brief: enough to reset your attention, stretch and look away from a screen, short enough that you do not lose momentum or wander into a new task.

## How to run a Pomodoro session

1. Pick one task. Write it down on the [Todo List](/todo-list) or on paper so you know exactly what this block is for.
2. Open the [Pomodoro Timer](/pomodoro-timer) and press Start. It counts down from 25:00.
3. Work on that one task only. If something else occurs to you, jot it on a scrap of paper and return to the task.
4. When the work phase ends, the timer moves to a 5-minute break. Actually leave your screen: stand up, drink some water, look out of a window.
5. When the break ends, start the next round. The page keeps count of completed cycles so you can see how many you have done.
6. After about four rounds, take a longer break of 15 to 30 minutes before beginning again.

The timer runs in your browser tab, so keep the tab open. It does not need an account.

## Benefits

- **Easier starts.** "Just 25 minutes" lowers the barrier far more than "finish the report".
- **Built-in rest.** Regular breaks stop fatigue from building silently.
- **A visible unit of effort.** Counting rounds shows what a day of focus really looks like, which is often fewer hours than you assumed.
- **Better estimates.** After a week you learn that a task takes six pomodoros, not "an hour or so".
- **Protection against multitasking.** One task per block makes context-switching costs obvious.

## When the standard 25/5 does not fit

The numbers are a starting point, not a law:

- **Deep, hard-to-re-enter work** such as writing, complex debugging or design often benefits from longer intervals of 50 minutes or more, since 25 can end just as you reach flow.
- **Shallow, high-interruption work** like email, quick admin and phone calls can work fine in shorter blocks.
- **Very short tasks** can be batched into one block rather than given a block each.

Be honest about the tool's flexibility. The MergeDoc Pomodoro Timer uses the fixed 25-minute work and 5-minute break pattern and does not let you change the lengths or schedule a long break automatically. If you want a 50-minute block or a 15-minute break, use the [Countdown Timer & Stopwatch](/countdown-stopwatch), where you set the duration yourself, and track the long break yourself.

## Where typical focus timers fall short

Many Pomodoro apps want an account, push notifications, subscriptions for statistics or a native install. Some bundle in ad-heavy pages that defeat the purpose of a calm focus session, or sync your task list to a cloud service you did not ask for. A browser-based timer avoids that: open it, press start, close it when you are done. The trade-off with any browser timer is that it depends on the tab staying open, and background tabs can be throttled by some browsers, so keep it visible if precise timing matters.

## Everyday uses

- **Studying for an exam.** Four rounds on one subject, then a long break, beats three hours of half-attention.
- **Clearing an inbox or admin pile.** Set one pomodoro for "email only" and stop when the timer does.
- **Writing a first draft.** Twenty-five minutes of no editing, only typing.
- **Housework.** The technique works away from a desk too: 25 minutes tidying one room.
- **Sharing focus with a colleague.** Agree to start a block together and compare progress at the break.

## Tips and mistakes to avoid

Protect the break. Using it to check messages or scroll social feeds does not restore attention; it loads it with more input. Move, drink water or rest your eyes.

Do not extend a block because you are "on a roll" every time. Occasionally it is right, but if you always skip the break, you are no longer using the method and fatigue will catch up with you later.

Plan the day in rounds, not hours. If your to-do list has 14 pomodoros of work and you only have eight, you can see the problem at 9 a.m. instead of at 5 p.m.

Keep a "distractions" scrap of paper beside you. Writing an intrusive thought down takes two seconds and frees you to drop it.

Finally, match the task to the size of the block. If you cannot finish anything meaningful in 25 minutes, break the task into a first step you can.

## A sample day built from pomodoros

Say you have eight working hours but also meetings and messages. A realistic plan might be:

- 9:00 to 11:00, four pomodoros of the hardest task of the day, with 5-minute breaks and a longer break after the fourth.
- 11:30 to 12:00, one or two pomodoros of email and admin, set as a hard limit.
- After lunch, two or three pomodoros on a second project.
- Late afternoon, one pomodoro to clear small tasks and plan tomorrow.

That is eight or nine rounds, around four hours of genuinely focused work, which for most people is a good day. The rest of the time goes to meetings, conversations and the unplanned. Counting rounds makes that visible and stops you from judging yourself against an unrealistic eight hours of pure focus.

## Rules that keep it honest

Some practitioners follow two simple rules. A pomodoro is indivisible: you do not half-count it. And a pomodoro is for one thing: if you finish early, use the remaining time to review or improve what you just did instead of starting something new. Neither rule is essential, but both keep the blocks meaningful instead of turning the timer into background noise.

## Related reading

For a different angle on measuring your time, see [Flesch Reading Ease Explained](/blog/flesch-reading-ease-explained), which includes the reading-time estimate. If you are timing deadlines rather than focus, [Unix Timestamp Explained](/blog/unix-timestamp-explained) is a good primer. And for tracking what you actually billed for, [Create a Freelance Invoice](/blog/create-a-freelance-invoice) shows a simple workflow. More tools are listed under [productivity tools](/productivity-tools).`
  },
  {
    slug: 'csv-vs-json-when-to-use-each',
    title: 'CSV vs JSON: When to Use Each Format (and How to Convert)',
    description: 'CSV and JSON solve different problems. Learn which fits your data, where each breaks down, and how to convert between them without losing information.',
    date: '2026-05-22',
    updated: '2026-10-03',
    category: 'developer-tools',
    keywords: ['csv vs json', 'convert csv to json', 'convert json to csv', 'csv json converter online', 'when to use csv', 'json vs csv for data', 'csv to json online'],
    relatedTools: ['/csv-json-converter', '/json-formatter', '/markdown-table-generator'],
    faqs: [
      { q: 'What is the difference between CSV and JSON?', a: 'CSV stores flat rows and columns as plain text separated by commas, like a spreadsheet. JSON stores structured data with objects, arrays, numbers, booleans and nesting. CSV is simpler and smaller for uniform tables; JSON is better when records have different shapes or nested parts.' },
      { q: 'Which is better for large datasets, CSV or JSON?', a: 'For uniform tabular data, CSV is usually smaller because column names appear once instead of in every record. JSON repeats every key per row. For nested or irregular data, JSON is the only sensible choice.' },
      { q: 'How do I convert CSV to JSON online?', a: 'Paste the CSV with a header row into a converter and choose CSV to JSON. Each row becomes an object keyed by the header names. The MergeDoc converter runs in your browser and produces an array of objects with all values as strings.' },
      { q: 'Can a CSV file contain commas inside a value?', a: 'In the full CSV standard (RFC 4180), yes, by wrapping the value in double quotes. The MergeDoc converter does not support this: it splits naively on every comma, so quoted values containing commas will be broken into extra columns.' },
      { q: 'Why does my JSON to CSV output show [object Object]?', a: 'CSV has no place for nested objects or arrays. When a value is itself an object, a simple converter turns it into text such as [object Object]. Flatten the JSON first so every field is a plain value.' },
      { q: 'Does a CSV to JSON conversion keep numbers as numbers?', a: 'Not in this tool. CSV has no types, and the converter returns every value as a string, so 42 becomes "42". Convert the fields you need afterward in your own code.' }
    ],
    content: `CSV and JSON solve overlapping but genuinely different problems. Picking between them is not about which is "better". It is about whether your data is uniformly tabular or has real structure, and about who or what will read it next. A spreadsheet user and an API client want different things from the same data.

## CSV: flat, tabular, spreadsheet-shaped

CSV (comma-separated values) is plain text with one record per line and fields separated by commas. The first line is usually a header naming the columns:

\`name,email,plan\`

\`Ada,ada@example.com,pro\`

It fits when every record has exactly the same fields and no nesting: a list of names and emails, a table of transactions, a stock list. Its simplicity is the whole point. Excel, Google Sheets, a database import tool and a one-line shell script can all read it, and the files are compact because column names appear only once.

CSV's limitation is exactly that flatness. It has no native way to represent a record with a nested list, an optional sub-object, or an explicit difference between a number, a string and empty. Force that sort of data into CSV and you end up with workarounds: columns named \`address_line1\`, \`address_line2\`, repeated rows for each line item, or delimiters inside cells that need quoting. It also has no standard encoding or dialect: some exports use semicolons, tabs or different line endings, particularly in locales where the comma is the decimal separator.

## JSON: nested, structured, code-shaped

JSON handles structure naturally: an order with a list of line items, a user with an optional array of addresses, deeply nested configuration. It distinguishes strings, numbers, booleans, null, arrays and objects. It is what most web APIs speak, and every mainstream language parses it natively.

Its trade-offs are verbosity and readability. Every record repeats every key, so a table of 100,000 rows is noticeably larger than the same data as CSV. And a person cannot skim a big JSON file in a spreadsheet grid the way they skim a CSV; a minified payload is close to unreadable without a formatter. (If you are stuck with one, [Minified JSON Debugging](/blog/minified-json-debugging) walks through making it legible.)

## A quick way to decide

Ask three questions:

1. **Does every record have the same fields, with no nesting?** If yes, CSV is a good fit.
2. **Will a person open it in a spreadsheet?** If yes, CSV, or at least offer it as an export.
3. **Is it going to a program or API, or does it include lists or optional parts?** If yes, JSON.

When the answer is mixed, keep the source of truth in JSON and generate CSV for the people who need to analyze it in a spreadsheet.

## How to convert between CSV and JSON

1. Open the [CSV ⇄ JSON Converter](/csv-json-converter).
2. To go from CSV to JSON, paste the CSV with a header row in the first line and click the CSV to JSON button. You get an array of objects, one per row, keyed by the header names.
3. To go the other way, paste a JSON array of objects and click the JSON to CSV button. The header row comes from the keys of the first object.
4. Copy the output with the copy button.
5. For a cleaner look at long JSON output, paste it into the [JSON Formatter](/json-formatter) to validate and indent it.

If the JSON you paste is not an array of objects, the converter will tell you the input must be a JSON array of objects.

## What the converter does and does not handle

This matters, so here are the exact limits:

- **Naive comma split.** CSV parsing is a plain split on commas. A quoted value such as \`"Smith, John"\` will be torn into two columns, and double-quote escaping is not handled. For clean exports with no commas inside values, that is fine. For messy exports, clean them first.
- **Everything becomes a string.** CSV to JSON returns every value as a string, so \`42\` becomes \`"42"\` and \`true\` becomes \`"true"\`. Convert types afterward in your own code if you need numbers.
- **Header from the first object.** JSON to CSV takes its columns from the first object. Keys that only appear in later objects are dropped, and missing keys become empty cells.
- **No nesting.** A nested object or array in a JSON value is turned into text (typically \`[object Object]\`) rather than flattened. Flatten the structure first.
- **No escaping on output.** Values containing commas or line breaks are written as-is, which would break the resulting CSV.

So the conversion is lossless for flat, simple data, and lossy as soon as you add commas in values, nesting or types.

## Where typical converters fall short

Many online converters upload your file to a server, which is a problem for customer lists and financial exports. Others limit the number of rows on the free tier, add a watermark or header to the output, or require an account for larger files. Doing the work in the browser avoids the upload, the sign-up and the row limits, though it also means you are bound by your device's memory for very large files.

## Everyday uses

- **Moving a spreadsheet export into code.** Turn a product list into JSON for a prototype or test fixture.
- **Giving non-developers data.** Convert a JSON API response to CSV so a colleague can sort and filter it in a spreadsheet.
- **Preparing seed data** for an app from a CSV someone maintains by hand.
- **Making documentation tables.** Paste CSV into the [Markdown Table Generator](/markdown-table-generator) to get a formatted table for a README.
- **Quick comparison.** Convert two exports to the same shape and use the [Text Diff Checker](/text-diff) to spot what changed.

## Tips and mistakes to avoid

Always include a header row in CSV. Without it, the converter will treat your first data row as column names.

Watch the encoding and delimiter. If a spreadsheet export uses semicolons or tabs, change them to commas before conversion, or the whole row will land in one field.

Check for commas inside values before converting. A quick text search for \`"\` in the file tells you if quoting is present. If it is, this tool is not the right one for that file.

Do not store dates and numbers as plain CSV strings and assume they will round-trip. Leading zeros in postcodes or IDs (\`00123\`) are the classic casualty when a spreadsheet reinterprets them as numbers; keep such columns as text.

Validate the JSON before you convert. A trailing comma or unescaped quote makes it invalid, and the error message will not say where.

## Other formats worth knowing

CSV and JSON are not the only options, and sometimes the right answer is neither.

- **TSV** (tab-separated) avoids most comma problems because tabs rarely appear inside values. Many spreadsheets export it directly.
- **JSON Lines** (one JSON object per line) gives you JSON's types and nesting with CSV's streaming friendliness, which makes it popular for logs and large exports.
- **XLSX** keeps formatting, formulas and multiple sheets, but it is a binary format that code has to unpack.
- **SQL dumps or Parquet** suit very large analytical tables where reading speed and compression matter.

For most everyday work, though, the choice is CSV or JSON, and the quick questions above settle it.

## A short example of the flattening problem

Suppose an order looks like this in JSON: a customer name, plus a list of three items, each with a product and quantity. As JSON it is one record. As CSV you have to choose: either three rows that each repeat the customer name, or columns like item1_product, item1_qty, item2_product and so on, with a maximum you have to guess in advance. Both work, neither is natural, and both complicate anything that reads the file later. When you notice yourself inventing column-naming schemes, that is the signal to use JSON instead.

## Related reading

For other formats that get confused with each other, see [Base64 Encoding: What It Is For](/blog/base64-encoding-what-its-for). To test patterns that clean up messy rows before you convert, read [How to Test a Regex](/blog/how-to-test-a-regex). And if you share the finished file, [Why Client-Side Tools Matter](/blog/why-client-side-tools-matter) explains why processing it locally is safer. More utilities are collected on the [developer tools](/developer-tools) page.`
  }
]
