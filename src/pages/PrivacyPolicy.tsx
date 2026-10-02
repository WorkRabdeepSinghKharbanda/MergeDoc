import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function PrivacyPolicy() {
  useDocumentMeta('Privacy Policy | MergeDoc', 'How MergeDoc handles your data — in short, it mostly doesn’t, since every tool runs in your browser.')

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">Last updated: October 3, 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Files and text you process</h2>
          <p className="mt-2">
            Every tool on MergeDoc runs entirely in your browser using client-side JavaScript. Files you upload
            (PDFs, images) and text you type are processed locally on your device and are never uploaded to any
            server. We have no backend and no way to see the content you work with.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Local storage</h2>
          <p className="mt-2">
            A few tools (Todo List, Scratchpad, theme preference, ad-consent choice) save small amounts of data in
            your browser's <code className="rounded bg-slate-100 px-1 py-0.5 dark:bg-slate-800">localStorage</code>.
            This data stays on your device, is never transmitted anywhere, and can be cleared at any time via your
            browser's site data settings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Advertising</h2>
          <p className="mt-2">
            MergeDoc may show ads served by Google AdSense to help keep the site free. AdSense may use cookies and
            similar technologies to serve ads based on your visits to this and other sites. You can opt out of
            personalized advertising by visiting{' '}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-900 dark:hover:text-slate-200">
              Google's Ad Settings
            </a>
            . Ads may appear on any visit, regardless of the choice made in the cookie banner shown on your first
            visit — that banner is a notice, not a control that blocks ads.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Analytics</h2>
          <p className="mt-2">
            MergeDoc uses Google Analytics (GA4) to count visits and see which pages are popular. It may set cookies
            and collect anonymous usage data such as pages viewed, approximate location and device type. It never
            sees the files or text you process, since those stay in your browser. Like advertising, analytics loads
            regardless of the cookie banner choice. You can block it with a browser extension or Google's{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-900 dark:hover:text-slate-200">
              opt-out add-on
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Changes</h2>
          <p className="mt-2">This policy may be updated as tools or ad providers change. Check back periodically for updates.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Contact</h2>
          <p className="mt-2">Questions about this policy can be sent to the site owner via the contact details on the GitHub repository.</p>
        </section>
      </div>
    </div>
  )
}
