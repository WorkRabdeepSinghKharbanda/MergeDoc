import type { BlogPost } from '../blogTypes'

export const EXPANDED_POSTS_1: BlogPost[] = [
  {
    slug: 'merge-pdf-without-uploading',
    title: 'Merge PDF Files Without Uploading Them Anywhere',
    description: 'Combine several PDFs into one in your browser. No upload, no sign-up, no watermark, no file-size cap set by a server.',
    date: '2026-01-15',
    updated: '2026-10-03',
    category: 'pdf-tools',
    keywords: ['merge pdf without uploading', 'combine pdf files offline', 'merge pdf no watermark', 'join pdf free', 'merge pdf privately', 'combine pdfs in browser'],
    relatedTools: ['/merge', '/reorder', '/split', '/compress'],
    faqs: [
      { q: 'Can I merge PDF files without uploading them?', a: 'Yes. MergeDoc reads your files into your browser\'s memory, builds the combined PDF with JavaScript, and hands you the result as a download. No file is sent to a server at any point, which you can confirm by watching the Network tab in your browser\'s developer tools.' },
      { q: 'Is there a limit on how many PDFs I can merge?', a: 'MergeDoc sets no page or file-count limit. The practical ceiling is your device\'s memory: a few hundred pages of text merge instantly, while many large scanned files may slow down a phone or an old laptop.' },
      { q: 'How do I merge PDFs without a watermark?', a: 'Use a tool that does not add one. The [Merge PDF](/merge) tool produces a clean file with no watermark, no footer and no sign-up. Some online mergers add a mark on free plans, so check the output before you send it on.' },
      { q: 'Will merging change the quality of my PDFs?', a: 'No. Merging copies the existing pages into a new document without re-rendering them, so text stays selectable and images keep their original resolution. The merged file is roughly the sum of the inputs.' },
      { q: 'Can I merge PDFs on my phone?', a: 'Yes, in a modern mobile browser. Select the files from your Files app or cloud storage, arrange them, and download the result. Very large files are slower on a phone because everything happens on the device.' },
      { q: 'Can I merge password-protected PDFs?', a: 'Not directly. Remove the password first using the remove mode in [Protect PDF](/protect), merge the files, then add a password to the combined result if you still need one.' },
    ],
    content: `Most "free" PDF mergers work the same way: your files travel to someone else's server, get combined there, and a link comes back. For a restaurant menu that is harmless. For a signed contract, a tax return, a medical record or anything covered by an NDA, you have just made an extra copy of the document on a machine you know nothing about.

You do not need that trade. Combining PDFs is a page-copying job that a modern browser can do by itself, and that is how MergeDoc does it.

## What "merge without uploading" actually means

When you add files to the [Merge PDF](/merge) tool, the browser reads them from your disk into memory. A JavaScript PDF library copies each page, in order, into a new document and produces the finished file as a download. The files never enter an HTTP request.

You can verify this yourself. Open your browser's developer tools, switch to the Network tab, merge two files, and watch: you will see the page and its scripts load, but no request carries your PDFs out. Once the page has loaded, you can even switch off Wi-Fi and the merge still works.

## How to merge PDFs in your browser

1. Open [Merge PDF](/merge) in any current browser.
2. Drop your PDFs onto the page or click to choose them. You can add files in several batches.
3. Put them in the final order. Drag a file up or down, or use the move controls if you are on a touch screen.
4. Click merge. The combined PDF is generated and downloaded straight away.
5. Open the result and scroll through it once before sending it anywhere.

If one page ends up in the wrong place, use [Reorder Pages](/reorder) to fix it. If you need only part of a file before merging, cut it first with [Split PDF](/split).

## Why merging locally is better

- **Privacy by design.** Nothing to delete afterwards, no retention policy to read, no logs on a third-party server. Your copy is the only copy.
- **No size cap from a backend.** Upload-based tools usually limit file size or page count because every byte costs them bandwidth. A local tool is limited by your device, not by a plan.
- **Speed.** There is no upload or download of the inputs, so a 40 MB set of files merges in about the time it takes to read them from disk.
- **No account.** You do not hand over an email address to combine two files.
- **Text and quality survive.** Pages are copied, not re-rendered, so searchable text stays searchable and images stay sharp.

## Where typical online mergers fall short

Compare the experience of a common upload-based merger with what you actually wanted, which was "one file, now":

- **Upload wait.** On a slow connection, sending 100 MB of scans takes longer than the merge itself.
- **Free-tier limits.** Many services cap the number of files, the total size, or the number of merges per day, then ask you to subscribe.
- **Sign-up walls.** An account or email is required before the download button works.
- **Watermarks and ads.** Some free outputs carry a mark or push you through ad pages to reach the file.
- **Expiring links.** The result is often available for a limited time, so if you close the tab you start over.
- **Unclear retention.** The page says files are deleted "after a while", but you have no way to check.

None of this means those services are doing something sinister. It means the design forces you to depend on them for a task that does not need a server.

## Everyday situations where this helps

- **Loan or rental applications.** Payslips, a bank statement and an ID scan are three files; the portal wants one. Merge them locally so your financial documents do not pass through a stranger's server.
- **Contract packs.** A main agreement plus its schedules and a signed cover page become one document with sensible page order.
- **School and university submissions.** A report, an appendix of printed forms and a cover sheet need to go in as a single upload.
- **Expense claims.** Twelve photographed receipts converted with [Image to PDF](/image-to-pdf) and merged into one file the finance team can open.
- **Personal records.** Combine scanned medical letters into one file per year so you can find them later.

## Tips and mistakes to avoid

- **Name files in order before you add them.** If the filenames start with 01, 02, 03, the order is already right when they arrive.
- **Check page orientation.** If one scan came out sideways, fix it with [Rotate PDF](/rotate) before merging, not after.
- **Do not merge files you have not opened.** A corrupted or password-protected input is the usual reason a merge fails.
- **Expect a big result.** The merged file is about as large as the inputs combined. If it is too big to email, see [how to reduce PDF file size](/blog/reduce-pdf-file-size) for what helps and what does not.
- **Mind what you are combining.** Merging does not remove hidden content such as metadata from the originals. If that matters, review it with [Edit Metadata](/metadata).
- **Keep the originals.** A merge creates a new file; it does not change the old ones, which is useful if you need to redo it.

One honest limit: because all the work happens on your device, a very large merge on a low-memory phone can stall. If that happens, merge in two batches and then combine the two results.

## A worked example: a rental application in ten minutes

Say a letting agent asks for one PDF containing your ID, three payslips and a bank statement. You have five files: a phone photo of your passport, three payslip PDFs from your employer portal, and a statement downloaded from your bank.

Start by converting the passport photo with [Image to PDF](/image-to-pdf), so every item is a PDF. Rename the files 01-id, 02-payslip-jan, 03-payslip-feb, 04-payslip-mar and 05-statement. Add all five to [Merge PDF](/merge); because of the numbering they arrive in the right order. Merge, download, and open the result. Check that the passport page is the right way up and the statement did not lose its last page. If the file is over the agent's size limit, read [how to reduce a PDF's file size](/blog/reduce-pdf-file-size) before you try again.

Nothing in that process required an account, and the only copies of your documents are on your own machine and in the email you send.

## How merging works under the hood

A PDF is a set of numbered objects: pages, fonts, images and a table that says where each one lives. Merging copies the page objects, and the resources they depend on, from each source document into a new one, then writes a fresh table. Because the page content is copied rather than redrawn, nothing is re-rendered or re-compressed. That is why text stays selectable and why the output is close to the sum of the inputs.

It also explains two limits. Bookmarks and form fields that belong to the original documents may not carry across cleanly, and any document-level setting, such as an open password, applies to the source file, not the merged one. If you need either preserved, check the result before relying on it.

## When a merge looks wrong

If the result is missing a page or shows pages in the wrong order, the fix is almost always upstream. Open each input on its own and confirm it has the pages you expect; a partially downloaded file or a scan that failed halfway is a common cause. If a page shows up sideways, rotate it, and if the document will not load at all, the file may be damaged or encrypted. Re-export it from its source program and try again.

## Related reading

If you want to understand why this approach is safer, read [why client-side tools matter](/blog/why-client-side-tools-matter). Before you share a merged file, [password protecting a PDF](/blog/password-protect-pdf-guide) explains what encryption does and does not cover. You can browse every document tool on the [PDF tools](/pdf-tools) page, including [Split PDF into Pages](/split-pdf-pages) and [Compress PDF](/compress).`,
  },
  {
    slug: 'reduce-pdf-file-size',
    title: 'How to Reduce a PDF\'s File Size: What Works and What Doesn\'t',
    description: 'Why PDFs get large, which fixes actually shrink them, and an honest look at what a browser-based compressor can and cannot do.',
    date: '2026-01-22',
    updated: '2026-10-03',
    category: 'pdf-tools',
    keywords: ['reduce pdf file size', 'compress pdf', 'make pdf smaller', 'pdf too large to email', 'shrink pdf without losing quality', 'pdf file size too big'],
    relatedTools: ['/compress', '/split', '/pdf-to-image', '/image-compress', '/metadata'],
    faqs: [
      { q: 'How do I reduce a PDF file size without losing quality?', a: 'Find out what is making it big. If it is structural overhead, re-saving with object streams can trim it with no visible change. If it is images, the only real savings come from downsampling or re-compressing those images, which does reduce quality to some degree.' },
      { q: 'Why is my PDF so large?', a: 'Almost always because of images: scans, photos, or high-resolution graphics. A single full-page scan at 300 dpi can be several megabytes, so a 30-page scanned document easily reaches tens of megabytes. Text-only PDFs are usually small.' },
      { q: 'Will MergeDoc\'s Compress PDF shrink a scanned document?', a: 'Not by much. The tool re-saves the file with object streams enabled, which removes structural duplication. It does not re-encode the images inside, so image-heavy and scanned PDFs often stay close to their original size.' },
      { q: 'How can I make a PDF small enough to email?', a: 'Remove pages you do not need with [Split PDF](/split), re-export from the original application with a lower image quality setting, or send the document as a download link instead. Many mail providers cap attachments at roughly 20-25 MB.' },
      { q: 'Does converting a PDF to images make it smaller?', a: 'Sometimes, but it costs you selectable text and searchability, and the result can be larger if the images are high resolution. Treat it as a last resort for destinations that only accept images.' },
      { q: 'Is it safe to compress a PDF online?', a: 'It depends on the tool. Upload-based compressors send your file to a server. MergeDoc processes the file in your browser, so it never leaves your device.' },
    ],
    content: `A PDF that will not fit through an email attachment limit is a very common, very annoying problem. The advice online tends to promise a magic "compress" button. The truth is more useful: a PDF is big for a specific reason, and the fix depends on the reason.

## Why PDFs get large

A PDF is a container. Inside it are page descriptions, fonts, images and a bit of bookkeeping. In practice the size comes from three places:

- **Images.** A scan or photo is pixel data, and pixel data is heavy. A full-page scan at 300 dpi can take several megabytes on its own, so a scanned 30-page document is easily tens of megabytes. A text-only report of the same length might be a few hundred kilobytes.
- **Fonts.** Each embedded font adds weight. Documents assembled from many sources sometimes carry several copies of the same font.
- **Structure and leftovers.** Uncompressed object streams, unused resources and metadata from repeated edits add a smaller amount.

Open the PDF and ask yourself: is this mostly photographs and scans, or mostly text? That answer decides everything below.

## What our Compress PDF tool does, and what it does not

Here is the honest version. [Compress PDF](/compress) re-saves the document with object streams enabled. That is a structural clean-up: it packs the internal objects tighter and removes some duplication.

It does **not** re-encode the images inside your PDF. So for a text-based report assembled from several files, you may see a visible drop. For a scanned document or a photo-heavy brochure, the file often stays close to its original size. If a tool promises to shrink a scan by 90% without touching its images, be sceptical.

## How to reduce a PDF's size, step by step

1. **Check the type.** Text-based PDF or scan? Right-click the file for its size and compare with its page count. More than about 1 MB per page usually means images.
2. **Remove pages you do not need.** Use [Split PDF](/split) to extract only the pages the recipient requires. Dropping half the pages halves the size for free.
3. **Run the structural clean-up.** Open [Compress PDF](/compress), add the file and download the result. It is quick, loses nothing, and is worth trying first.
4. **Rebuild from smaller images if you have the originals.** Compress the source photos with [Image Compressor](/image-compress) or shrink their dimensions with [Image Resizer](/image-resize), then rebuild the PDF with [Image to PDF](/image-to-pdf). This is where the real savings come from for scans.
5. **Re-export from the source program.** If you have the original document, "Save as PDF" with a "minimum size" or "reduced quality" option will downsample images at the source.
6. **Clear unneeded metadata.** [Edit Metadata](/metadata) shows author and software fields. This saves little space but removes information you may not want to share.

## The option of last resort: convert to images

[PDF to Image](/pdf-to-image) turns each page into a JPG. That can help when the destination only accepts pictures. It also removes selectable text, breaks searching and links, and can produce larger files at high resolution. Use it only when you must.

## Benefits of shrinking before you send

- Attachments go through mail limits that commonly sit around 20-25 MB.
- Upload forms on government and university portals often cap files at a few megabytes.
- Smaller files open faster on phones and cost less mobile data.
- Fewer pages, cleaner metadata and a leaner file are easier for the recipient to handle.

## Where current tools fall short

Many online compressors have the same pattern of drawbacks:

- **Your file is uploaded** to a server you cannot inspect, which is a problem for anything private.
- **Daily or per-file limits** push you to a paid plan after a couple of uses.
- **Sign-up requirements** before the download appears.
- **Watermarks or ad detours** on the free tier.
- **Opaque quality loss.** Some tools downsample images heavily without telling you, so a signature or a small print line becomes unreadable.

A local tool avoids the upload and the limits. It cannot do miracles on images, which is why the rest of this guide matters.

## Everyday situations

- **Job application.** The portal accepts 5 MB; your CV with a scanned certificate is 14 MB. Extract the pages you need, then rebuild the certificate from a smaller image.
- **Emailing a signed form.** A phone scan of one page arrives at 8 MB. Re-scan at lower resolution or compress the photo first.
- **Sharing a brochure.** A designer's export with print-quality images is overkill for a screen. Ask for a web-quality export.
- **Archiving old receipts.** Merge a year of receipts into one file after shrinking each photo; storage and search both get easier.

## Tips and mistakes to avoid

- **Do not shrink scans below readable size.** Zoom to 100% and read the smallest text before you send.
- **Keep the original.** Compression of images is one-way. Save the large version separately.
- **Avoid compressing the same JPEG repeatedly.** Each re-encode adds artefacts.
- **Do not rely on a password to shrink a file.** [Encryption](/blog/password-protect-pdf-guide) does not reduce size.
- **Combine after shrinking, not before.** When you [merge PDFs](/blog/merge-pdf-without-uploading), shrink each image first so you do the work once.
- **Check the result.** Open the final file, scroll the whole document and test that links and forms still behave.

## A quick way to estimate where the size comes from

You do not need special software to guess the cause. Divide the file size by the page count. A text-only page typically weighs a few kilobytes to a few tens of kilobytes. A page that is mostly a scanned photograph often weighs between several hundred kilobytes and a few megabytes. If your 20-page file is 40 MB, that is 2 MB a page, which is almost certainly scans or photos.

Next, try selecting text with your cursor. If you can highlight words, the page has a real text layer and fonts may be a factor. If the whole page highlights as one block, it is a picture, and only changing the picture will make a real difference.

## What each fix typically gives you

Treat these as rough expectations, not guarantees, because results vary with the document:

- **Removing pages** reduces size roughly in proportion to what you cut.
- **Structural re-saving** can trim a modest amount from files built by merging or exporting several times, and often nothing from a clean scan.
- **Lowering image resolution** is the biggest lever. Halving the pixel dimensions of an image cuts its pixel count to a quarter, though the file size does not shrink by exactly that factor.
- **Lower JPEG quality** helps a lot at first. Going from maximum quality to a moderate setting often saves a large share with little visible change, while pushing further quickly adds visible artefacts.

Reading in the other direction, if a tool claims 90% off a scan with no visible change, check the output at 100% zoom before you trust it.

## When to split instead of shrink

Sometimes the better answer is not a smaller file but two files. A 60 MB portfolio that must go through a 25 MB limit can be cut into parts with [Split PDF](/split) and sent as two emails, or shared through a link. That keeps full quality for the reader and costs you nothing in sharpness.

## One more practical rule

Always compare before and after. Note the size of the original, run one fix at a time, and record what each step saved. That way you learn which lever works for your type of document, and you avoid stacking changes that only add risk. For a monthly report you produce every time, that knowledge saves you the guesswork from then on.

## Related reading

For the privacy side of online file tools, read [is it safe to upload confidential PDFs](/blog/is-it-safe-to-upload-confidential-pdfs). If your images are the problem, [compress images for faster websites](/blog/compress-images-for-faster-websites) covers quality settings in more detail. All document tools are on the [PDF tools](/pdf-tools) page, and the [Image Tools](/image-tools) page lists the image side.`,
  },
  {
    slug: 'password-protect-pdf-guide',
    title: 'How to Password Protect a PDF (and Remove It Later)',
    description: 'Add or remove a PDF password in your browser, and learn what encryption protects, what it does not, and how to choose a strong password.',
    date: '2026-02-03',
    updated: '2026-10-03',
    category: 'security-privacy-tools',
    keywords: ['password protect pdf', 'encrypt pdf', 'remove pdf password', 'add password to pdf free', 'secure pdf before emailing', 'pdf encryption'],
    relatedTools: ['/protect', '/redact-pdf', '/watermark', '/passphrase-generator', '/password-tool'],
    faqs: [
      { q: 'How do I password protect a PDF for free?', a: 'Open [Protect PDF](/protect), choose the file, type a password and download the encrypted copy. It runs in your browser, so the file and the password are not sent anywhere, and there is no account or watermark.' },
      { q: 'Can I remove a password from a PDF?', a: 'Yes, if you know the password. Use the remove mode in the same tool: enter the current password and it saves a copy without encryption. If you have forgotten the password, there is no recovery option.' },
      { q: 'What happens if I forget the PDF password?', a: 'You will most likely lose access to the file. Strong PDF encryption is designed so that nobody, including the tool that applied it, can open the file without the password, so store the password in a password manager.' },
      { q: 'Does a password stop people from copying text or printing?', a: 'Once someone has the password and opens the file, they can read and copy the content. A password protects the file from being opened by people who do not have it; it is not a way to control what an authorised reader does.' },
      { q: 'Is password protection the same as redaction?', a: 'No. Protection stops people without the password from opening the file. Redaction hides parts of the content from people who do have access. They solve different problems, and for sensitive material you may need both.' },
      { q: 'What makes a good PDF password?', a: 'Length matters more than cleverness. A random passphrase of four or five unrelated words is easy to type and hard to guess. Avoid names, birthdays and anything reused from other accounts.' },
    ],
    content: `You are about to email a payslip, a signed lease or a scan of your passport. If the message goes to the wrong address, or the mailbox is later compromised, the attachment is readable by anyone who finds it. A password on the PDF turns that attachment into unreadable data unless the person also has the password.

It is a small step, and it is worth understanding what it covers before you rely on it.

## What PDF password protection is

PDF encryption comes in two kinds that are often confused:

- **An open password** (user password) that is required to open the file at all.
- **A permissions password** (owner password) that restricts actions such as printing or copying while the file remains openable.

For most people, "protect this PDF" means the first one: nobody can open or preview the file without the password. [Protect PDF](/protect) does this by applying the password to the document in your browser. Note that it sets the same value as both the opening password and the owner password.

## How to add a password to a PDF

1. Open [Protect PDF](/protect) and make sure you are in the add-password mode.
2. Choose your PDF.
3. Enter a password. Use a long one: a passphrase from the [Passphrase Generator](/passphrase-generator) or a random string from the [Password Generator](/password-tool).
4. Run the tool and download the protected copy.
5. Test it. Open the new file; it should ask for the password. Keep the original until you have confirmed the protected one works.
6. Send the password through a different channel from the file, for example by message or phone.

## How to remove a password

Switch the tool to the remove mode, select the encrypted PDF, enter its current password and download the unlocked copy. This is useful when you want to merge the file with others (see [merge PDFs without uploading](/blog/merge-pdf-without-uploading)) or archive it without having to enter a password each time. It only works if you know the password.

## Benefits

- **Protection if the email goes astray.** A wrong recipient or a breached mailbox gets an unreadable file.
- **Works with any viewer.** The recipient does not need special software, only a PDF reader that supports encrypted files, which includes browsers and phone apps.
- **No account, no upload.** Because the file is processed on your device, the unprotected version is never held by a third party.
- **Simple to audit.** The protected file is either asking for the password or it is not.

## Where current tools fall short

If you search for "password protect PDF online", the most prominent results often work by uploading the file. That is awkward: to protect a sensitive document you first hand an unprotected copy to a server. Other limits to watch for:

- File size or page caps on the free tier.
- Sign-up before download.
- Output with a watermark or branding.
- Download links that expire.
- Unclear information on how long your original is kept.

Local processing sidesteps all of that, because there is nothing to retain.

## What a password does not do

This is the part people get wrong.

- **It does not hide parts of a page.** Anyone with the password sees everything. If a document contains information the reader should never see, remove it first. [Redact PDF](/redact-pdf) draws opaque black boxes over regions, but note that it is a visual cover; it does not strip the underlying text, so do not treat it as a guarantee for highly sensitive content.
- **It does not stop copying after opening.** Screenshots, retyping and copy-and-paste are all possible for an authorised reader.
- **It does not mark ownership.** To make a copy traceable, add a visible mark with [Watermark PDF](/watermark).
- **It does not protect weak passwords.** A short word can be guessed by trying a list. The same principle applies as in [AES-256 text encryption](/blog/aes-256-text-encryption-explained): the strength of the lock depends on the passphrase.
- **It does not provide recovery.** Lose the password and the file is effectively gone.

## Everyday situations

- **Sending financial documents to an accountant.** Bank statements and tax forms protected with a password shared by phone.
- **Rental applications.** An ID and payslips merged into one file, protected, and sent to a letting agent.
- **Medical paperwork.** Scanned letters or test results shared with a family member.
- **Client deliverables.** A draft proposal protected until the contract is signed.
- **Personal archives.** Passport and insurance scans stored in a cloud folder with a password on each file.

## Tips and mistakes to avoid

- **Never put the password in the same email as the file.** That defeats the purpose.
- **Use a password manager.** Store the password where you can find it in a year.
- **Pick length over complexity.** Four unrelated words beat "P@ssw0rd1".
- **Do not reuse a password** from your email or bank for a file you send to someone else.
- **Keep an unprotected original in a safe place** if you may need to edit it again. Editing an encrypted file requires removing the password first.
- **Redact before you encrypt.** Encrypting does not remove what should not have been in the file in the first place.
- **Check the final file** on a second device or viewer before you rely on it.

## A short checklist before you send a protected PDF

Run through this each time you protect a document:

- Is every page something the reader is meant to see? If not, remove or redact first.
- Is the password long enough, ideally four or more random words?
- Have you tested opening the protected copy in a different viewer, for example a browser and a phone?
- Will the password travel by a different route from the file?
- Do you have the original stored somewhere safe, in case you need to edit it?

It takes under a minute, and it catches the mistakes that cause most problems: a file that cannot be opened by the recipient, or a password that ends up in the same email as the attachment.

## Open passwords versus permissions: why people get surprised

PDF files can also carry permission flags, such as "do not allow printing" or "do not allow copying text". Some viewers respect them and some do not, and they are not a strong security measure. The flags are advisory instructions to well-behaved software. Only the open password actually encrypts the content so that it cannot be read without the key.

This is worth remembering if someone asks you to make a PDF "uneditable" or "uncopyable". A password stops outsiders from reading the file. It does not stop an authorised reader from taking screenshots or retyping a page, and it does not guarantee how a third-party viewer will treat permission flags. If you need a document to be a fixed record, a better route is to share it as a flattened PDF and keep your editable source separate.

## What if the recipient says it will not open?

Start with the basics. Passwords are case-sensitive, and a trailing space copied from a chat message is a very common cause. Ask them to type it rather than paste, or paste it into a plain text box first and check it. If their viewer is very old it may not support modern encryption, in which case a current browser or any recent PDF reader will work. As a last step, protect the original again with a fresh password and send that.

## Related reading

For the bigger picture of sharing sensitive files, read [is it safe to upload confidential PDFs](/blog/is-it-safe-to-upload-confidential-pdfs) and [strong passwords vs passphrases](/blog/strong-passwords-vs-passphrases). To see how the browser handles this work without a server, read [why client-side tools matter](/blog/why-client-side-tools-matter). More tools are on the [security tools](/security-tools) and [PDF tools](/pdf-tools) pages.`,
  },
  {
    slug: 'qr-codes-static-vs-dynamic',
    title: 'Static vs Dynamic QR Codes: Which One Do You Need?',
    description: 'How static and dynamic QR codes differ, what each costs you over time, and how to choose before you print anything.',
    date: '2026-02-14',
    updated: '2026-10-03',
    category: 'qr-code-tools',
    keywords: ['static vs dynamic qr code', 'static qr code', 'dynamic qr code', 'do qr codes expire', 'free qr code generator no expiry', 'qr code for business card'],
    relatedTools: ['/qr-generator', '/vcard-qr', '/qr-batch-generator', '/qr-scanner'],
    faqs: [
      { q: 'What is the difference between a static and a dynamic QR code?', a: 'A static QR code contains your final content, such as a URL or text, directly in the pattern. A dynamic QR code contains a short redirect link controlled by a service, which then forwards the scanner to your destination. Dynamic codes can be edited after printing; static ones cannot.' },
      { q: 'Do static QR codes expire?', a: 'No. A static code has no server behind it, so it works for as long as the destination it points to exists. A static code that links to a web page stops being useful only if that page is taken down.' },
      { q: 'Can I change where a static QR code points?', a: 'No. The destination is part of the pattern. To point somewhere else you must generate and distribute a new code, or point the code at a URL you control and change what that page shows.' },
      { q: 'Can a static QR code track scans?', a: 'Not by itself. Tracking requires a redirect that counts visits, which is what dynamic codes provide. A workaround is to add a tracking parameter to the link, but that depends on analytics at the destination.' },
      { q: 'Are free QR code generators safe?', a: 'Static ones that run in your browser are safe in the sense that nothing is sent anywhere. Be careful with services that generate a short redirect link for free, because the code may stop working if the service changes its terms or removes your account.' },
      { q: 'How big should a printed QR code be?', a: 'As a rule of thumb, aim for at least about 2 cm by 2 cm for close-range scanning, and make it larger for posters viewed from a distance. Keep a clear blank margin around it and use strong contrast between dark and light areas.' },
    ],
    content: `A QR code is a pattern that stores a small piece of text. When you scan it, your phone reads the text and decides what to do with it: open a link, join a Wi-Fi network, save a contact. That is the whole mechanism.

What people call "static" and "dynamic" is not a different kind of pattern. It is a difference in what text the code holds, and who controls it.

## What static and dynamic QR codes are

A **static QR code** holds your final content directly. If it encodes https://example.com/menu, the phone reads exactly that and opens it. Nothing sits in between. Once printed, the code can never change and can never expire, because there is no service to turn it off.

A **dynamic QR code** holds a short link on someone else's domain, for example a short address on a QR service. When scanned, the phone opens that short link, the service looks up where it should go and redirects the scanner to your real destination. The pattern is fixed, but the destination behind it can be edited, and the service can count visits.

## How to make a static QR code

1. Open the [QR Code Generator](/qr-generator).
2. Type or paste your content: a URL, a plain message or any text.
3. Check the preview, then download the image.
4. Scan it with your own phone before you use it anywhere. The [QR Code Scanner](/qr-scanner) can also read an image file if you want to check from your computer.
5. Print or place it, keeping a blank margin around it.

For contact details use the [vCard QR Code Generator](/vcard-qr), which encodes a contact card so a scan offers to save the person. If you have a list, the [Batch QR Code Generator](/qr-batch-generator) makes one code per line.

## Benefits of static codes

- **No expiry and no subscription.** The code keeps working as long as its destination does.
- **No dependency.** If a QR service raises prices, changes terms or shuts down, your printed codes are unaffected.
- **Privacy.** Scans go directly to the destination, with no intermediary logging them.
- **Works offline for non-link content.** Text, Wi-Fi details and contact cards can be read with no internet at all.
- **Free.** There is nothing to pay for because nothing is hosted.

## Where dynamic codes make sense

Dynamic codes solve two real problems:

- **Editing after printing.** If 5,000 flyers carry a code and the campaign page moves, you can redirect it instead of reprinting.
- **Scan analytics.** Counts by date, device and rough location are possible because every scan passes through the service.

The cost is dependence. The code works only while the service and your account exist, and the owner of the redirect domain controls where your printed code leads. Many services keep dynamic codes alive only on paid plans. Check current terms before you print thousands of copies.

## Where current tools fall short

When you search for a free QR generator, some results quietly make the code dynamic without saying so. You get a pattern that points to the provider's short link, and it can stop working when a trial ends. Other common issues:

- Sign-up required before download.
- Low-resolution or watermarked downloads on free tiers.
- A cap on the number of codes or scans.
- Unclear information on what happens to your content.

Before printing, always check what the code encodes. A static code contains your own URL; if the scanned address is on the provider's domain, it is dynamic.

## Everyday situations

- **Restaurant menu.** A static code to a PDF or page that you update in place. The code never changes; the file behind it does.
- **Business card.** A static vCard code that stores your contact details, readable offline.
- **Wi-Fi sharing.** A card on the fridge or guest-room desk with the network name and password.
- **Event signage.** A short run of signs that point to a schedule page.
- **Product packaging.** Where the code will be printed once and must work for years, a link to a URL you control is the safest choice.

## Tips and mistakes to avoid

- **Point at a URL you control.** Use a static code to a page on your own domain, then change the page when needed. You get the flexibility of a dynamic code without a third-party redirect.
- **Test before printing.** Scan from several phones, at the printed size, in normal lighting.
- **Keep contrast high.** Dark code on a light background; avoid inverted or low-contrast colours.
- **Do not make it too small.** Tiny codes on glossy or curved surfaces fail often.
- **Keep the content short.** Longer text makes a denser pattern that is harder to scan.
- **Add a human-readable label.** Printing the short link or a phrase next to the code helps people who cannot scan.
- **Keep a copy of the source.** Store the original text so you can regenerate the code later.

## How a phone decides what to do with a scan

The QR pattern holds a string of characters. The scanning app looks at the start of that string and picks an action. Text beginning with https:// opens a link. Text beginning with WIFI: joins a network after confirmation. Text that starts with BEGIN:VCARD offers to save a contact. Anything else is shown as plain text.

This is why a static code is so portable: the instructions are in the code itself, so any scanner that follows the format can act on it, with or without an internet connection, apart from opening the web page that a link points to. It is also why you should treat unknown codes carefully. A code can point anywhere, so look at the address a scanner shows before you open it.

## A simple decision guide

Ask yourself three questions before you generate anything:

1. **Will the destination ever change?** If it might, point the code at a page you own, not at a file that moves.
2. **Do you need to know how many people scanned?** If yes, you need either a dynamic service or analytics on the destination page.
3. **How long must the printed code work?** If the answer is years, avoid anything that depends on a subscription.

If the first two answers are no, a static code is the simplest choice. If you answer yes to the second, you can often get what you need by adding a campaign parameter to your own link and reading your site analytics, which keeps the redirect under your control.

## Size, contrast and error correction

QR codes contain built-in error correction, so a code can still be read when part of it is damaged or covered. That is why a small logo in the middle can work. The more data you store, the denser the pattern, and the larger it should be printed. As a practical habit, keep links short, avoid long query strings, and always leave a clear margin of blank space around the code, usually about four modules wide. Test with at least two different phones before a large print run.

## Common scanning problems and quick fixes

If a code will not scan, the cause is usually one of a few things. The code is too small for the distance, the contrast is poor, the surface is glossy and reflecting light, or the pattern is too dense because the content is long. Make it larger, use dark on light, print on matte stock, and shorten the link. Another frequent problem is a quiet zone that has been cropped away by a design tool; the blank border is part of the code and should not be trimmed. Finally, check that the content is exactly what you intended by reading it back with a scanner before you print.

## Related reading

If you also work with links and data, [Base64 encoding: what it's for](/blog/base64-encoding-what-its-for) explains another everyday encoding, and [why client-side tools matter](/blog/why-client-side-tools-matter) covers why generating codes in the browser avoids a middleman. Browse more on the [QR code tools](/qr-code-tools) page, or try the [Barcode Generator](/barcode-generator) for product-style labels.`,
  },
  {
    slug: 'aes-256-text-encryption-explained',
    title: 'AES-256 Text Encryption Explained in Plain English',
    description: 'How AES-256-GCM and PBKDF2 turn a passphrase and a message into safe ciphertext in your browser, and what that protects against.',
    date: '2026-02-25',
    updated: '2026-10-03',
    category: 'security-privacy-tools',
    keywords: ['aes-256 encryption explained', 'encrypt text online', 'aes-256-gcm', 'pbkdf2 explained', 'encrypt message with password', 'web crypto api encryption'],
    relatedTools: ['/text-encryptor', '/passphrase-generator', '/password-tool', '/hash-generator', '/base64-tool'],
    faqs: [
      { q: 'What is AES-256 encryption?', a: 'AES is a symmetric encryption standard: the same key encrypts and decrypts. The 256 refers to the key length in bits. It is widely used for protecting files, network traffic and stored data.' },
      { q: 'Is AES-256 unbreakable?', a: 'No practical attack on the 256-bit key itself is known, and brute-forcing it is not feasible. In real systems, the weak points are usually elsewhere: guessable passphrases, compromised devices, or mistakes in how the cipher is used.' },
      { q: 'What does GCM mean in AES-256-GCM?', a: 'GCM is a mode of operation that provides authenticated encryption. Besides hiding the message, it attaches a tag that detects tampering, so if the ciphertext is altered, decryption fails instead of returning garbage.' },
      { q: 'What is PBKDF2 and why is it used?', a: 'PBKDF2 turns a human passphrase into a proper encryption key by hashing it many times with a random salt. The repeated work makes each password guess slower for an attacker. The text tool uses 100,000 iterations.' },
      { q: 'Can I decrypt the text without the passphrase?', a: 'No. The salt and IV in the output are not secret, but without the exact passphrase the key cannot be derived. A wrong passphrase or damaged ciphertext produces a decryption error.' },
      { q: 'Is it safe to encrypt text in a browser?', a: 'The tool uses the browser\'s built-in Web Crypto API, which is implemented by the browser vendor and runs on your device. Nothing is sent to a server. As with any software, it is only as safe as the device and the passphrase you use.' },
    ],
    content: `You want to send someone a password, an API key or a private note, and the only channel you have is email or a chat app. You can paste the plain text and hope. Or you can encrypt it first, so the message is unreadable to anyone who intercepts it, and share the passphrase another way.

That is what [Text Encryptor](/text-encryptor) is for. Here is what happens between "type passphrase" and "get a block of letters", without the jargon.

## The problem: a passphrase is not a key

AES needs a key of exactly 256 bits, which is 32 bytes of random-looking data. A passphrase like "correct horse battery staple" is neither the right length nor random. If you used it directly, short passphrases would produce weak, predictable keys.

The fix is a **key derivation function**. The tool uses **PBKDF2** with a random salt and 100,000 iterations. It hashes the passphrase with the salt, then hashes the result again, 100,000 times. The output is a uniform 256-bit key.

Why bother with so many rounds? An attacker who steals your ciphertext can try passphrases one by one. Each attempt costs them 100,000 hash operations instead of one, which slows a guessing run by that same factor. The salt prevents them from reusing precomputed tables across different messages.

## The cipher: AES-256-GCM

The derived key feeds **AES-256-GCM**. Two parts of that name matter.

- **AES-256** is the cipher. The 256-bit key gives a key space of 2 to the power of 256 possibilities, far beyond what any brute-force search can cover.
- **GCM** (Galois/Counter Mode) is the mode. It turns AES into a stream-like cipher and adds an authentication tag. If a single byte of the ciphertext changes, decryption fails with an error. You never get silently corrupted plaintext.

A fresh random **initialisation vector** (IV) is generated for every message. Reusing an IV with the same key in GCM is a serious mistake, so the tool creates a new one each time.

## What ends up in the output

The result is one block of base64 text containing the salt, the IV and the ciphertext packed together. None of the three is secret by itself. The salt and IV only need to be unique and available at decryption time. The only secret is the passphrase.

This is why you can safely paste the output into an email, a note or a chat. If you are curious how binary data becomes text you can paste, see [Base64 encoding: what it's for](/blog/base64-encoding-what-its-for). Note that Base64 is an encoding, not encryption: it hides nothing on its own.

## How to encrypt and decrypt text

1. Open [Text Encryptor](/text-encryptor).
2. Type or paste the message.
3. Enter a passphrase. Generate one with the [Passphrase Generator](/passphrase-generator) or [Password Generator](/password-tool) rather than inventing it.
4. Choose encrypt and copy the output block.
5. Send the block through any channel, and share the passphrase through a different one.
6. To read it, the recipient pastes the block into the same tool, enters the passphrase and chooses decrypt. A wrong passphrase or an altered block shows an error, not nonsense.

## Benefits

- **No server involved.** The work is done by the browser's Web Crypto API on your device, so neither the text nor the passphrase is transmitted.
- **Standard algorithms.** AES-GCM and PBKDF2 are well-studied, widely deployed standards, not a home-made scheme.
- **Tamper detection.** You find out if the message was modified in transit.
- **Works anywhere text works.** Email, SMS, wikis, tickets, even a printed page.

## Where current tools fall short

Many "encrypt text online" pages send your text to a server to encrypt it, which defeats the point. Others use weak or old schemes, give no detail on the algorithm, ask you to create an account, or limit message length. Some produce output that only their own site can decrypt. When a tool does not say what algorithm and key derivation it uses, assume the worst. A good test: the page should work offline once loaded, and it should name the algorithm.

## What this protects against, and what it does not

Protects against:

- Someone reading an email or note that was intercepted or left in a shared inbox.
- A leaked chat export.
- Casual snooping on a file that contains the block.

Does not protect against:

- **A weak passphrase.** The 100,000 rounds slow guessing, but a one-word passphrase is still guessable. See [strong passwords vs passphrases](/blog/strong-passwords-vs-passphrases).
- **A compromised device.** Malware, a keylogger or someone looking at the screen while the plaintext is visible.
- **Metadata.** The existence of the message, its approximate length, and who exchanged it are not hidden.
- **Lost passphrases.** There is no recovery.

## Everyday situations

- **Sharing a Wi-Fi or router password** with a contractor.
- **Sending an API key** to a colleague without leaving it in plain text in chat history.
- **Keeping a private note** in a shared document or notes app.
- **Passing a recovery code** to a family member for emergencies.
- **Storing a snippet** that must not be readable if a laptop is lent out.

## Tips and mistakes to avoid

- **Use a long passphrase,** at least four random words.
- **Send the passphrase separately,** ideally by a different medium.
- **Do not encrypt and forget.** Test the decrypt step before you delete the original.
- **Do not confuse hashing with encryption.** A hash such as SHA-256 cannot be reversed; see [SHA-256 hash explained](/blog/sha-256-hash-explained) and the [Hash Generator](/hash-generator).
- **Keep software updated.** The cipher is only as safe as the browser that runs it.
- **Never share the output and the passphrase in the same message.**

## A worked example of the whole flow

Imagine you need to give a contractor the password for a staging server. You open [Text Encryptor](/text-encryptor), paste the server password, and enter the passphrase "lantern-orbit-marble-fox-41", which you generated rather than invented. The tool returns a block of about 60 to 100 characters of base64 text. You paste that block into an email.

Separately, you phone the contractor and read the passphrase out. They paste the block into the same tool, enter the passphrase, and see the server password. If they mistype a single character of the passphrase, they get a decryption error, not a wrong answer. If someone alters the block in transit, the authentication tag fails and they get the same error.

An outsider who reads the email sees only the block. They would need the passphrase, and the only way to find it is to guess, one attempt at a time, each costing 100,000 rounds of hashing.

## Why random salts and IVs matter

Both values are random for every message, which has useful consequences. Encrypting the same text twice with the same passphrase yields different output each time, so an observer cannot tell whether two messages are the same. And because the salt changes, the same passphrase leads to a different key each time, which stops an attacker from reusing work across messages.

You do not have to keep the salt or IV secret, and you do not need to store them separately: they travel inside the output block. That is a design choice, not a weakness. What must be kept secret is only the passphrase.

## How strong is "strong enough"?

The 256-bit key is not the limiting factor; the passphrase is. A passphrase of four words picked at random from a list of about 7,000 words gives roughly 50 bits of guessing difficulty (7,000 to the power of 4 is about 2.4 times 10 to the 15). Five words gives about 63 bits. With 100,000 hashing rounds per guess, those figures put casual and even determined offline guessing out of practical reach, while a single dictionary word falls almost at once. This is why the advice is always the same: use a long random passphrase, and let the cipher do the rest.

## Related reading

For the broader case for doing this on your device, read [why client-side tools matter](/blog/why-client-side-tools-matter). To protect whole documents instead of text, see [how to password protect a PDF](/blog/password-protect-pdf-guide). More tools are on the [security tools](/security-tools) page.`,
  },
  {
    slug: 'why-client-side-tools-matter',
    title: 'Why Client-Side Tools Matter: Keep Files on Your Device',
    description: 'Most online file tools upload your data to a server. Here is why many tasks do not need that, and the honest trade-offs of doing it locally.',
    date: '2026-03-10',
    updated: '2026-10-03',
    category: 'security-privacy-tools',
    keywords: ['client-side tools', 'browser-based pdf tools', 'files never leave your device', 'private online tools', 'no upload file converter', 'offline web tools'],
    relatedTools: ['/merge', '/image-compress', '/text-encryptor', '/hash-generator', '/qr-scanner'],
    faqs: [
      { q: 'What does client-side processing mean?', a: 'It means the work is done by your own browser, on your own device, instead of on a company\'s server. The page loads once, and then your files are read, changed and saved locally with no upload.' },
      { q: 'How can I check that a tool does not upload my files?', a: 'Open your browser\'s developer tools, go to the Network tab, run the tool, and look for requests that carry your file. You can also disconnect from the internet after the page loads and see whether the tool still works.' },
      { q: 'Are client-side tools slower than server-based ones?', a: 'For typical files they are usually faster because there is no upload or download of the input. For very large files, speed depends on your device\'s CPU and memory rather than a server.' },
      { q: 'Are browser-based tools really private?', a: 'The tool itself does not send your files anywhere. That removes the risk of a third party storing them, but it does not protect against malware on your device or a malicious browser extension.' },
      { q: 'What can\'t be done client-side?', a: 'Tasks that need heavy machine learning models, large shared databases or server-held secrets, such as high-quality OCR on huge archives or sending e-signature requests to other people, still tend to need a server.' },
      { q: 'Do client-side tools work offline?', a: 'Once the page and its scripts are loaded, many do. Behaviour depends on whether the site is cached; a reload without connection may fail unless the site is installed or cached.' },
    ],
    content: `Search for almost any online file task, such as merging PDFs, converting an image or resizing a photo, and the typical page does the same thing: you upload the file, a server processes it, and you download the result. This was the standard design for a good reason. It is also no longer the only way, and for many tasks it is not the best one.

## The problem with the upload model

Uploading a file means handing over a copy. Whether that matters depends on the file. A holiday photo is low stakes. A scan of your passport, a signed contract, a spreadsheet of customers or a medical letter is another matter.

Once a file is on someone else's server you are relying on several things you cannot check:

- That it is deleted when they say, and not kept in backups or logs.
- That the transfer and storage are secured properly.
- That staff, subcontractors or future owners of the company cannot access it.
- That the service will still behave the same way next year.

Even if every one of those holds, you took on the risk for a task that did not require it.

## Why uploading became the default

Early web pages could not do much. JavaScript was slow, there was no way to draw to a canvas, no way to read local files in the page, and no cryptography built in. If you wanted to resize an image, a server was the only place to do it.

That has changed. Modern browsers include fast JavaScript engines, the canvas API for pixel work, the File API for reading local files, WebAssembly for heavy computation, and the Web Crypto API for hashing and encryption. Many upload-based tools persisted because nobody rewrote them, not because they still need to be that way.

## What a modern browser can do locally

On MergeDoc, all the tools run in the page. Examples:

- **Documents.** Merge, split, rotate, reorder, watermark, protect and sign PDFs, and extract text. See the [PDF tools](/pdf-tools).
- **Images.** Resize, convert and compress using the canvas API. See [Image Tools](/image-tools).
- **Cryptography.** Hash text with the [Hash Generator](/hash-generator) and encrypt it with the [Text Encryptor](/text-encryptor), both on the browser's own Web Crypto implementation.
- **Codes.** Generate QR codes and decode one from an image with the [QR Code Scanner](/qr-scanner).

None of these needs a network round trip once the page has loaded.

## How to check any tool for yourself

You do not have to take anyone's word for this, including ours.

1. Open the tool page and let it load.
2. Open developer tools (F12, or Cmd+Option+I on a Mac) and switch to the Network tab.
3. Run the task with a test file.
4. Look at the requests. A client-side tool will not show a request that carries your file out.
5. For a stronger test, turn off your internet connection and try again.

## Benefits of client-side processing

- **Privacy.** Nothing is uploaded, so there is nothing to retain, leak or subpoena.
- **Speed.** No time lost sending and receiving large files.
- **No arbitrary limits.** Services pay for bandwidth and compute per file, so they cap size and count. A local tool uses your own hardware.
- **No account.** There is no profile to create for a one-off job.
- **Offline-friendly.** After the first load, many tools keep working.

## The honest trade-offs

It is worth being straight about the downsides:

- **Memory.** Very large files are bounded by your device. A phone with limited memory may struggle with a big merge.
- **No history.** Closing the tab ends the session. Unless a tool saves to local storage, nothing is stored.
- **Your CPU does the work,** which can make a laptop warm and a phone slow on heavy jobs.
- **Limited scope.** Tools that need shared data or heavy models, such as full OCR, e-signature routing or large-scale batch conversion, are better suited to a server.
- **Not a security guarantee.** The tool does not send your file out, but malware or a hostile browser extension on your device can still read it.

## Where upload-based tools typically fall short

- Free tiers that limit the number or size of files.
- Sign-up or email capture before download.
- Watermarks on outputs.
- Download links that expire.
- Slow transfer on weak connections.
- Little clarity on retention.

These are design consequences, not villainy. If a server has to process every file, someone has to pay for it.

## Everyday situations

- **Job and visa paperwork.** Merge and shrink documents without sending identity scans through a stranger's server.
- **Work files under NDA.** Compare two contract versions with [Compare PDFs](/compare-pdf) without a third party seeing them.
- **Slow or capped mobile data.** Skip the upload and do the work where the file already is.
- **Travelling.** Process a file on a plane or train once the page is cached.
- **Students and freelancers.** No account, no limits, no watermark on a one-off task.

## Tips and mistakes to avoid

- **Verify, don't assume.** Use the Network tab test on any tool handling sensitive files.
- **Keep your browser updated.** Security fixes to the browser protect local processing too.
- **Be careful with extensions.** An extension that can read page content can read your files.
- **Keep backups.** Local tools do not keep a copy for you.
- **Do not rely on "private" as a substitute for encryption.** For documents you will share, still apply a password; see [how to password protect a PDF](/blog/password-protect-pdf-guide).

## What "private" does and does not mean

It helps to be precise about the claim. When MergeDoc says a file never leaves your device, it means the tool does not transmit it. That is a statement about the tool's behaviour, and you can verify it. It is not a certification of any kind, and it does not make the rest of your environment safe.

Your device is still a trust boundary. Anything running in your browser, including extensions, can in principle see page content. Anyone with access to your computer can see your downloads folder. A shared or public computer keeps files in its download history. So treat client-side as removing one risk, the third-party server, not all risks. For documents you will share onward, add the usual protections: a [password on the PDF](/blog/password-protect-pdf-guide), a strong passphrase, and a sensible choice of who receives the file.

## Client-side and compliance questions

Teams that handle regulated data often ask whether using a browser tool is acceptable. Do not assume the answer. Whether a tool is allowed under your organisation's policy, or under a regulation that applies to you, is a question for your security or compliance team. A tool that processes data locally avoids creating a new third-party processor, which many policies care about, but you should confirm that rather than taking it as given. MergeDoc makes no claim of certification such as SOC 2 or HIPAA, and nothing here is legal advice.

## A short history, for context

For years the only way to get a feature such as image resizing on a web page was to send the file to a server. Then browsers gained the canvas element, the File API, typed arrays, workers, WebAssembly and Web Crypto, one at a time. Each removed a reason for the server. Today a page can read a 50 MB PDF, rebuild it and offer a download without a single request, and it can do so in a background thread so the page stays responsive.

The shift is gradual, which is why you still find so many upload-first tools. They work, they have users, and rebuilding them does not pay. For you as a user, though, the practical question is not how a tool is built but whether it needs to see your file. For most everyday tasks, it does not.

## Related reading

Two practical examples of the idea in action: [merge PDF files without uploading them](/blog/merge-pdf-without-uploading) and [is it safe to upload confidential PDFs](/blog/is-it-safe-to-upload-confidential-pdfs). For the cryptography side, read [AES-256 text encryption explained](/blog/aes-256-text-encryption-explained). The [security tools](/security-tools) page lists everything in this area.`,
  },
  {
    slug: 'resize-image-without-losing-quality',
    title: 'How to Resize an Image Without Losing Quality',
    description: 'What actually causes quality loss when you resize, why shrinking is safe and enlarging is not, and how to get a smaller file too.',
    date: '2026-03-18',
    updated: '2026-10-03',
    category: 'image-tools',
    keywords: ['resize image without losing quality', 'resize image online', 'shrink image dimensions', 'enlarge image without blur', 'change image size in pixels', 'resize photo free'],
    relatedTools: ['/image-resize', '/image-compress', '/image-converter', '/favicon-generator', '/color-palette-extractor'],
    faqs: [
      { q: 'Can you resize an image without losing quality?', a: 'When making an image smaller, yes, for practical purposes: a good resampling method keeps it sharp. When making it larger, no, because the software must invent pixels that were never captured, so detail cannot be restored.' },
      { q: 'Why does my image look blurry after resizing?', a: 'Usually because you enlarged it, or because you shrank it and then compressed it heavily as a JPEG. Blur from enlarging is physical; blocky artefacts after shrinking usually come from low JPEG quality.' },
      { q: 'How do I resize an image to a specific size in pixels?', a: 'Open [Image Resizer](/image-resize), enter the target width and height, keep the aspect ratio locked so the picture is not stretched, and download the result.' },
      { q: 'What is the difference between resizing and compressing?', a: 'Resizing changes the pixel dimensions, for example 4000 by 3000 to 1200 by 900. Compressing keeps the dimensions and reduces the file size by storing the pixel data more coarsely. You often need both, as separate steps.' },
      { q: 'How much can I enlarge a photo before it looks bad?', a: 'A rough rule is that enlarging beyond about 150-200% starts to look soft at normal viewing distance. Photos viewed from further away, like posters, tolerate more. The only real fix is a higher-resolution source.' },
      { q: 'Does resizing in the browser upload my picture?', a: 'No. The image is drawn onto a canvas in your browser and exported again, so it stays on your device.' },
    ],
    content: `"Resizing ruins image quality" is a half-truth. Whether it does depends on which direction you are going and on what else you are changing at the same time. Once you separate the three things that can go wrong, it becomes simple to avoid them.

## What actually changes when you resize

A digital image is a grid of pixels. A 4000 by 3000 photo has 12 million of them. Resizing builds a new grid with a different number of pixels and decides what colour each new one should be, using an algorithm called resampling.

- **Making it smaller** means mixing several source pixels into one. You have more information than you need, so the result can be sharp.
- **Making it larger** means filling in pixels that were never recorded. The software estimates them by blending neighbours, so the result looks softer, not sharper.

Separate from resizing is **compression**: how coarsely the pixel data is stored in the file. A JPEG discards fine detail to save space. Too much of that causes blocky edges and smudged colour. Most "my resized image looks bad" complaints are really compression complaints.

## How to resize an image step by step

1. Open [Image Resizer](/image-resize) and add your image.
2. Check the original dimensions shown, and decide the target. For a web page content image, 1200 to 1600 pixels wide is usually plenty; for a thumbnail, a few hundred.
3. Enter the new width. With **Lock aspect ratio** on, the height updates automatically so the picture is not stretched.
4. Run the resize and download the file. PNG inputs stay PNG; other images are saved as JPEG.
5. If the file is still too heavy, compress it afterwards with [Image Compressor](/image-compress).
6. Zoom to 100% and look at edges and text before using the picture.

## Shrinking: safe in most cases

When you go down in size, you rarely lose anything a viewer would miss, because screens only show so many pixels. A 4000-pixel-wide photo shown in a 800-pixel column is wasteful: the browser downloads every pixel and then throws most of them away.

The one trap is doing two lossy things at once. If a tool shrinks the picture and also applies heavy JPEG compression, you can blame the wrong step. Treat dimensions and file size as separate decisions, even if you do them back to back.

## Enlarging: a physical limit

Enlarging has a hard ceiling. No software, however clever, can bring back detail that the camera never captured. Some modern AI upscalers invent plausible detail, but it is a guess, not recovery, and a browser canvas does not do that.

If you must go bigger, keep it modest. Up to roughly 150-200% often passes at normal viewing distance; beyond that, edges soften and text becomes mushy. For anything critical, find a higher-resolution original, re-scan, or re-shoot.

## Benefits of resizing before you share

- **Faster pages and uploads.** Smaller dimensions mean far fewer bytes.
- **Forms with size rules.** Many applications specify exact pixel dimensions for a photo.
- **Email-friendly attachments** instead of a 10 MB phone photo.
- **Consistent layouts** when a set of images has different sizes.

## Where current tools fall short

- **Uploads.** Many online resizers send your photo to a server, which is unnecessary for something the browser can do.
- **Hidden quality settings.** Some tools quietly apply heavy compression, then the image looks bad.
- **Watermarks, sign-ups and daily limits** on free plans.
- **Stretched results.** Without a locked aspect ratio, entering both width and height distorts the picture.
- **Forced format changes.** A PNG with transparency may become a JPEG with a black or white box.

A local tool avoids the upload. The trade-off is that your device does the work, which is rarely a problem for a photo.

## Everyday situations

- **Profile photos.** A site wants 400 by 400 pixels; your phone shot 3000 by 4000.
- **Blog and product images.** Resize to the width of your layout, then compress for speed. For website-specific guidance, see [compress images for faster websites](/blog/compress-images-for-faster-websites).
- **Email signatures and newsletters.** Small, light images that load quickly.
- **Application forms.** Passport-style photos with required pixel sizes.
- **Favicons.** A square icon from a logo; the [Favicon Generator](/favicon-generator) produces the usual sizes.

## Tips and mistakes to avoid

- **Keep the aspect ratio locked** unless you deliberately crop or distort.
- **Resize from the original,** not from a copy you already shrank. Repeated resizing and re-saving stacks losses.
- **Keep an untouched original.** Downscaling cannot be reversed.
- **Do not upscale a small thumbnail** and expect it to look like the full image.
- **Choose the right format.** Use JPEG for photos, PNG for graphics with sharp edges or transparency. If you need to switch, [Image Format Converter](/image-converter) handles it.
- **Resize first, compress last.** Compression applied before resizing is wasted.
- **Know the compressor's behaviour.** [Image Compressor](/image-compress) re-encodes to JPEG at your chosen quality, so a transparent PNG will lose its transparency.

## Choosing the right size for the job

Most quality problems come from picking dimensions by guesswork. A few reference points help, though check the requirements of wherever the image is going:

- **Full-width website images:** commonly 1200 to 2000 pixels wide. Larger rarely helps and slows the page.
- **Blog or article images:** around 800 to 1200 pixels wide fits most layouts.
- **Social posts and avatars:** follow each platform's current guidance; square images of 400 to 1080 pixels are typical.
- **Email:** keep width at or below roughly 600 to 800 pixels so it displays properly in mail clients.
- **Print:** think in pixels per inch. At 300 pixels per inch, a 10 by 15 cm print needs about 1200 by 1800 pixels.

If you are not sure, go to the largest size at which the image will ever be displayed and add a little headroom for high-density screens. Anything beyond that is just weight.

## Worked example: a 4000 by 3000 phone photo for a blog

The photo is 4000 by 3000 pixels and about 4 MB. The blog column is 800 pixels wide, and you want it to look sharp on high-density screens, so you aim for 1600 pixels wide. With the aspect ratio locked, entering 1600 gives 1200 in height. You resize, then run the result through [Image Compressor](/image-compress) at a moderate quality, and compare it with the original at 100% zoom. The pixel count has dropped to about a sixth, and the file is typically a small fraction of the original, with no visible difference at the size it is shown.

Doing it in the opposite order, compressing first and resizing second, wastes effort: compression works on the full-size pixels, and resizing then re-encodes the result again.

## Cropping is not resizing

Cropping removes part of the image; resizing scales all of it. If a form wants a square photo and yours is landscape, resizing to a square will squash the subject. Crop first in any image editor, then resize the cropped image to the required dimensions. Keeping that distinction in mind prevents the stretched faces that show up in so many application photos.

## A note on file formats and transparency

The format you save in affects both quality and size. Photographs belong in JPEG, which handles gradients efficiently but has no transparency. Logos, screenshots and graphics with flat colour or sharp text usually look better as PNG, which is lossless and supports transparency, though files can be large. If you resize a PNG with a transparent background, keep it as PNG; converting it to JPEG fills the transparent area with a solid colour. When in doubt, resize a copy, view both side by side at full size, and keep whichever looks right.

## Related reading

For the file-size side of the same problem, read [compress images for faster websites](/blog/compress-images-for-faster-websites). Image-heavy PDFs have the same issues; see [how to reduce a PDF's file size](/blog/reduce-pdf-file-size). For colour decisions, [WCAG colour contrast explained](/blog/wcag-color-contrast-explained) is a useful companion, and the [Image Tools](/image-tools) page lists every image utility.`,
  },
  {
    slug: 'minified-json-debugging',
    title: 'Why Minified JSON Is Hard to Debug (and How to Fix It)',
    description: 'Minified JSON is great for machines and painful for people. Learn to format, validate and minify JSON, and spot the usual syntax errors fast.',
    date: '2026-03-25',
    updated: '2026-10-03',
    category: 'developer-tools',
    keywords: ['format json online', 'minified json', 'json formatter validator', 'pretty print json', 'json syntax error', 'unminify json'],
    relatedTools: ['/json-formatter', '/csv-json-converter', '/text-diff', '/base64-tool', '/regex-tester'],
    faqs: [
      { q: 'What is minified JSON?', a: 'Minified JSON is the same data with all optional whitespace removed: no line breaks, no indentation, no spaces after colons. It is smaller to send and store, and it parses exactly the same as the formatted version.' },
      { q: 'How do I format minified JSON?', a: 'Paste it into the [JSON Formatter](/json-formatter) and choose Format. The tool parses the text and writes it back with two-space indentation, one value per line.' },
      { q: 'Why does my JSON say "Unexpected token"?', a: 'The text is not valid JSON. Common causes are a trailing comma, single quotes instead of double quotes, an unquoted key, a comment, or a missing bracket. The parser stops at the first problem it meets, which is often a little after the real mistake.' },
      { q: 'Does minifying JSON change the data?', a: 'No. Keys, values and structure are identical; only whitespace is removed. One exception worth knowing: re-serialising can change number formatting or drop duplicate keys, because the data is parsed and written again.' },
      { q: 'Should I send minified or formatted JSON in an API?', a: 'Minified for production traffic, where size matters and machines read it. Formatted for logs, documentation and anything a human needs to inspect. Compression such as gzip reduces the difference considerably.' },
      { q: 'Is it safe to paste JSON into an online formatter?', a: 'That depends on the tool. Many send your text to a server, which is a concern for tokens or customer data. The MergeDoc formatter runs in your browser, so the text is not sent anywhere.' },
    ],
    content: `You get a bug report: the API returned the wrong value for one field. You open the response and find 40 KB of JSON on a single line. Somewhere in there, three levels deep, is the field you need. Finding it by eye is miserable, and that is exactly the problem minification creates.

## What minified JSON is

JSON is a text format for structured data. The spec allows whitespace between its tokens but does not need it. **Minification** removes it all: spaces, tabs and line breaks. The data is identical; only the layout changes.

For example, this formatted object:

- It has a name, a list of tags and a nested address.
- Each of those sits on its own line with indentation showing the nesting.

After minifying, all of that is a single line of braces, commas and quotes. A parser reads both versions the same way. A person reads only one of them comfortably.

## Why minified JSON slows you down

When something is wrong with a payload you usually need to answer one of three questions:

- Which key holds the unexpected value?
- How deeply is it nested, and under which parent?
- Is the structure even valid?

With indentation, your eye follows the shape: each level moves right, and a closing brace lines up with the opening one. On one long line, you must count braces by hand, and any mistake sends you to the wrong object. Searching with a text editor does not help much when 20 keys share the same name at different depths.

## How to format JSON step by step

1. Open the [JSON Formatter](/json-formatter).
2. Paste your JSON into the box.
3. Click **Format**. If the text is valid, it is rewritten with two-space indentation.
4. Scan for the field. Collapse your attention to the branch you need.
5. If you see an error instead, the text is not valid JSON; read the section below.
6. When you finish, click **Minify** to compress it again before you use it in a request body or config.

The formatter parses the text and re-serialises it. That means it doubles as a validator: if parsing succeeds, you know the document is well-formed.

## The most common reasons JSON fails to parse

Almost every "Unexpected token" error is one of these:

- **Trailing comma.** A comma after the last item in an object or array. JavaScript tolerates this in code; JSON does not.
- **Single quotes.** JSON requires double quotes for strings and keys.
- **Unquoted keys.** Keys must be strings in double quotes.
- **Comments.** JSON has no comment syntax.
- **Missing or extra bracket.** Often caused by copying part of a payload.
- **Unescaped characters.** A raw double quote or line break inside a string must be escaped.
- **Things that are not JSON values,** such as undefined, NaN or a date written without quotes.

Remember the parser reports where it gave up, not necessarily where you went wrong. After formatting a valid portion, the real culprit is often just before the reported position.

## Benefits of formatting first

- **Faster debugging.** You see structure, so you spot misplaced keys at once.
- **Instant validation.** You find out whether the text is well-formed before you blame your code.
- **Cleaner diffs.** Formatted JSON compares well line by line; try the [Text Diff Checker](/text-diff) on two formatted versions to see exactly what changed.
- **Better code reviews and documentation.** Examples with indentation are readable.
- **Safer edits.** Changing one value in a formatted file is easier than in a single line.

## Where current tools fall short

- **Uploads.** Many online formatters submit your text to a server. If it contains API tokens, customer emails or internal IDs, that is a leak you did not intend.
- **Size and rate limits** on free plans, and pages that stall on large files.
- **Ads and pop-ups** around a simple task.
- **Vague errors.** Some tools say "invalid JSON" with no hint of why.
- **Silent changes.** A few tools reorder keys or alter numbers without telling you.

Running locally avoids the upload and any size limit set by a server. Bear in mind that a very large document can slow your browser.

## Everyday situations

- **Reading an API response** copied from the browser's network panel or a log.
- **Checking a config file** such as a package or settings file before deploying.
- **Comparing two payloads** after a code change.
- **Cleaning up data** exported from a tool before converting it with the [CSV ⇄ JSON Converter](/csv-json-converter). Note that this converter splits on commas and does not handle quoted fields containing commas, so complex CSV may need another tool.
- **Teaching or documenting** an endpoint with a readable example.

## Tips and mistakes to avoid

- **Format before you debug.** Do not spend ten minutes counting braces.
- **Minify only at the end,** and keep the formatted copy in version control.
- **Check for secrets.** Remove tokens and personal data before sharing a payload in a ticket.
- **Do not edit minified JSON by hand.** One missing quote can break the whole thing.
- **Watch encoded values.** A long string might be Base64; decode it with the [Base64 Encoder/Decoder](/base64-tool) to see the content.
- **Use patterns carefully.** If you are extracting values with a regular expression, test it in the [Regex Tester](/regex-tester) first, but prefer a real JSON parser in code.
- **Validate again after manual edits.**

## A worked debugging example

Suppose a checkout call returns an error and the logged request body is one line of about 3,000 characters. You paste it into the [JSON Formatter](/json-formatter) and press Format. It fails with an "Unexpected token" message. That already tells you something: the body that was sent is not valid JSON, so the server never got as far as checking your fields.

Look near the reported position. You find that the last item in the items array is followed by a comma and then a closing bracket. Remove the comma, format again, and the document now expands into a readable tree. You can see at once that "quantity" is the string "2" rather than the number 2, and the server expects a number. Two problems found in under a minute, one syntactic and one about types, both easy to miss on a single line.

## Minify, gzip and what actually saves bytes

Minifying is not the only way to reduce payload size, and it is smaller than people expect once compression is on. Servers usually send responses with gzip or a similar method, which squeezes repeated whitespace and key names very efficiently. The difference between formatted and minified JSON after compression is often small. So keep readable output in development and logs, and minify where the raw size matters, such as stored values with strict limits or large files sent without compression.

If payload size is a real concern, look at structure first: shorter field names, dropping unused fields, pagination, and sending only what the client needs usually save more than whitespace does.

## Formatting is not validation of meaning

A formatter checks syntax only. It confirms that the text is valid JSON, not that it matches the shape your API expects. A document can be perfectly well-formed and still have a missing required field, a wrong type, or a date in the wrong format. Use formatting to see the data clearly, then compare it against your schema or documentation. For comparing two versions, format both and run them through the [Text Diff Checker](/text-diff), which shows exactly which lines changed.

## Related reading

If a regex is part of your debugging, see [how to test a regex](/blog/how-to-test-a-regex). For choosing between data formats, [CSV vs JSON: when to use each](/blog/csv-vs-json-when-to-use-each) covers the trade-offs, and [Base64 encoding: what it's for](/blog/base64-encoding-what-its-for) explains the encoded blobs you sometimes find inside JSON. The [developer tools](/developer-tools) page lists everything else.`,
  },
]
