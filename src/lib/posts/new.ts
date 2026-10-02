import type { BlogPost } from '../blogTypes'

export const NEW_POSTS: BlogPost[] = [
  {
    slug: 'split-pdf-into-pages-guide',
    title: 'How to Split a PDF Into Pages, Ranges or Single Files',
    description: 'Split a PDF into single pages or pull out ranges like 1-3,5, free and in your browser. Learn which tool fits, plus the limits worth knowing.',
    date: '2026-10-03',
    updated: '2026-10-03',
    category: 'pdf-tools',
    keywords: ['split pdf into pages', 'split pdf online free', 'separate pdf into pages', 'extract pages from pdf', 'split pdf into individual pages', 'how to split pdf pages into multiple pdfs'],
    relatedTools: ['/split', '/split-pdf-pages', '/merge', '/reorder'],
    faqs: [
      {
        q: 'How do I split a PDF into individual pages for free?',
        a: 'Open the [Split PDF into Pages](/split-pdf-pages) tool, drop in your file and click the button. Every page is saved as its own PDF named like \`report-page-1.pdf\`. Nothing is uploaded, so there is no sign-up and no size cap beyond what your browser can hold in memory.',
      },
      {
        q: 'Can I split a PDF into separate files by page range, like 1-10 and 11-20?',
        a: 'Yes, but one run produces one file. Enter \`1-10\` in the [Split PDF](/split) tool, download the result, then run it again with \`11-20\`. Repeat for each chunk you need.',
      },
      {
        q: 'What is the difference between splitting into pages and extracting pages?',
        a: 'Splitting into pages gives you one file per page, so a 40-page PDF becomes 40 downloads. Extracting pages means you name the pages you want, such as \`2-4,9\`, and get a single new PDF containing only those pages.',
      },
      {
        q: 'Why does my password-protected PDF fail to split?',
        a: 'The tools cannot read pages from an encrypted file. Remove the password first with the Remove password mode on the [Protect PDF](/protect) page, then split the unlocked copy.',
      },
      {
        q: 'Will splitting a PDF reduce the quality?',
        a: 'No. Pages are copied across as they are, not re-rendered into images, so text stays selectable and vector graphics stay sharp. The file size of each piece depends on what that page contains, such as embedded fonts and images.',
      },
      {
        q: 'Does splitting keep bookmarks and links?',
        a: 'Do not count on it. The tools build a fresh document from copied pages, and document-level extras such as the bookmark outline are generally not carried over. Check the result if your PDF relies on bookmarks.',
      },
    ],
    content: `You have a 60-page PDF and need three pages of it. Or you scanned a stack of receipts into one file and now each receipt has to go to a different person. Or a client wants only the signature page back. The task is simple, but a lot of online tools turn it into an upload, a queue and a prompt to create an account.

MergeDoc has two split tools, and they answer different questions. This guide explains which one to pick, how the page-range syntax works, and the small details that save you a failed attempt.

## Two ways to split a PDF: ranges versus single pages

The first tool is [Split PDF](/split). You type the pages you want, for example \`1-3,5\`, and it produces **one new PDF** containing exactly those pages. The ranges are 1-indexed and inclusive, so \`1-3\` means pages 1, 2 and 3. Commas separate groups.

The second is [Split PDF into Pages](/split-pdf-pages). You give it a file and it produces **one PDF per page**. A 12-page file becomes 12 files named \`yourfile-page-1.pdf\` through \`yourfile-page-12.pdf\`.

People searching for "split pdf into pages" usually mean the second. People searching for "extract pages from pdf" usually mean the first. If you are not sure, ask what you want at the end: one file with a subset, or many files?

## How to split a PDF into single pages

1. Open [Split PDF into Pages](/split-pdf-pages).
2. Click the drop area and choose your PDF, or drag the file onto it.
3. Click **Split into individual pages**.
4. Wait for the downloads. The page count appears in the confirmation message.

Because each page lands as a separate download, some browsers ask whether you want to allow multiple downloads from the site. Say yes. If a very long PDF produces more downloads than you want to deal with, extract the part you need with the range tool instead.

## How to extract specific pages or a page range

1. Open [Split PDF](/split).
2. Choose your PDF.
3. In **Pages to extract**, type the pages. Examples: \`1-3,5\` for pages 1 to 3 plus page 5; \`7\` for a single page; \`10-\` is not supported, so write the actual end page, such as \`10-24\`.
4. Click **Split PDF**. The result downloads as \`yourfile-split.pdf\`.

Two behaviours are worth knowing, because they come from how the ranges are processed. First, pages come out in **ascending order** regardless of how you typed them, so \`5,1\` gives you page 1 then page 5. Second, duplicates are collapsed, so \`1-3,2\` still yields three pages. A range that runs past the end is clipped to the last page rather than causing an error.

If you need pages in a custom order, extract first and then use [Reorder Pages](/reorder), where you can move and delete pages visually.

## Why split instead of printing or screenshotting

Printing selected pages to a "Save as PDF" printer works, but it rasterizes some content and can change fonts, margins and file size. Screenshots lose text entirely. Copying pages into a new file keeps the original text layer, so the recipient can still search and select. That matters for contracts, invoices and anything someone may need to copy a number out of.

- **Smaller files to send.** An email limit is easier to meet when you send the four relevant pages instead of the whole 200-page document.
- **Less exposure.** Sharing only the pages a person needs is a sensible privacy habit. Remember that the original is still on your disk, untouched.
- **Cleaner workflows.** One page per file makes it easy to name, sort and file each page in the right folder.
- **No software to install.** Everything runs in the browser tab.

## Where current tools fall short

Many split tools work by sending your file to a server, splitting it there, and sending the pieces back. That is fine for a lunch menu and uncomfortable for a payslip, a medical form or a contract. Other common friction points are daily limits on files or pages, a sign-up wall before the download, a watermark on free output, and download links that expire.

MergeDoc reads the PDF in your browser with a JavaScript library, copies the pages and hands the result back as a download. There is no upload step, so there is no queue and no retention policy to read. The trade-off is that very large files depend on your device's memory, and there are no cloud features such as saving to a drive or sharing a link. For the privacy side of that choice, read [Is it safe to upload confidential PDFs?](/blog/is-it-safe-to-upload-confidential-pdfs).

## Everyday use cases

- **Scanned receipts.** One scan with eight receipts becomes eight files, each ready to attach to an expense line.
- **Contract signature page.** Extract the last page, send it to the signer, and merge the signed page back later with [Merge PDF](/merge).
- **Study material.** Pull chapter 4 out of a 300-page textbook scan to read on your phone.
- **Boarding passes and tickets.** A booking confirmation with four tickets can be separated so each traveller gets their own.
- **Removing the cover letter.** Extract pages 2 to the end to drop a first page you do not want to share.

## Splitting large or scanned PDFs

A few situations need a little planning. A scanned document is usually one large image per page, so each extracted page can still be a megabyte or more. If your goal is a small email attachment, splitting out fewer pages helps more than anything else, and the [image tools](/image-tools) can shrink the scans themselves if you convert pages to pictures first.

A very long PDF takes longer to process because the whole file is read into your browser's memory. If a 500-page file stalls on a phone, try it on a laptop, or cut it in two with ranges first. Close other heavy tabs before you start.

When you need more than one chunk, think about how many files you want at the end. For three chunks of a 90-page report, running the range tool three times (\`1-30\`, \`31-60\`, \`61-90\`) is quicker than splitting into 90 files and merging 30 back together. For a stack of one-page items, such as scanned receipts, the single-page tool is the right call.

Finally, decide on a naming scheme before you start. Downloads are named after the source file with a suffix, so renaming them immediately to something meaningful, such as the date or client, keeps your downloads folder usable. If you plan to combine pieces later, put a number at the front of each name so they sort in order when you select them for [Merge PDF](/merge).

## Tips and mistakes to avoid

- **Unlock first.** An encrypted PDF cannot be split. Use the Remove password mode in [Protect PDF](/protect) if you know the password.
- **Check page numbers against the viewer.** Printed page numbers in a document often differ from the PDF's own numbering because of cover pages and roman-numeral front matter. The tool counts physical pages from 1.
- **Do not expect bookmarks to survive.** Copied pages go into a fresh document.
- **Split a copy, not your only original.** Downloads never overwrite your file, but keep the habit anyway.
- **Scanned pages stay large.** A page that is one big image remains one big image. Splitting does not shrink it.
- **Name the pieces.** Rename downloads straight away, before ten files called \`page-1\` pile up in your folder.

## Related reading

If you need the opposite operation, see [how to merge PDFs without uploading them](/blog/merge-pdf-without-uploading). To fix a page that came out sideways or in the wrong place, read [rotate and reorder PDF pages](/blog/rotate-and-reorder-pdf-pages). For file-size questions, read [how to reduce PDF file size](/blog/reduce-pdf-file-size) and be aware that the PDF compressor here only restructures the file. Browse everything in [PDF tools](/pdf-tools).`,
  },
  {
    slug: 'rotate-and-reorder-pdf-pages',
    title: 'Rotate and Reorder PDF Pages Permanently, Free',
    description: 'Fix sideways scans and out-of-order pages. Rotate a PDF by 90, 180 or 270 degrees and rearrange or delete pages, all in your browser, with no upload.',
    date: '2026-10-03',
    updated: '2026-10-03',
    category: 'pdf-tools',
    keywords: ['rotate pdf pages', 'how to rotate pdf permanently', 'reorder pages in pdf', 'rearrange pdf pages online free', 'rotate pdf online free no sign up', 'delete pages from pdf'],
    relatedTools: ['/rotate', '/reorder', '/split', '/merge'],
    faqs: [
      {
        q: 'Can you permanently rotate a PDF?',
        a: 'Yes. The [Rotate PDF](/rotate) tool writes the new rotation into a fresh file that you download, so every viewer shows it the same way. Rotating inside a PDF viewer often only changes your view, and the file reverts when you reopen it.',
      },
      {
        q: 'Can I rotate just one page of a PDF?',
        a: 'Not directly. The rotate tool turns every page by the angle you pick. For a single sideways page, split it out with [Split PDF](/split), rotate that file, then put it back with [Merge PDF](/merge) and [Reorder Pages](/reorder).',
      },
      {
        q: 'How do I reorder pages in a PDF for free?',
        a: 'Open [Reorder Pages](/reorder), drop in the PDF and wait for the thumbnails. Use the up and down arrows to move a page, the cross to delete one, then click Save PDF. The result downloads as a new file.',
      },
      {
        q: 'How do I delete pages from a PDF?',
        a: 'Load the file in [Reorder Pages](/reorder), click the cross on each page you want gone and save. The deleted pages are simply left out of the new file. Your original is not changed.',
      },
      {
        q: 'Does rotating or reordering lower the quality?',
        a: 'No. Rotation only sets a flag on each page, and reordering copies pages unchanged. Text remains selectable and images are not re-compressed.',
      },
      {
        q: 'Which rotation angle should I choose for a sideways page?',
        a: 'If the top of the page faces left, rotate 90 degrees clockwise. If it faces right, choose 270. If the page is upside down, choose 180. When unsure, try 90 and check the result.',
      },
    ],
    content: `A scanner feeds one page in sideways and the whole file looks wrong. A colleague sends slides in the wrong sequence. Page 7 should be page 2. These are tiny problems, yet a surprising number of people end up installing a desktop editor or uploading a private document to a stranger's server just to fix them.

Both fixes are available in your browser tab. This guide covers rotating and reordering, what each tool actually does, and the one limitation of rotation that catches people out.

## What rotating and reordering actually change

A PDF page has a rotation property, a multiple of 90 degrees. Rotating a page changes that property; the underlying text and images are untouched. That is why rotation is lossless. The [Rotate PDF](/rotate) tool adds your chosen angle to each page's existing rotation, modulo 360. A page already turned 90 degrees and rotated another 90 ends up at 180.

Reordering is different. The [Reorder Pages](/reorder) tool builds a brand-new document and copies pages into it in the order you specify. Pages you leave out are dropped. That is also how you delete pages.

Neither tool changes the content of a page. Both give you a new download and leave your original alone.

## How to rotate a PDF

1. Open [Rotate PDF](/rotate).
2. Choose your PDF.
3. Pick **90°**, **180°** or **270°**. The angles are clockwise.
4. Click the rotate button. The file downloads as \`yourfile-rotated.pdf\`.
5. Open it in any viewer to confirm. Viewers read the rotation from the file, so it holds everywhere.

Which angle? Look at where the top of the text points. Top facing left: 90. Top facing right: 270. Upside down: 180.

One honest limit: the tool rotates **every page**. If only one page is wrong, see the workaround further down.

## How to reorder or delete pages

1. Open [Reorder Pages](/reorder).
2. Choose your PDF. The tool renders a thumbnail for every page, which takes a moment on long files.
3. Move a page with the up and down arrows under its thumbnail. Click the cross to remove it.
4. Check the sequence. The label under each thumbnail shows the page's original number, which helps when you have shuffled a lot.
5. Click **Save PDF**. The file downloads as \`yourfile-reordered.pdf\`.

Moving is one step at a time with arrows, not drag and drop. To move page 20 to the front of a long file, it is quicker to [extract it with Split PDF](/split) and merge it in front of the rest using [Merge PDF](/merge), which also lets you set the order.

## Fixing one sideways page in a longer PDF

Since rotation applies to every page, here is the reliable route for a single bad page, say page 5 of 12.

1. Use [Split PDF](/split) with \`1-4\` to save the pages before it.
2. Use Split PDF again with \`5\` to save the sideways page alone.
3. Use Split PDF a third time with \`6-12\` for the rest.
4. Rotate only the one-page file with [Rotate PDF](/rotate).
5. Combine the three parts in order with [Merge PDF](/merge).

It is more steps than a desktop editor, but every step is lossless and nothing leaves your device. For a scan where many pages are wrong in different directions, [splitting into single pages](/blog/split-pdf-into-pages-guide), rotating the bad ones and merging is the same idea at larger scale.

## Benefits of doing it in the browser

- **Permanent result.** You get a new file with the change baked in, not a viewer setting.
- **No quality loss.** Pages are not turned into images.
- **No account.** Open, fix, download.
- **Private by default.** The file is processed in the tab, which matters for forms, IDs and contracts.
- **Works anywhere.** Any modern browser on Windows, Mac, Linux or a phone, with no install.

## Where current tools fall short

The common complaints are well known: free tiers that cap the number of files or pages per day, previews that are watermarked, sign-up walls, and uploads of files you would rather keep private. Some viewers offer rotation that is only applied on screen, so the next person who opens the file sees it sideways again. Others will rotate or reorder but then ask you to subscribe to save.

The trade-off here is that the controls are simple. There is no per-page rotation, no drag-and-drop reordering, and no editing of text. If you need those, a full desktop editor is the right tool. For the everyday cases below, the simple version is faster.

## Everyday use cases

- **Phone scans.** A document photographed in landscape ends up sideways in the PDF.
- **Slide handouts.** Reorder pages after exporting from several sources, or delete the title slide.
- **Application packs.** Put the cover letter first, the CV second and the certificates last.
- **Receipts for expenses.** Remove the blank back pages that a double-sided scan creates.
- **Class notes.** Move the summary page to the front of a long set.

## Choosing the order before you share

Order is part of how a document reads. A few conventions help whether you are building an application pack, a report or a set of scans.

Lead with what the reader needs first. For a job application that is the cover letter, then the CV, then supporting documents. For an invoice pack it is the summary page, then individual invoices by date. For an expenses claim, the form comes first and receipts follow in the order they appear on the form.

Keep related pages together. When you reorder, check that a page and its continuation stayed adjacent: tables and signatures often spill onto a second page. A quick way to check is to look at the thumbnails in the [Reorder Pages](/reorder) view and read the original page numbers under each one. If the numbers run 4, 5, 6 in sequence, nothing was separated.

Remove what should not go out. Blank back pages from double-sided scans, duplicate cover sheets and internal notes can be dropped in the same pass. Because the saved file is a new document, the removed pages are not hidden inside it.

Lastly, view the result in a normal PDF viewer before you send it. Scroll through every page once. It takes under a minute and catches the page you accidentally deleted or the one that is still sideways.

## Tips and mistakes to avoid

- **Rotate the right direction.** Angles are clockwise, so use 270 for a quarter turn the other way.
- **Delete with care.** Deleting a page in the reorder view removes it from the saved copy only. Keep the original until you have checked the new file.
- **Allow time for big files.** Every page is rendered as a thumbnail before you can edit, so a 300-page PDF takes a while.
- **Unlock protected files first.** Encrypted PDFs have to be unlocked with [Protect PDF](/protect) before the other tools can read them.
- **Do the order last.** If you also plan to merge or split, do that first and finish with the reorder.
- **Re-check page numbers.** If your PDF has printed page numbers, they will not renumber when pages move.

## A quick pre-send check

Before you send a fixed file, open it in a standard viewer, scroll to the last page and confirm the page count matches what you expect. Then glance at every page for orientation and sequence. Doing this once is far cheaper than a recipient emailing back to say page three is upside down.

## Related reading

Start with [how to split a PDF into pages](/blog/split-pdf-into-pages-guide) if you need to extract before you reorder. For joining files, read [merge PDFs without uploading](/blog/merge-pdf-without-uploading). If the file is going to someone else, [password-protecting a PDF](/blog/password-protect-pdf-guide) is the final step. All of these live under [PDF tools](/pdf-tools).`,
  },
  {
    slug: 'is-it-safe-to-upload-confidential-pdfs',
    title: 'Is It Safe to Upload Confidential PDFs to Online Tools?',
    description: 'What happens to a PDF you upload to a free online tool, which risks are real, and how to process contracts and IDs without uploading them at all.',
    date: '2026-10-03',
    updated: '2026-10-03',
    category: 'security-privacy-tools',
    keywords: ['is it safe to upload pdf online', 'are online pdf tools safe', 'pdf tools safe for confidential documents', 'merge pdf without uploading', 'offline pdf tools in browser', 'password protect pdf'],
    relatedTools: ['/protect', '/merge', '/redact-pdf', '/split'],
    faqs: [
      {
        q: 'Are online PDF tools safe for confidential documents?',
        a: 'It depends on the tool and on how sensitive the document is. If a tool uploads your file, a copy exists on someone else\'s server for at least a while, and you are trusting their security and retention policy. A browser-only tool avoids that exposure because the file never leaves your device.',
      },
      {
        q: 'How can I check whether a PDF tool uploads my file?',
        a: 'Open your browser\'s developer tools, switch to the Network tab, then run the tool. If a large request carrying your file goes to a server, it uploads. On a client-side tool you will see no such request. Another sign: it still works after you switch off your internet connection.',
      },
      {
        q: 'Does MergeDoc store or see my files?',
        a: 'No. Files are read and processed in your browser tab and are never sent to a server, because the site has no backend. The page does load analytics and ad scripts, as most free sites do, but those do not receive your file contents.',
      },
      {
        q: 'Is a password on a PDF enough to protect it?',
        a: 'A strong password stops casual access, and the [Protect PDF](/protect) tool adds one without uploading anything. A weak or reused password is the usual failure, so generate one and store it in a password manager.',
      },
      {
        q: 'Can I use a browser tool for HIPAA or other regulated data?',
        a: 'MergeDoc makes no compliance certification claims, so treat this as a question for your own compliance team. Keeping the file on your device removes a third-party processor from the chain, but your organisation\'s policy decides which tools are allowed.',
      },
      {
        q: 'Does the black-box redaction tool remove hidden text?',
        a: 'No. The [Redact PDF](/redact-pdf) tool draws opaque rectangles over regions, which is a visual cover only. The text underneath may still be selectable. For anything truly sensitive, convert the page to an image or use an editor that removes the underlying content.',
      },
    ],
    content: `Most people have done it. You need to merge two scanned documents or lock a contract with a password, a search shows a friendly "free PDF tool", and you drop in a file that contains an address, a bank number or a signature. The result comes back in seconds. The question that rarely gets asked is where that file went in between.

This post explains what actually happens when a tool uploads your PDF, which concerns are real and which are overblown, and how to avoid the issue for the cases where it matters.

## What happens when you upload a PDF

Most free web tools that convert, merge or split PDFs follow the same pattern. Your browser sends the file over HTTPS to a server. Software on that server does the work and creates an output file. A link to that output is returned to you. At some point afterwards, the input and output are supposed to be deleted.

Each step carries a small risk:

- **In transit.** HTTPS protects the file on the wire, so this is the least worrying step.
- **At rest on their server.** The file is stored somewhere, at least temporarily, possibly in backups and logs.
- **During retention.** Policies differ. Some tools say files are deleted after a period; others are vague. A deletion promise is a policy, not something you can verify.
- **Via third parties.** Cloud providers, analytics and support staff may sit in the chain.
- **Via the output link.** A download URL that anyone with the address can open is a weak form of protection if the link leaks into a shared device or email.

None of this means a reputable service is careless. It means that uploading adds a party you have to trust, and for some documents you would rather not.

## When uploading is fine and when it is not

A restaurant menu, a public flyer or a lecture slide set carries little risk. Uploading a document that is already public is hardly a problem.

Think harder about:

- Contracts, offer letters and NDAs
- Bank statements, tax forms and payslips
- Passports, driving licences and ID scans
- Medical records and insurance forms
- Anything with client data your employer or a regulator says to protect

For these, ask whether you actually need a third party to touch the file. Often the operation is something a browser can do alone.

## How a browser-only tool differs

A client-side tool ships its code to your browser, and the code runs on your machine. The PDF is read from your disk into the tab's memory, transformed there, and offered back as a download. There is no upload request because there is no server to receive it.

MergeDoc works this way for every tool. The site has no backend; the PDF operations use a JavaScript library running in the page, and rendering previews uses another library in the same tab. That has two limits worth stating plainly. The tools are bounded by your device's memory, so a very large file can be slow. And the page itself still loads analytics and advertising scripts, like most free sites. Those scripts are separate from the file operation and do not receive your document contents.

## How to verify a tool does not upload your file

Do not take a marketing line on trust, including ours.

1. Open the tool page, then open your browser's developer tools (F12, or right-click and Inspect).
2. Go to the **Network** tab and clear the log.
3. Run the operation, for example [merging two PDFs](/merge).
4. Look for any request whose size is close to your file's size, especially a POST. On a client-side tool there will not be one.
5. For a stronger test, load the page, switch your device to airplane mode, and run the operation. A true client-side tool still works.

It takes two minutes and works for any site, not only ours.

## A safer workflow for a sensitive PDF

1. **Work on a copy.** Keep the original untouched.
2. **Cut it down.** Use [Split PDF](/split) to extract only the pages the recipient needs.
3. **Combine locally.** Use [Merge PDF](/merge) for packs that include ID or financial pages.
4. **Lock the result.** Add a password with [Protect PDF](/protect), and share the password through a different channel from the file, never in the same email.
5. **Clean up.** Delete the working copies and empty the downloads folder if the device is shared.

If you want a deeper look at why running in the browser matters, see [why client-side tools matter](/blog/why-client-side-tools-matter) and the step-by-step [password protect PDF guide](/blog/password-protect-pdf-guide).

## Where current tools fall short

Plenty of well-known PDF sites are useful, but the model has predictable downsides: your file leaves your device, free tiers cap files or pages per day, some outputs carry a watermark, sign-in is needed before download, and links expire so you cannot retrieve a file later. Their privacy pages describe retention, and you have to read and trust them. If you must use such a tool for something sensitive, read the current terms for how long files are kept and who can access them. These details change, so check them on the day.

Browser-only tools trade away some features. There is no cloud storage, no shared links, no OCR for scanned pages, and no server-side processing for huge batches. If you need those, you have to decide how much you trust the service.

## Everyday use cases

- **Sending a signed contract.** Extract the signed pages, merge them with the cover page and add a password.
- **Job applications.** Combine ID, certificates and CV into one file without handing them to a third-party server.
- **Tenancy or loan paperwork.** Trim a long statement to the three months requested.
- **Medical forms.** Combine a referral letter and a scan for a specialist, then protect the result.
- **Shared family computers.** Process a tax document without leaving a copy in an online queue.

## What this does not protect you from

Processing locally removes one risk, the third-party server. It does not remove the others, and it is better to name them.

**Your own device.** If your computer has malware, a browser extension that reads page content, or a shared account, a local tool cannot help. Keep the system updated and be wary of extensions that ask to read all sites.

**The file itself.** A PDF can carry hidden information: author name, creation software and sometimes comments. The [Metadata](/metadata) tool can read and edit those fields, which is worth doing before you publish a document.

**Where it goes next.** Once you attach the finished file to an email or a chat, it is exposed to that service's rules. A password on the PDF still helps, as long as the password does not travel in the same message.

**Human error.** Sending the wrong file to the right person is far more common than a server breach. Check the file name and the pages before you press send.

None of this makes uploading wrong in every case. It means the decision should match the sensitivity of the document. For public material, convenience wins. For ID, finance and health papers, reducing the number of parties who ever hold a copy is a reasonable default.

## Tips and mistakes to avoid

- **Do not rely on black boxes.** The [Redact PDF](/redact-pdf) tool covers regions visually. The text beneath may still be selectable. Never use it as the only protection for a secret.
- **A password is only as strong as the password.** Generate a long random one with the [password tool](/password-tool).
- **Check document properties.** Author names and titles can sit in a PDF's metadata even after you edit the pages.
- **Beware of public computers.** Browser-only processing is private from the website, not from the machine's owner.
- **Follow your employer's rules.** If your organisation prohibits certain tools, that rule wins.
- **Do not assume "free" equals "private".** Check how a tool actually handles files.

## Related reading

For a hands-on walkthrough, read [how to merge PDFs without uploading them](/blog/merge-pdf-without-uploading) and [strong passwords vs passphrases](/blog/strong-passwords-vs-passphrases). To browse the whole privacy-oriented set, see [security tools](/security-tools).`,
  },
  {
    slug: 'compare-two-pdfs-find-differences',
    title: 'Compare Two PDFs and Find Every Changed Word',
    description: 'Compare two PDFs for differences in your browser. See added and removed words highlighted, and learn what a text diff can and cannot catch.',
    date: '2026-10-03',
    updated: '2026-10-03',
    category: 'pdf-tools',
    keywords: ['compare pdfs online', 'compare two pdf files for differences', 'pdf compare tool free', 'compare pdfs side by side', 'find differences between two documents', 'text diff checker'],
    relatedTools: ['/compare-pdf', '/text-diff', '/extract-text', '/split'],
    faqs: [
      {
        q: 'How do I compare two PDFs for differences for free?',
        a: 'Open [Compare PDFs](/compare-pdf), drop the original into the first box and the changed version into the second, then click Compare. Added words show in green and removed words in red with a line through them. Both files stay on your device.',
      },
      {
        q: 'Which file should go in the first box?',
        a: 'Put the older or original version first and the newer one second. Red text means words that were in the first file but not the second; green means words that appear only in the second.',
      },
      {
        q: 'Can it compare scanned PDFs?',
        a: 'Not usefully. The tool compares the text layer, and a scan is usually just a picture with no text. If a page has no text layer, there is nothing to compare. You would need OCR first, which this site does not offer.',
      },
      {
        q: 'Does it detect changes in images, fonts or layout?',
        a: 'No. It compares words only. A logo swap, a new font, a moved paragraph or a changed table border will not be highlighted unless the actual text changed. Treat it as a proofreading aid, not a visual comparison.',
      },
      {
        q: 'What is the difference between Compare PDFs and Text Diff?',
        a: 'Compare PDFs reads the text out of two PDF files and then diffs it. [Text Diff](/text-diff) works on text you paste into two boxes. They use the same word-level comparison, so use Text Diff for Word documents, emails or code snippets.',
      },
      {
        q: 'Is there a size limit?',
        a: 'There is no upload limit because nothing is uploaded, but the comparison table grows with the product of both documents\' word counts. Page-sized to chapter-sized documents are fine; a whole book may be slow or run out of memory.',
      },
    ],
    content: `Someone sends back "the final version" of a contract. It looks the same as the last one. Page count is identical, the logo is in the same place, and the email says "only minor edits". Do you read all 24 pages again to find them?

A word-level comparison does that reading for you. It lines up the text of both versions, marks what was added and what was removed, and leaves everything that matches alone. This post shows how to use the PDF comparison tool, what it is genuinely good for, and where its blind spots are, because a diff you trust too much is worse than no diff.

## What a PDF comparison actually does

[Compare PDFs](/compare-pdf) does two things. First it pulls the text out of each file, page by page, using the same engine that renders PDFs in browsers. Then it runs a **word-level diff** on the joined text. The algorithm finds the longest sequence of words that both versions share, treats everything else as an edit, and outputs a single stream where:

- unchanged words appear normally,
- words only in the second file are highlighted green,
- words only in the first file are highlighted red with a strikethrough.

The result reads like tracked changes in a word processor, though it is generated from the final documents, not from edit history.

## How to compare two PDFs

1. Open [Compare PDFs](/compare-pdf).
2. Drop the **original** file into the first box. The label reads "Original PDF" until you choose a file.
3. Drop the **changed** file into the second box.
4. Click **Compare**. Processing happens in the tab, and the result appears below.
5. Read through the highlighted text. Look at red first (what was taken out), then green (what was put in).

If the two files are very large, you can narrow the job. Use [Split PDF](/split) to pull out the same section from each version, then compare just those. That is faster and the output is easier to read.

## Comparing text that is not in a PDF

Sometimes the content is in an email, a spreadsheet cell or a code block. In that case use [Text Diff](/text-diff). Paste the original into the left box and the changed text into the right, and the comparison updates as you type. It uses exactly the same word-level function as the PDF tool.

A handy trick for Word documents or web pages: select all, copy, paste into Text Diff. For a PDF where you want the raw text for another purpose, [Extract Text](/extract-text) gives you the per-page text to copy.

## What it is good at

- **Spotting numbers that moved.** A changed price, date or percentage is a single red word next to a single green one.
- **Finding inserted or deleted clauses.** A whole paragraph appears as a block of green or red.
- **Checking a re-export.** After regenerating a PDF from source, you can confirm that only the intended sections changed.
- **Proofreading translations or edits.** You see what a colleague changed without asking them for a list.

## What it cannot see

This is the part most pages do not tell you, so read it before relying on a comparison.

- **No images.** A replaced logo, signature, chart or photograph is invisible to a text diff.
- **No formatting or layout.** Bold, font changes, colours, margins and column order are ignored unless the words themselves moved.
- **No scanned pages.** Without a text layer, there is nothing to compare. A scanned contract compared with a text-based one will show everything as changed or nothing at all.
- **Reading order quirks.** PDFs store text in drawing order, which is not always the visual order. Multi-column pages and tables can be extracted in a surprising sequence, producing noisy differences even when nothing changed.
- **Hyphenation and line breaks.** A word split across two lines may be read as two words.
- **Size.** The diff builds a table whose size is roughly the number of words in one file times the number in the other. That is fine for dozens of pages and not designed for a whole book.

If the stakes are high, such as a legal agreement, use the comparison to find changes quickly but still read the sections that matter. A tool that shows no difference means no difference in the text it could read, not proof the files are identical.

## Where current tools fall short

Dedicated comparison tools tend to be paid, require uploading both documents to a server, or cap pages and file counts on free plans. Comparing two versions of a contract is exactly the case where you would rather the files stay private, and a server round trip adds a stranger to a confidential conversation. For the reasoning, see [is it safe to upload confidential PDFs](/blog/is-it-safe-to-upload-confidential-pdfs).

The browser version trades away the heavy machinery. There is no side-by-side page rendering, no image comparison, no export of a redline PDF. What you get is a clear text diff that costs nothing and leaves nothing behind.

## Everyday use cases

- **Contract revisions.** Confirm the "minor edits" really are minor.
- **Terms and policies.** Compare last year's terms of service with the new version you were asked to accept.
- **Academic drafts.** Check what a co-author changed between two exported drafts.
- **Quotes and proposals.** Catch a changed quantity or line item before you sign.
- **Manuals and specs.** See what moved between revision A and revision B of a technical document.

## A worked reading of a comparison result

Suppose version one of a quote says "Delivery within 10 working days, total 4,500" and version two says "Delivery within 14 working days, total 4,950, payment due on receipt". The output reads as one stream: the words "Delivery within" are plain; the word \`10\` is red with a line through it, and \`14\` follows in green; \`4,500\` is red and \`4,950\` is green; then ", payment due on receipt" appears all in green because it is new.

Three habits make this easy to read. First, scan for red-green pairs, which are replacements, such as a changed number. Second, scan for long green runs, which are insertions of new clauses. Third, scan for long red runs, which are deletions that someone may hope you will not notice.

Be careful with small tokens. A change from "may" to "shall" is a single word and easy to miss in a long page, but the highlighting makes it stand out. Equally, an unchanged sentence moved to a different page appears as a red block in one place and a green block in another, so a lot of red and green does not always mean new content.

If the output is mostly noise, check that you loaded the right files, and that both are text-based rather than scans. Then try comparing only the sections that matter by extracting them first.

## Tips for reliable comparisons

- **Keep order consistent.** Original first, changed second, every time.
- **Compare like with like.** Two exports from the same tool give cleaner results than a PDF versus a scan.
- **Trim headers and footers if needed.** Changing page numbers or dates in a footer appear as edits on every page. Splitting the pages you care about helps.
- **Check unusual layouts by eye.** Tables and columns may extract in a strange order.
- **Do not paste secrets you do not need.** Even though nothing is uploaded, keep working copies tidy.
- **Re-run after fixing.** If you recreate a PDF to remove an unwanted change, compare again to confirm.

## Related reading

If your files need trimming first, read [how to split a PDF into pages](/blog/split-pdf-into-pages-guide). For the opposite job of joining files, see [merge PDFs without uploading](/blog/merge-pdf-without-uploading). For text-only changes, [Text Diff](/text-diff) is the quickest route, and more PDF utilities are collected under [PDF tools](/pdf-tools).`,
  },
  {
    slug: 'compress-images-for-faster-websites',
    title: 'Compress Images for Faster Websites: A Practical Guide',
    description: 'Resize first, then compress, then pick the right format. A practical workflow for smaller JPG, PNG and WebP images, done free in your browser.',
    date: '2026-10-03',
    updated: '2026-10-03',
    category: 'image-tools',
    keywords: ['compress images for website', 'image compressor online free', 'reduce image size without losing quality', 'image resizer online', 'png to webp converter', 'compress image to 100kb'],
    relatedTools: ['/image-compress', '/image-resize', '/image-converter', '/favicon-generator'],
    faqs: [
      {
        q: 'How do I compress an image for a website without losing quality?',
        a: 'Resize it to the size it will actually be displayed at first, then compress. Quality loss you cannot see usually starts around 70 to 85 percent on the quality slider of a JPEG. Use [Image Resizer](/image-resize) first, then [Image Compressor](/image-compress).',
      },
      {
        q: 'How do I compress an image to 100KB or 50KB?',
        a: 'There is no target-size setting in the tool, so you reach it in steps. Resize the image to a smaller width, then lower the quality slider and check the before and after sizes shown on the page. Repeat until you are under your limit.',
      },
      {
        q: 'Does the compressor keep PNG transparency?',
        a: 'No. The compressor outputs a JPEG, which cannot store transparency, so transparent areas become a solid colour (typically black). If you need transparency, resize the PNG instead, which keeps the PNG format, or convert to WebP with [Image Format Converter](/image-converter).',
      },
      {
        q: 'Should I use JPEG, PNG or WebP?',
        a: 'Use JPEG for photographs, PNG for flat graphics, screenshots and anything needing transparency, and WebP when your audience\'s browsers support it, as it is usually smaller for similar quality. Convert with the [converter](/image-converter) and test the result in your target browsers.',
      },
      {
        q: 'Does compressing in the browser upload my photos?',
        a: 'No. The image is redrawn and re-encoded on a canvas in your tab, and the result is downloaded straight from there. Nothing is sent to a server.',
      },
      {
        q: 'Will compression remove location data from my photo?',
        a: 'Re-encoding through a canvas does not copy the original file\'s metadata, so details such as GPS coordinates and camera model are not carried into the output. Verify on a sensitive image before you rely on it.',
      },
    ],
    content: `Images are usually the heaviest thing on a web page. A single 4000 by 3000 pixel photo straight from a phone can weigh several megabytes, which is far more than the 800-pixel-wide slot it fills on screen. Visitors on slow connections wait, search engines notice slow pages, and the page layout jumps around as pictures load in.

Fixing that is not about one magic compressor. It is a short sequence: the right dimensions, the right format, then the right quality. This guide walks through each step using three free browser tools.

## Why image weight matters

Two things make images costly. The first is **pixels**: a file with 12 million pixels takes far more bytes than one with 1 million, however well it is compressed. The second is **encoding**: the same pixels can be stored in a heavier or lighter way depending on format and quality setting.

For most sites, the largest image above the fold is also the element a browser measures when it reports how fast the main content appeared (the Largest Contentful Paint metric). A smaller hero image directly shortens that time. Images lower on the page matter less if you load them lazily, but they still use data.

## The three-step order: resize, convert, compress

Most guides say "compress your images" and stop. The order matters, because each step changes what the next one can achieve.

1. **Resize** to the displayed size. Reducing a 4000-pixel-wide photo to 1600 pixels removes about 84 percent of the pixels before any quality loss.
2. **Choose the format** that suits the picture.
3. **Compress** with a quality setting you have checked by eye.

## Step 1: resize to the size you need

Decide how wide the image appears on your page. A blog column is often 700 to 800 pixels wide. A full-width hero on a desktop may be 1600 to 2000 pixels. For sharp display on high-density screens, supply about twice the displayed width, but not much more than that.

1. Open [Image Resizer](/image-resize).
2. Choose a JPG or PNG. The tool fills in the original width and height.
3. Leave **lock ratio** on so the proportions stay correct, then change the width. The height follows.
4. Click resize. The file downloads as \`name-resized.jpg\` or \`.png\`, matching the input format.

Remember that scaling up does not add detail. Never enlarge a small image to make it "bigger"; it will look soft.

## Step 2: pick the right format

- **JPEG** suits photographs and images with smooth colour gradients. It cannot store transparency.
- **PNG** suits logos, icons, screenshots and anything with sharp edges or transparency. It tends to be large for photographs.
- **WebP** is a newer format that supports both lossy and lossless modes and transparency, and is usually smaller than JPEG or PNG at similar visual quality. Support in current mainstream browsers is broad, but check your own audience.

To change format, use [Image Format Converter](/image-converter). It converts between PNG, JPEG and WebP and re-encodes at a fixed high quality of 92 percent, so it is better as a format switch than as a size reducer. WebP output depends on your browser's ability to encode it, so open the downloaded file and confirm it really is WebP, and try a different browser if not.

## Step 3: compress with a quality you have checked

1. Open [Image Compressor](/image-compress).
2. Choose a JPG or PNG.
3. Set the **Quality** slider. It starts at 70 percent and moves in steps of 5. For photos, somewhere between 65 and 85 is the common sweet spot.
4. Click **Compress image**. The page shows a before and after size in kilobytes and downloads the result as \`name-compressed.jpg\`.
5. Open the output next to the original at the size it will appear. If you cannot see a difference, try a lower setting; if you see blocky edges or smeared detail, go higher.

Important details about this tool: the output is **always a JPEG**, whatever you put in. A PNG with transparency will lose it, and the transparent area turns into a solid fill. It also compresses at the image's current dimensions, so resize first if you also want fewer pixels. And it handles one image at a time.

## Reaching a target such as 100KB

Forms and portals often demand "under 100KB" or "under 50KB". There is no target-size option, so work toward it:

- Resize to a smaller width first (for example 1000 pixels for a photo).
- Compress at 70 percent and read the size.
- If it is still too large, lower the quality in steps of 5 and try again.
- If quality gets ugly before you hit the number, go back and reduce the dimensions more.

Photos with a lot of fine detail, like foliage or crowds, compress less than simple images.

## Where current tools fall short

Many popular image compressors upload your pictures to a server. That is a questionable choice for photos of documents, children or ID cards. Free tiers frequently limit the number of files per batch or the maximum file size, and some add a watermark or require an account to download. Others re-encode with settings you cannot see or change, so you cannot tell how much quality you lost.

MergeDoc does all the work on a canvas in your browser tab, so nothing is sent anywhere, and you set the quality yourself. The trade-offs are real: one file at a time, JPG and PNG input only for the compressor and resizer, no batch mode, and no smart target-size search. Re-encoding through a canvas also drops metadata such as camera details and GPS location, which is helpful for privacy but means you should keep an original if you need that information.

## Everyday use cases

- **Blog hero images.** Resize to 1600 pixels wide, compress at 75 percent, and keep it a JPEG.
- **Product photos.** Resize all to the same width so the grid looks consistent.
- **Job portal uploads.** Get a passport-style photo under a stated KB limit.
- **Email attachments.** Shrink a handful of phone photos before sending.
- **Favicons and icons.** Create the right dimensions with the [Favicon Generator](/favicon-generator) rather than shrinking by hand.

## A realistic example: a blog hero image

Say you have a phone photo at 4032 by 3024 pixels that weighs about 3 MB, and your article column is 760 pixels wide.

1. Resize it to 1520 pixels wide, twice the column width for sharp display on high-density screens. The pixel count falls by roughly 86 percent.
2. Keep it as JPEG, since it is a photograph with no transparency.
3. Compress at 75 percent and compare against the original at full screen size.

The exact result depends on the photo, which is why the tool shows the before and after sizes instead of promising a number. A photo of a cloudy sky compresses far more than one of a busy market. If the output is still heavier than you want, reduce the width again or lower the quality by 5 points and re-check.

For logos and screenshots the order changes. These have flat colours and sharp edges, where JPEG creates visible fuzz around text. Resize with the [Image Resizer](/image-resize), which keeps a PNG as a PNG, and consider converting to WebP with the [converter](/image-converter) if you do not need the PNG itself.

Last, test the page. Load it on a throttled connection in your browser's developer tools or on your phone with mobile data. The best proof that the images are light enough is that the page feels quick.

## Tips and mistakes to avoid

- **Resize before you compress.** It is the biggest single saving.
- **Do not compress twice.** Every JPEG re-encode throws away more detail. Compress from the original each time.
- **Keep an untouched original.** Lossy compression cannot be undone.
- **Check on a real device.** What looks fine on a laptop may show artefacts on a large display.
- **Add width and height attributes in your HTML** so the browser reserves the space and the page does not shift while images load, and use \`loading="lazy"\` for images below the fold.
- **Do not use PNG for photos.** The file will be much bigger than a JPEG or WebP.

## Related reading

If the same problem affects documents, read [how to reduce PDF file size](/blog/reduce-pdf-file-size) and note that the PDF compressor here only restructures files. For the image quality question in more depth, see [resize an image without losing quality](/blog/resize-image-without-losing-quality). Everything for pictures lives under [image tools](/image-tools).`,
  },
  {
    slug: 'sha-256-hash-explained',
    title: 'SHA-256 Hash Explained: What It Is and When to Use It',
    description: 'What a SHA-256 hash is, why one changed letter changes everything, how it differs from encryption, and how to generate SHA hashes free in your browser.',
    date: '2026-10-03',
    updated: '2026-10-03',
    category: 'developer-tools',
    keywords: ['sha256 hash generator', 'what is sha-256', 'hash generator online', 'sha-1 vs sha-256', 'is hashing the same as encryption', 'sha256 of a string'],
    relatedTools: ['/hash-generator', '/text-encryptor', '/password-tool', '/uuid-generator'],
    faqs: [
      {
        q: 'What is a SHA-256 hash?',
        a: 'It is a fixed-length fingerprint of some input. Whatever you feed in, a word or a whole book, SHA-256 returns 256 bits, shown as 64 hexadecimal characters. The same input always gives the same output, and you cannot work backwards from the output to the input.',
      },
      {
        q: 'How do I generate a SHA-256 hash of a string online?',
        a: 'Open the [Hash Generator](/hash-generator), type or paste your text, and the SHA-1, SHA-256, SHA-384 and SHA-512 hashes appear together. Click Copy next to the one you need. The text is hashed in your browser and not sent anywhere.',
      },
      {
        q: 'Is hashing the same as encryption?',
        a: 'No. Encryption is reversible with the right key; hashing is designed to be one-way. If you need to get the original back, use encryption, such as the [Text Encryptor](/text-encryptor). If you only need to check whether two things match, a hash is the right tool.',
      },
      {
        q: 'Should I store passwords as plain SHA-256 hashes?',
        a: 'No. SHA-256 is fast by design, which helps attackers who guess billions of passwords. Password storage should use a slow, salted algorithm built for the job, such as bcrypt, scrypt, Argon2 or PBKDF2.',
      },
      {
        q: 'Why do I get a different hash from another tool for the same text?',
        a: 'Almost always the input differs by an invisible character. A trailing newline, a space, different line endings or a different text encoding changes the hash completely. This tool hashes the exact characters you typed, encoded as UTF-8.',
      },
      {
        q: 'Can this tool hash a file or compute an MD5?',
        a: 'No. It hashes text only, and offers SHA-1, SHA-256, SHA-384 and SHA-512. For file checksums, use your operating system\'s built-in command line tools.',
      },
    ],
    content: `If you have ever downloaded software and seen a long string of letters and digits next to the link labelled "SHA-256 checksum", you have met a hash. It looks like noise, but it is one of the most useful ideas in computing: a short fingerprint that stands in for data of any size.

This post explains what SHA-256 does, the properties that make it useful, what it is not good for, and how to try it in a few seconds without installing anything.

## What a hash function is

A hash function takes any input and returns a fixed-size output called a digest. SHA-256 is part of the SHA-2 family and always returns 256 bits. Written in hexadecimal, that is 64 characters, because each hex character represents 4 bits.

Here are real digests, so you can check any tool against them:

- The empty string hashes to \`e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\`.
- The text \`abc\` hashes to \`ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad\`.
- The text \`hello\` hashes to \`2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824\`.

The output is always 64 characters, whether the input is one letter or a ten-gigabyte video.

## The properties that make hashes useful

- **Deterministic.** The same input always gives the same digest, on any machine.
- **Fixed size.** Easy to store and compare.
- **One-way.** You cannot compute the input from the digest, except by guessing inputs and hashing them.
- **Avalanche effect.** A tiny change produces a completely different digest. \`hello\` and \`Hello\` share almost nothing: the second begins \`185f8db3\`, while the first begins \`2cf24dba\`.
- **Collision resistant.** It is infeasible, as far as is publicly known, to find two different inputs with the same SHA-256 digest.

The avalanche property is what makes hashes good for detecting tampering. You cannot make a "small" edit to a file and keep a similar-looking hash.

## How to generate a hash

1. Open the [Hash Generator](/hash-generator).
2. Type or paste your text into the box.
3. The four digests appear together: SHA-1 (40 hex characters), SHA-256 (64), SHA-384 (96) and SHA-512 (128).
4. Click **Copy** beside the one you need.

The tool uses your browser's built-in Web Crypto API, the same primitives websites use for their own security. The text is converted to UTF-8 bytes before hashing, which matches what most programming languages do by default. Nothing is uploaded.

Two limits: it hashes **text**, not files, and it offers the SHA family only, not MD5. Since it works on exactly what is in the box, a trailing newline you paste in changes the answer. Try it: \`hello\` and \`hello\` followed by a new line give different digests (the second starts \`5891b5b5\`).

## Where hashes are used

- **Verifying downloads.** Publishers post the expected hash; you compute your own and compare.
- **Detecting changes.** Hash a document today and again next month. If the digests differ, the contents changed.
- **Deduplication.** Files with identical hashes are the same file, so storage systems keep one copy.
- **Digital signatures.** Signing a hash of a message is far cheaper than signing the whole message.
- **Content addressing and caches.** Build tools name files by hash so browsers fetch new versions automatically.
- **Integrity checks in APIs.** Webhooks often sign payloads using a keyed variant (HMAC), which adds a secret to the idea.

## SHA-1 versus SHA-256 and the longer variants

SHA-1 produces 160 bits and was widely used for years. In 2017, researchers publicly demonstrated a practical collision for it, and it has been deprecated for security-sensitive uses since. It still appears in older systems and in some non-security contexts, which is why the tool shows it. For anything new, pick SHA-256 or longer.

SHA-384 and SHA-512 are longer members of the SHA-2 family. They are not "more secure" in a way most applications need; SHA-256 is already considered strong. People choose them for compatibility with a specification or, on some 64-bit hardware, for speed.

## Hashing is not encryption

This is the most common confusion. Encryption hides data and can be undone with a key. A hash cannot be undone. So "decrypt my SHA-256" is a meaningless request, although websites that offer to do it are really just looking the hash up in a table of known inputs. That works only for short or common strings, like simple passwords.

If you want a message only a recipient can read, use encryption: see [AES-256 text encryption explained](/blog/aes-256-text-encryption-explained) and the [Text Encryptor](/text-encryptor).

## Hashing passwords: do not do it with plain SHA-256

It is tempting to hash a password with SHA-256 and store the result. The problem is speed. SHA-256 is built to be fast, which means an attacker who steals a table of hashes can test enormous numbers of guesses. Two defences are essential: a unique **salt** per password so identical passwords do not share a digest, and a deliberately **slow** algorithm. Use bcrypt, scrypt, Argon2 or PBKDF2 for that job. The password side of the story is in [strong passwords vs passphrases](/blog/strong-passwords-vs-passphrases).

## Where current tools fall short

Many hash websites send your input to a server, which is a bad habit when the text is a token, a key or a snippet of customer data. Others bury the hash in ads, offer only one algorithm at a time, or pair it with a "crack this hash" feature that encourages bad practice. A client-side generator computes the digest in your tab so the text stays with you.

The caveat of this one is scope. It does text only. If you need to checksum a large file, MD5, or keyed HMACs, use your terminal or a library.

## Everyday use cases

- **Comparing two long strings.** Hash both and compare 64 characters instead of reading two paragraphs.
- **Checking a pasted API payload.** Confirm you have the exact same text a colleague has.
- **Learning how hashes behave.** Change one letter and watch every character change.
- **Creating a stable identifier** from a string for a cache key or test fixture.
- **Matching a published value** for a text-based test vector.

## Working through a real check

Here is a small exercise that makes hashing concrete. Open the [Hash Generator](/hash-generator) and type \`hello\`. Copy the SHA-256 value. It should start \`2cf24dba\` and end \`9824\`. Now change the first letter to a capital, \`Hello\`. The new value starts \`185f8db3\` and nothing else lines up. You changed one bit of input out of forty and about half of the output bits flipped.

Next, add a space at the end of \`hello\`. Different again. Hashes cannot tell you that two inputs are "almost the same", only whether they are identical. That is why they are a precise equality test and a poor similarity test. If you want to see how much two documents differ, use a diff, such as [Text Diff](/text-diff), instead.

Now imagine a download page that lists a SHA-256 value for an installer. After you download the file you compute its hash with your operating system's command line tools and compare the result with the published one. If the two strings match exactly, the file you received is the file they published. If one character differs, discard the download. This protects against corruption and, if the hash was published on a separate trustworthy page, against tampering.

The same logic works for text you want to prove has not changed: store the digest now, recompute it later, and compare.

## Tips and mistakes to avoid

- **Mind invisible characters.** Spaces and newlines change the output.
- **Remember encoding.** Different encodings of the same visible text produce different hashes.
- **Compare the whole digest.** Do not trust the first few characters alone.
- **Never rely on a hash to hide secrets** that are short or guessable.
- **Prefer SHA-256 or above** for anything where security matters.
- **Uppercase and lowercase hex are the same.** \`ABC\` and \`abc\` as hex digits represent identical values, so differences in case are just formatting.

## Related reading

To pair hashing with real secrecy, read [AES-256 text encryption explained](/blog/aes-256-text-encryption-explained). For identifiers rather than fingerprints, see [UUID v4 explained](/blog/uuid-v4-explained). More utilities sit under [developer tools](/developer-tools).`,
  },
  {
    slug: 'unix-timestamp-explained',
    title: 'Unix Timestamps Explained: Epoch Time to Date and Back',
    description: 'What a Unix timestamp is, why it starts in 1970, seconds versus milliseconds, time zones, and the 2038 problem. Convert epoch time free in your browser.',
    date: '2026-10-03',
    updated: '2026-10-03',
    category: 'developer-tools',
    keywords: ['unix timestamp converter', 'epoch time to date', 'timestamp converter online', 'seconds vs milliseconds timestamp', 'year 2038 problem', 'convert date to unix timestamp'],
    relatedTools: ['/timestamp-converter', '/countdown-to-date', '/age-calculator', '/json-formatter'],
    faqs: [
      {
        q: 'What is a Unix timestamp?',
        a: 'It is the number of seconds that have passed since 00:00:00 UTC on 1 January 1970, a moment called the Unix epoch. For example, 1700000000 is 14 November 2023 at 22:13:20 UTC. Computers like it because it is one plain number with no time zone, month lengths or daylight saving to handle.',
      },
      {
        q: 'How do I convert a Unix timestamp to a date?',
        a: 'Paste the number into the [Timestamp Converter](/timestamp-converter). It shows the matching date and time in your browser\'s local time zone. To go the other way, pick a date and time and click Convert to epoch.',
      },
      {
        q: 'How can I tell whether a timestamp is in seconds or milliseconds?',
        a: 'Count the digits. A current timestamp in seconds has 10 digits. One in milliseconds, which is what JavaScript\'s Date.now() returns, has 13. This converter expects seconds, so divide a 13-digit value by 1000 first.',
      },
      {
        q: 'Does a Unix timestamp have a time zone?',
        a: 'No. A timestamp identifies one exact instant worldwide. Time zones only matter when you display it as a calendar date. The same timestamp shows as different clock times in London and Tokyo.',
      },
      {
        q: 'What is the Year 2038 problem?',
        a: 'Systems that store the timestamp as a signed 32-bit integer run out of range at 2147483647, which is 19 January 2038 at 03:14:07 UTC. One second later the value overflows. Modern 64-bit systems are not affected, but old embedded devices and file formats can be.',
      },
      {
        q: 'Why does my converted date look wrong by a few hours?',
        a: 'Almost always a time zone mix-up. The converter displays the date in your device\'s local zone, while the source of your timestamp may think in UTC. Compare against the UTC value before assuming the number is wrong.',
      },
    ],
    content: `You open a log file, an API response or a database row and find \`1700000000\` where a date should be. It is not corrupt. It is a Unix timestamp, perhaps the most widespread way software records "when".

This guide explains what the number means, why systems use it, the traps that cause wrong dates (seconds versus milliseconds, time zones, overflow), and how to convert in either direction with a free tool.

## What a Unix timestamp is

A Unix timestamp counts the seconds since **00:00:00 UTC on 1 January 1970**, the Unix epoch. Zero means that exact moment. One day later is 86400, because a day has 86,400 seconds. Dates before 1970 are negative numbers.

A few reference points you can verify:

- \`0\` is 1 January 1970, 00:00:00 UTC.
- \`1000000000\` is 9 September 2001, 01:46:40 UTC.
- \`1700000000\` is 14 November 2023, 22:13:20 UTC.
- \`2147483647\` is 19 January 2038, 03:14:07 UTC.

Unix time also ignores leap seconds, treating every day as exactly 86,400 seconds. For almost every purpose that is a feature: arithmetic stays simple.

## Why programs use timestamps

A date such as "03/10/2026" is ambiguous (is it March or October?), depends on a calendar, and needs a time zone before it identifies a moment. A timestamp is one integer that means the same thing everywhere. That gives you:

- **Easy sorting.** Larger number means later.
- **Easy arithmetic.** Add 3600 for an hour later, 86400 for a day.
- **Compact storage.** An integer beats a formatted string.
- **No locale confusion.** Formatting is left to the display layer.

## How to convert a timestamp to a date

1. Open the [Timestamp Converter](/timestamp-converter).
2. Paste the epoch value into **Unix epoch (seconds)**.
3. Read the date shown below it. It uses your browser's local time zone and prints something like a full day, date, time and zone name.
4. If the result says "Invalid timestamp", the field contains something that is not a number.

The converter loads with the current time already filled in, and **Use current time** resets it to now.

## How to convert a date to a timestamp

1. In the same tool, choose a date and time in the **Date & time** box. It is interpreted in your **local** time zone.
2. Click **Convert to epoch**.
3. The seconds value appears in the epoch field above.

If you need the epoch for a particular time in UTC, make sure your device's zone is what you expect, or work out the offset yourself. A date entered as "09:00" in New York and "09:00" in Berlin are different timestamps.

## Seconds versus milliseconds

This is the most common source of nonsense results. Unix systems and many databases use **seconds** (10 digits at present). JavaScript's \`Date.now()\`, Java and many JSON APIs use **milliseconds** (13 digits).

This converter expects seconds. If you paste \`1700000000000\` (milliseconds), it will interpret it as a number of seconds and show a date tens of thousands of years in the future, around the year 55,000. The fix is to drop the last three digits, or divide by 1000.

A quick rule: if the date looks absurdly far ahead, you probably have milliseconds.

## Time zones and daylight saving

A timestamp has no time zone. It points at one instant. Zones appear only when you format it. The same value displays as 22:13 in London in winter, 17:13 in New York and 07:13 the next morning in Tokyo.

Common ways to go wrong:

- Storing local times without a zone, then reading them elsewhere.
- Assuming a day is always 24 hours when daylight saving shifts a day to 23 or 25.
- Comparing a timestamp displayed in local time with one displayed in UTC.

A good habit: store and transmit timestamps or UTC, and convert to local time only when showing it to a person. For counting down to a date, [Countdown to Date](/countdown-to-date) does the arithmetic for you.

## The Year 2038 problem

If a system stores the timestamp in a signed 32-bit integer, the largest value is 2,147,483,647: 03:14:07 UTC on 19 January 2038. One second later it wraps to a large negative number, which software interprets as a date in 1901. Modern 64-bit systems can represent dates billions of years away, so most current software is safe. The risk is in old embedded devices, legacy databases and file formats with 32-bit fields.

## Where current tools fall short

Plenty of epoch converters exist, but common frustrations include: pages that guess seconds or milliseconds for you and sometimes guess wrong, results shown only in UTC or only in local time, pages cluttered with ads, and tools that send your value to a server for no reason. This one runs in the tab and uses your device clock and zone.

The caveats: it works in **seconds only**, shows a single local-time string rather than a list of formats, and accepts only the date and time you can enter in the browser's picker. It does not format ISO 8601 or custom patterns. For those, use your language's date library.

## Everyday use cases

- **Reading logs.** Convert the number in a log line to see when the event happened.
- **Debugging an API.** Check that an expiry or created_at field is in the future or the past you expect. Paste the JSON into the [JSON Formatter](/json-formatter) first if it is hard to read.
- **Setting expiry values.** Work out the timestamp for a certain date and time.
- **Scheduling.** Find the epoch for an event, then add 3600 times the hours you need.
- **Discord-style timestamps.** Discord's message timestamp syntax takes a seconds value, so this tool can supply the number.

## Reading timestamps in practice

A few patterns come up repeatedly once you start reading raw epoch values.

**Differences are durations.** Subtract two timestamps and you get seconds between them. 1700003600 minus 1700000000 is 3600, exactly one hour. Divide by 86400 for days. This makes timeouts and expiry checks trivial: a token issued at time T with a lifetime of 900 seconds expires at T plus 900.

**Round numbers are suspicious.** If you see 0 or a negative number where a date should be, the field was probably never set and the default epoch is leaking through. A date in January 1970 in a user interface is a classic sign of a missing value.

**Precision varies.** Some systems store seconds, some milliseconds, and a few microseconds or nanoseconds, which have 16 and 19 digits. Count the digits first, then divide down to seconds before pasting into the converter.

**Local conversion is for people.** When you convert with the [Timestamp Converter](/timestamp-converter), the displayed date is in your own zone. If you are debugging a server in another region, convert in your head to UTC, or compare two values from the same system rather than relying on the clock time shown.

A last tip for scheduling: pick the target date and time in the converter, click Convert to epoch, then add or subtract multiples of 3600 to move by hours.

## Tips and mistakes to avoid

- **Count digits before you convert.** Ten means seconds, thirteen means milliseconds.
- **Always note the zone.** If you share a converted date, say which zone it is in.
- **Use UTC for storage.** Local time for display only.
- **Do not treat timestamps as dates for age maths.** For years of age, use the [Age Calculator](/age-calculator).
- **Watch for the 2038 limit** when working with 32-bit systems.
- **Remember the date picker's local interpretation** when generating epochs for servers in other zones.

## Related reading

If you work with data formats, see [CSV vs JSON: when to use each](/blog/csv-vs-json-when-to-use-each) and [how minified JSON helps debugging](/blog/minified-json-debugging). For unique identifiers, read [UUID v4 explained](/blog/uuid-v4-explained). More utilities live in [developer tools](/developer-tools).`,
  },
  {
    slug: 'strong-passwords-vs-passphrases',
    title: 'Strong Passwords vs Passphrases: Which Should You Use?',
    description: 'Random passwords or multi-word passphrases? Learn how entropy works, how long is long enough, and the limits of our own generator and strength meter.',
    date: '2026-10-03',
    updated: '2026-10-03',
    category: 'security-privacy-tools',
    keywords: ['password vs passphrase', 'passphrase generator', 'password generator online', 'how long should a password be', 'password entropy explained', 'password strength checker'],
    relatedTools: ['/password-tool', '/passphrase-generator', '/hash-generator', '/protect'],
    faqs: [
      {
        q: 'Is a passphrase better than a password?',
        a: 'Not automatically. Strength comes from unpredictability, measured in bits of entropy. A long random password and a long random passphrase can both be very strong; the passphrase is simply easier to remember and type. A passphrase made of words you picked yourself is much weaker than one chosen by a random generator.',
      },
      {
        q: 'How long should a password be?',
        a: 'For accounts you store in a password manager, 16 or more random characters is a sensible default. The [Password Generator](/password-tool) offers lengths from 8 to 32. For the few secrets you must memorise, such as a manager\'s master passphrase, use many random words.',
      },
      {
        q: 'How many bits of entropy does a random password have?',
        a: 'Each character adds log2 of the pool size. With all four types ticked, this tool\'s pool is 88 characters, about 6.5 bits per character, so 16 characters give roughly 103 bits. Entropy only describes truly random choices; a password you invented has far less than the arithmetic suggests.',
      },
      {
        q: 'Is the MergeDoc passphrase generator strong enough for important accounts?',
        a: 'Be careful. Its word list is small, about 93 distinct words, so each word adds only about 6.5 bits. A four-word result is roughly 26 bits, which is weak against an offline attack. Eight words, the maximum, is roughly 52 bits. For anything important, use a password manager or a long list such as the 7,776-word diceware list.',
      },
      {
        q: 'Can I trust the strength meter?',
        a: 'Treat it as a rough guide. It scores length and character variety only, so it cannot spot common words, patterns or leaked passwords. For example, a short mixed-case password with a year and symbols can score higher than a long lowercase passphrase.',
      },
      {
        q: 'Are generated passwords sent anywhere?',
        a: 'No. Both generators run in your browser using the browser\'s secure random number source, and nothing is uploaded. Copying uses your clipboard, so clear it afterwards if the machine is shared.',
      },
    ],
    content: `Advice about passwords has flipped several times. Mix in symbols; no, use long words; change every 90 days; no, stop changing them. The confusion is understandable. This post cuts through it with the one idea underneath all of it: **how many guesses would an attacker need?** Then it applies that to random passwords and passphrases, including honest numbers for the generators on this site.

## What makes a secret hard to guess

Security people measure this in **bits of entropy**. Each bit doubles the number of guesses. A secret with 40 bits has about a trillion possibilities; 80 bits has a trillion times more.

For a *randomly* chosen secret, the arithmetic is simple. If each choice comes from a pool of N options, one choice adds log2(N) bits. Choose k times independently and the bits add up.

- A random lowercase letter: about 4.7 bits.
- A random character from 88 symbols, letters and digits: about 6.5 bits.
- A random word from a 7,776-word list: about 12.9 bits.

The word *randomly* carries all the weight. Entropy figures describe the generator, not the result. A password you invented, like \`Summer2024!\`, may look complex but sits in a tiny set of patterns that attackers try first.

## Random passwords

A random password of 16 characters drawn from all four character types gives roughly 103 bits in this tool's case: the pool is 26 lowercase, 26 uppercase, 10 digits and 26 symbols, which is 88 characters, and 16 times 6.46 is about 103. That is far beyond what anyone can brute force.

The catch is memory. Nobody remembers \`k#4Qv!9tZp2$Lm7x\`, and you should not try. Random passwords are for accounts where a password manager fills the field.

## Passphrases

A passphrase is several words in a row. The famous example is four unrelated words. It works because the human brain handles pictures and phrases much better than random characters, and because length is what raises entropy.

The strength depends entirely on the **word list size and on randomness**. Four words from a list of 7,776 give about 52 bits. Six give about 77. Words must be picked by dice or software, not by you. People choose predictable words and orders, and attackers' dictionaries model that.

Use a passphrase for the few secrets you must type from memory: your device login and the master password of a password manager.

## An honest look at the MergeDoc generators

The [Passphrase Generator](/passphrase-generator) draws words with the browser's secure random source, and lets you pick 3 to 8 words and a separator (hyphen, space, underscore or dot). But its built-in word list is short, about 93 distinct words. That is only about 6.5 bits per word:

- 4 words: roughly 26 bits.
- 6 words: roughly 39 bits.
- 8 words: roughly 52 bits.

Those are modest numbers. They are adequate for low-stakes uses like naming a temporary share, and weak for anything an attacker can test offline against a stolen hash. The [Password Generator](/password-tool), which draws every character from a pool of up to 88 symbols, is the stronger option here: 16 characters is about 103 bits.

If you want a memorable high-entropy passphrase, roll physical dice against a 7,776-word list (the EFF and original diceware lists are public) and use six or more words. For daily logins, let a password manager generate and store the secret.

## How to generate a strong password here

1. Open the [Password Generator](/password-tool).
2. Move the **Length** slider (8 to 32). For stored passwords choose 16 or higher.
3. Keep lowercase, uppercase, digits and symbols ticked. Untick symbols only when a site rejects them, and then add length.
4. Click **Generate password**, then **Copy**.
5. Paste straight into your password manager or the sign-up form. Do not save it in a text file.

## How to use the strength checker properly

The lower section of the same page scores a password you type. It is a **heuristic**: points for length of 8 and 12 or more, for using three or more character types, and for 16 or more characters with all four. It cannot recognise dictionary words, keyboard patterns or leaked passwords.

Two examples show the limit. \`correct horse battery staple\` scores only "Fair" because it is all lowercase, even though a randomly chosen four-word phrase from a big list is decent. Meanwhile \`Aa1!Aa1!Aa1!Aa1!\` scores "Very strong" although it is a repeating pattern an attacker would guess quickly. Use the meter to spot obviously weak passwords, not to certify strong ones.

## Where current tools fall short

Plenty of generators send requests to a server or load heavy scripts, which is exactly the wrong place for a secret. Many strength meters make confident claims from simple rules, and some websites enforce confusing rules (one symbol but not these symbols, maximum length 12) that push people toward weaker choices. Free generators attached to marketing funnels may ask for an email first.

This site's tools run in the tab with no account. The limits are the ones above: a small passphrase word list and a heuristic meter. They are tools for convenience, not a replacement for a password manager and two-factor authentication.

## Everyday use cases

- **New account sign-up.** Generate 20 random characters and store them in your manager.
- **Wi-Fi passwords for guests.** A memorable three or four-word phrase is easy to read out, and low stakes.
- **Protecting a PDF.** A long unique password for [Protect PDF](/protect) works better than a birthday.
- **Shared accounts.** Create a strong password once and share it through a secure channel.
- **Auditing old habits.** Test whether your reused favourite passes even a basic length check.

## Choosing by situation

Rather than ask which style is best, ask what the secret protects and where it lives.

**Stored in a password manager, used on a website.** Use a long random password. You never type it by hand, so memorability is irrelevant. Sixteen to twenty random characters is plenty. The manager also protects you against fake sites by filling only on the right domain.

**Typed from memory on a device.** Use a passphrase of at least five or six random words from a large list, plus a separator you like. You will type it many times a day, so choose something your fingers can learn.

**The master secret for the manager itself.** This is the one passphrase worth memorising well. Generate it randomly, write it down on paper once, keep the paper somewhere physically safe, and destroy it after you are certain you remember it.

**A file or archive that someone else must open.** Use a long random password and send it over a different channel from the file. Whether it is a PDF or an encrypted text, the weakest link is usually how the password is shared, not the encryption itself.

**A temporary, low-stakes share.** A short generated phrase is fine, as long as it is not reused anywhere.

In every case the same two rules apply: it must be unique to that one use, and chosen by a random process, not by you. Add two-factor authentication on top for anything that matters.

## Tips and mistakes to avoid

- **Never reuse passwords.** One breach then unlocks everything else.
- **Prefer length over cleverness.** Substituting \`@\` for \`a\` barely helps.
- **Do not build a passphrase from a quote or lyric.** They are in attackers' dictionaries.
- **Turn on two-factor authentication** wherever it exists.
- **Clear your clipboard** after copying on a shared machine.
- **Learn how sites store passwords.** If you build one, read [SHA-256 hash explained](/blog/sha-256-hash-explained) to see why plain hashes are not enough.

## Related reading

To lock documents with your new password, read the [password protect PDF guide](/blog/password-protect-pdf-guide). For encrypting text with a passphrase, see [AES-256 text encryption explained](/blog/aes-256-text-encryption-explained). Browse the full set in [security tools](/security-tools).`,
  },
  {
    slug: 'css-gradients-shadows-border-radius-guide',
    title: 'CSS Gradients, Shadows and Border Radius, Explained',
    description: 'Learn the syntax behind linear-gradient, box-shadow and border-radius, with the values to start from and free generators to preview and copy the CSS.',
    date: '2026-10-03',
    updated: '2026-10-03',
    category: 'developer-tools',
    keywords: ['css gradient generator', 'css box shadow generator', 'css border radius generator', 'how to add box shadow css', 'linear-gradient css syntax', 'border-radius four values'],
    relatedTools: ['/css-gradient-generator', '/css-box-shadow-generator', '/css-border-radius-generator', '/color-tool'],
    faqs: [
      {
        q: 'How do I make a CSS gradient background?',
        a: 'Use the \`linear-gradient()\` function as a background value, for example \`background: linear-gradient(90deg, #4f46e5, #ec4899);\`. The [CSS Gradient Generator](/css-gradient-generator) lets you pick two colours and an angle, shows a live preview and copies that line for you.',
      },
      {
        q: 'What do the numbers in box-shadow mean?',
        a: 'In order: horizontal offset, vertical offset, blur radius, spread radius, then colour. So \`0 10px 20px -5px rgba(0,0,0,0.25)\` pushes the shadow 10px down, softens it by 20px and shrinks it by 5px. Add the word inset to draw it inside the box.',
      },
      {
        q: 'In what order does border-radius take its four values?',
        a: 'Clockwise from the top-left: top-left, top-right, bottom-right, bottom-left. One value applies to all four corners. Two values set top-left and bottom-right first, then top-right and bottom-left.',
      },
      {
        q: 'How do I make a perfect circle with border-radius?',
        a: 'Give the element equal width and height, then set \`border-radius: 50%\`. For a pill-shaped button, use a very large pixel value such as 9999px, which rounds the ends fully whatever the height.',
      },
      {
        q: 'Can the generators make multi-colour gradients or layered shadows?',
        a: 'Not directly. The gradient tool uses two colours and the shadow tool produces a single shadow. You can copy the output and extend it by hand, adding more colour stops or comma-separated shadows.',
      },
      {
        q: 'Do shadows and gradients slow a page down?',
        a: 'Usually not noticeably, but very large blur radii on many elements, or on elements that animate, can cost rendering time. Keep blur moderate and test on a modest phone if you animate shadows.',
      },
    ],
    content: `Three CSS properties do a lot of the work in modern interface design: gradients for backgrounds, shadows for depth, and rounded corners for softness. Each has a small syntax that is easy to forget and annoying to tune by editing numbers blind.

This guide explains what each value does, gives sensible starting points, and shows how the free generators on this site speed up the trial and error. They preview as you drag and give you a line of CSS to paste.

## CSS gradients

A gradient is an image the browser generates, so you use it anywhere an image goes, usually in \`background\` or \`background-image\`. The two you need most are linear and radial.

### Linear gradients

The syntax is \`linear-gradient(angle, colour1, colour2)\`. The angle sets the direction of the colour change:

- \`0deg\` runs bottom to top.
- \`90deg\` runs left to right.
- \`180deg\` runs top to bottom.
- \`270deg\` runs right to left.

So \`background: linear-gradient(90deg, #4f46e5, #ec4899);\` blends from indigo on the left to pink on the right. Angles in between give diagonals, with \`135deg\` a popular top-left to bottom-right choice.

### Radial gradients

\`radial-gradient(circle, colour1, colour2)\` starts at the centre with colour 1 and spreads outward to colour 2. It suits spotlight effects, soft button highlights and glowing backgrounds.

### Colour stops

You can add more colours and set where each one sits: \`linear-gradient(90deg, #4f46e5 0%, #ec4899 60%, #f59e0b 100%)\`. Place two stops at the same percentage for a hard edge instead of a blend.

## How to build a gradient with the generator

1. Open the [CSS Gradient Generator](/css-gradient-generator).
2. Choose **linear** or **radial**.
3. For linear, drag the **Angle** slider (it shows the degrees).
4. Set **Color A** and **Color B** with the colour pickers.
5. Watch the preview, then click **Copy** to get a complete \`background: ...;\` line.

The tool covers two colours. For extra stops, paste the line into your stylesheet and extend it. If you need help choosing colours, the [Color Tool](/color-tool) converts between formats and checks contrast.

## Box shadows

The property takes up to five values plus an optional keyword: \`box-shadow: inset? x y blur spread colour;\`

- **x** moves the shadow right (positive) or left (negative).
- **y** moves it down (positive) or up (negative).
- **blur** softens the edge. Zero gives a hard edge. It cannot be negative.
- **spread** grows (positive) or shrinks (negative) the shadow before blur.
- **colour** is best given as a semi-transparent value like \`rgba(0, 0, 0, 0.25)\`.
- **inset** draws the shadow inside the box, useful for pressed or recessed looks.

The generator opens with \`0px 10px 20px -5px rgba(0, 0, 0, 0.25)\`. A negative spread tucks the shadow in so it appears mainly beneath the element, a more natural look than a halo all around.

## How to design a shadow with the generator

1. Open the [CSS Box Shadow Generator](/css-box-shadow-generator).
2. Adjust **Offset X**, **Offset Y**, **Blur** and **Spread** with the sliders.
3. Choose a colour and set **Opacity**; the tool converts it to an \`rgba()\` value.
4. Tick **Inset** if you want an inner shadow.
5. Click **Copy** to get \`box-shadow: ...;\`.

Rules of thumb for realistic shadows: keep opacity low (0.1 to 0.3), push the shadow down rather than sideways because light usually comes from above, and make bigger elements cast larger, softer shadows. Cards that float higher get a larger Y offset and blur.

To layer shadows, separate them by commas, for example a tight dark one plus a wide soft one. The generator makes one at a time, so copy each and join them yourself.

## Border radius

\`border-radius\` rounds corners. Values run **clockwise from the top-left**: top-left, top-right, bottom-right, bottom-left.

- One value, \`8px\`, applies to all four corners.
- Two values, \`8px 24px\`, set top-left and bottom-right to 8px, and top-right and bottom-left to 24px.
- Four values set each corner on its own.

Percentages are relative to the element's size. \`50%\` on a square makes a circle, and on a rectangle makes an ellipse. For a pill-shaped button whatever its height, use a large pixel value like \`9999px\`.

## How to round corners with the generator

1. Open the [CSS Border Radius Generator](/css-border-radius-generator).
2. Move the **Top-left**, **Top-right**, **Bottom-right** and **Bottom-left** sliders in pixels.
3. Check the preview shape.
4. Click **Copy** for \`border-radius: 16px 16px 16px 16px;\`. The tool always writes all four values, which you can shorten to one by hand when they match.

It works in pixels only and does not generate the elliptical form with a slash, such as \`50% / 20%\`.

## Where current tools fall short

Many CSS generator sites are slow, ad-heavy or tangled with sign-up prompts. Some output vendor prefixes that modern browsers no longer need, and others bundle every property into one cluttered panel. A few only produce code in a framework syntax you may not use.

These three tools are simple by design. They produce plain CSS, one property each, with no framework syntax. The limits are the ones already noted: two gradient colours, one shadow and pixel-only radii.

## Everyday use cases

- **Hero section background.** A soft diagonal gradient behind a headline.
- **Cards.** A gentle shadow and 12px radius to lift content from the page.
- **Buttons.** A pill radius with a subtle inset shadow on press.
- **Avatars.** Equal width and height with a 50% radius for round profile photos.
- **Prototypes.** Preview and copy a style before committing it to a stylesheet.

## Putting the three together

The properties combine well. A typical card component uses all three in a few lines:

\`background: linear-gradient(135deg, #4f46e5, #ec4899);\` for the fill, \`border-radius: 16px;\` for soft corners and \`box-shadow: 0px 10px 20px -5px rgba(0, 0, 0, 0.25);\` for depth. Generate each line with its tool, paste them into one rule, and adjust by eye.

A few judgement calls make results look professional rather than default. Use gradients between neighbouring hues, such as blue to purple, because gradients between opposites like red and green pass through a muddy middle. Keep your shadow colour tinted slightly toward your background colour rather than pure black if your design has a strong hue. Let the radius follow the size of the element: 6 to 8px for inputs, 12 to 16px for cards, larger values for big hero panels.

Consistency matters more than any single value. Pick a small scale, for example radii of 6, 12 and 24, and shadows at two or three elevations, and reuse them. In a stylesheet you can store them as CSS custom properties so you can change a look in one place.

Finally, test dark mode. A shadow that looks soft on white often disappears on a dark background, so you may want a stronger opacity or a lighter border instead.

## Tips and mistakes to avoid

- **Check text contrast on gradients.** Test your text colour against both ends of the gradient; see [WCAG colour contrast explained](/blog/wcag-color-contrast-explained).
- **Avoid harsh shadows.** High-opacity black looks dated; use low opacity.
- **Keep radii consistent.** Choose two or three values for your whole interface.
- **Remember shadows do not change layout.** They draw outside the box and can be clipped by a parent with hidden overflow.
- **Provide a fallback colour.** Set a solid \`background-color\` before the gradient for older browsers.
- **Use rgba for shadows,** not solid hex, so the shadow blends with whatever is behind it.

## Related reading

Other front-end posts include [WCAG colour contrast explained](/blog/wcag-color-contrast-explained) and [how to test a regex](/blog/how-to-test-a-regex). For related assets, see [resizing images without losing quality](/blog/resize-image-without-losing-quality). All the front-end helpers are listed under [developer tools](/developer-tools).`,
  },
  {
    slug: 'create-a-freelance-invoice',
    title: 'How to Create a Freelance Invoice as a PDF, Free',
    description: 'What a freelance invoice should include, how to add sales tax correctly, and how to make a clean invoice PDF free in your browser. Not tax or legal advice.',
    date: '2026-10-03',
    updated: '2026-10-03',
    category: 'calculators',
    keywords: ['invoice generator free', 'invoice generator for freelancers', 'invoice generator no sign up', 'what to include on an invoice', 'how to number invoices', 'sales tax calculator'],
    relatedTools: ['/invoice-generator', '/sales-tax-calculator', '/protect', '/merge'],
    faqs: [
      {
        q: 'How do I create a free invoice without signing up?',
        a: 'Open the [Invoice Generator](/invoice-generator), fill in the invoice number, date, your name, your client\'s name, line items and tax rate, then click Generate invoice PDF. It builds the file in your browser and downloads it. There is no account and no watermark.',
      },
      {
        q: 'What should a freelance invoice include?',
        a: 'At minimum: a unique invoice number, the issue date, who it is from and to, a clear description of the work, quantities and prices, any tax, the total, and how and when to pay. Depending on your country you may also need tax registration numbers and addresses. Check your local rules.',
      },
      {
        q: 'How should I number my invoices?',
        a: 'Use a simple sequence you will never repeat, such as INV-001, INV-002. Some people add the year, like 2026-004. The point is that every invoice has a unique, traceable number so you and your client can refer to it.',
      },
      {
        q: 'How do I add sales tax to an invoice total?',
        a: 'Enter the tax percentage in the Invoice Generator and it adds tax to the subtotal. If you only have a tax-inclusive price, use the [Sales Tax Calculator](/sales-tax-calculator) in Remove tax mode to find the pre-tax amount first.',
      },
      {
        q: 'Where do I put the due date and payment details?',
        a: 'The generator has no separate fields for these, so use the Notes line, for example "Due within 14 days. Bank transfer to ...". Keep it to one short line because notes are not wrapped onto extra lines.',
      },
      {
        q: 'Is this invoice legally valid?',
        a: 'This page is not legal or tax advice. Requirements for invoices differ by country, business type and tax status. The generator creates a simple document; confirm what your jurisdiction requires, and ask an accountant if you are unsure.',
      },
    ],
    content: `Invoicing is where freelance work turns into money, and it is often done badly: a late reply with a typed-up Word file, no number, no due date, and a total the client has to calculate themselves. A clear invoice gets paid faster simply because nobody has to ask a question about it.

This guide covers what to put on a freelance invoice, how to calculate tax without mistakes, and how to produce a tidy PDF for free in your browser. **A note first:** this is general information, not tax, legal or accounting advice. Invoice rules vary by country and by business status, so confirm yours with a professional.

## What a freelance invoice is for

An invoice is a request for payment and a record of what you agreed. It tells the client what they owe and why, and it gives you a paper trail for your own bookkeeping. A good one answers four questions at a glance: who is billing whom, for what, how much, and by when.

## What to include

Commonly expected elements are:

- **Invoice number.** Unique and sequential.
- **Issue date.** The day you send it.
- **Your name or business name** and contact details.
- **Client name** and contact details.
- **Line items.** A description, a quantity and a unit price for each.
- **Subtotal, tax and total.**
- **Payment terms.** Due date, accepted methods and bank or payment details.
- **Anything required where you live,** such as a tax registration number.

Many countries have extra requirements, especially for VAT or GST registered businesses. If you are registered, a more complete invoice will probably be needed than this tool produces.

## What the free generator produces

The [Invoice Generator](/invoice-generator) has fields for invoice number (it starts as INV-001), date (today's date, editable), From, To, one or more line items, a tax percentage, and a notes line. It outputs a single-page PDF in US Letter size, with a line-item table, subtotal, tax and total. Amounts are formatted with two decimals and no currency symbol.

Be aware of its limits: it takes names rather than full addresses, has no logo, no due-date field, and applies one tax rate to the whole invoice. Descriptions and notes sit on one line, so keep them short. If your text includes characters outside the standard Latin set, the PDF may fail to generate. Use plain characters, and put the currency in the description or notes, such as "Amounts in EUR".

## How to create the invoice

1. Open the [Invoice Generator](/invoice-generator).
2. Set the **invoice number** and check the **date**.
3. Fill in **From** (you) and **To** (the client). Both are required.
4. Add one line per deliverable: a description, quantity and price. Use **Add line item** for more.
5. Enter the **Tax (%)**. Leave it at 0 if you do not charge tax.
6. Use **Notes** for the due date, payment details and currency, in a single short line.
7. Click **Generate invoice PDF**. It downloads as, for example, \`INV-001.pdf\`.

Open the file and check every number before sending.

## A worked example

You spent 12.5 hours on design at 85 per hour and sold one hosting setup at 40, in a place with an 8 percent sales tax that applies to both.

- Design: 12.5 × 85 = 1,062.50
- Hosting: 1 × 40 = 40.00
- Subtotal: 1,102.50
- Tax at 8%: 88.20
- **Total: 1,190.70**

If the client later asks "what is that before tax?" the answer is the subtotal. If you start from a tax-inclusive 1,190.70 and need the pre-tax amount, divide by 1.08 to get 1,102.50, or let the [Sales Tax Calculator](/sales-tax-calculator) do it: choose **Remove tax from total**, enter the total and rate, and it shows pre-tax, tax and total.

Remember that "tax rate" differs by place and by what you sell. Some services are exempt and some rates change, so always confirm the figure you apply.

## Numbering and tracking

Pick a numbering format once and stick to it. Simple sequences like INV-001, INV-002 work for most freelancers. Adding a year (2026-004) helps when you reach hundreds of invoices. Never reuse a number, and keep a list of what you have sent and what has been paid, even if it is just a spreadsheet.

Send the invoice promptly. The longer you wait after delivering work, the harder it is to get it paid on time. Mention the due date in the email too.

## Protecting what you send

An invoice usually includes your name, your client's name and payment details. If you email it, you can add a password with [Protect PDF](/protect) and share the password on a different channel. If you invoice for several jobs at once, combine the PDFs into one document with [Merge PDF](/merge). Both run in your browser, so the documents are not uploaded. For a wider look at that question, read [is it safe to upload confidential PDFs](/blog/is-it-safe-to-upload-confidential-pdfs).

## Where current tools fall short

Invoice tools tend to fall into two groups. Full invoicing platforms are powerful, with recurring billing, reminders, payment links and accounting integrations, but they usually want an account, may charge once you pass a number of clients or invoices, and store your client data on their servers. Free invoice-template websites are quicker but often add watermarks, ask for an email before download, or upload what you type.

MergeDoc's generator sits at the simple end. It makes a clean one-page PDF with no sign-up and no stored data. It does not track payment status, send reminders, calculate late fees or store clients. If you invoice more than a handful of clients a month, a dedicated invoicing or accounting tool will save time.

## Getting paid on time

The invoice itself is only half of the job. A few habits make a real difference to how quickly money arrives.

Agree terms before you start. A line in your proposal or message thread, such as "50 percent upfront, balance within 14 days of delivery", means the invoice is never a surprise. When you send the invoice, repeat the terms in the email and attach the PDF rather than linking to it.

Send it to the person who can approve payment, not just your day-to-day contact. In larger companies invoices often have to reach an accounts team, and asking at the start who that is saves weeks.

Make paying easy. Put the full payment details in the notes line or in the email body, and say which reference to quote, usually the invoice number. Follow up politely a few days before the due date and again the day after. Most late payments are forgotten, not refused.

Keep your records. Store the PDF, the email and any signed agreement together. If a dispute comes up, or when you prepare your own tax filing, you will be glad to have a complete trail. Again, what you must keep and for how long depends on where you live, so check with a local professional.

## Everyday use cases

- **One-off project.** A designer bills a client for a logo and revisions.
- **Hourly work.** A tutor or consultant bills a month of sessions.
- **Side income.** A weekend market seller prepares a receipt-style invoice for a bulk order.
- **Reselling.** Add a product line with quantity and unit price and a tax rate.
- **Quotes turned invoices.** Reuse the same description lines once the work is delivered.

## Tips and mistakes to avoid

- **Include a due date.** Without one, there is no "late".
- **Describe the work clearly.** "Website design, homepage and 3 inner pages" beats "services".
- **Keep a copy of every invoice** along with the matching email.
- **Do not guess the tax rate.** Check the rule for your place and what you sell.
- **Check your arithmetic.** The generator multiplies quantity by price and applies tax to the subtotal, but the numbers you type are your responsibility.
- **Pay attention to rounding.** If your tax authority requires a particular rounding method, verify it.

## Related reading

For tax maths in everyday life, see [loan EMI formula explained](/blog/loan-emi-formula-explained) for a similar worked-example approach. To keep the PDF safe, read the [password protect PDF guide](/blog/password-protect-pdf-guide). More money tools sit in [calculators](/calculators).`,
  },
]
