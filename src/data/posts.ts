import type { Post } from "../lib/types/content";

// Fallback content used when PUBLIC_STRAPI_URL is unset. Slugs here are the
// routes that src/pages/blog/[slug].astro pre-renders, and the same array
// feeds the blog listings, so a link can never point at a missing page.
export const posts: Post[] = [
    {
        id: 1,
        title: "Building a Performant Blog with Astro",
        slug: "building-performant-blog",
        excerpt:
            "How I use Astro and island architecture to build fast websites.",
        date: "2026-01-20",
        category: { name: "Astro" },
        body: `
<p>Astro's core idea is that most of a page is static and only a few parts
need to be interactive. Rather than shipping a framework runtime for the whole
page, Astro renders the markup at build time and hydrates only the components
you explicitly mark as islands.</p>

<h2>Why the default matters</h2>

<p>On a typical content site, the interactive portion is small: a theme
toggle, a contact form, a command palette. Everything else is text and
images. A client-side framework still has to download, parse and execute its
runtime before any of that text is usable, even though the text was known at
build time.</p>

<p>Astro inverts that. The page is HTML first, and JavaScript is opt-in per
component.</p>

<h2>Choosing a hydration directive</h2>

<p>The directive on an island controls when its JavaScript loads:</p>

<ul>
  <li><code>client:load</code> — hydrate immediately. Reserve it for
  components visible on first paint, like a theme toggle in the header.</li>
  <li><code>client:idle</code> — hydrate once the main thread is free. A good
  default for below-the-fold widgets.</li>
  <li><code>client:visible</code> — hydrate when the component scrolls into
  view. Ideal for anything far down the page.</li>
  <li><code>client:only</code> — skip server rendering entirely. Needed when a
  component touches browser-only APIs on its first render.</li>
</ul>

<p>Getting this wrong is the most common way an Astro site ends up as heavy
as the framework it replaced: marking everything <code>client:load</code>
throws away the advantage.</p>

<h2>Pre-rendering and its failure mode</h2>

<p>Because pages are rendered at build time, anything a page fetches during
rendering has to be reachable from the build environment. A CMS that is
running locally but not in CI will make the build fail rather than degrade.
The fix is a content layer with a local fallback, so a clean clone builds
with no external services at all.</p>
`,
    },
    {
        id: 2,
        title: "Designing Clean APIs with Go",
        slug: "clean-apis-go",
        excerpt: "Thoughts on REST API design and maintainability.",
        date: "2026-01-15",
        category: { name: "Go" },
        body: `
<p>Go's standard library is enough to build a clear HTTP API. The interesting
decisions are not about the router; they are about where logic lives and how
errors travel.</p>

<h2>Keep transport out of the domain</h2>

<p>A handler should decode a request, call something, and encode a response.
If a handler is opening database transactions or enforcing business rules,
those rules are now only testable through HTTP. Splitting into handlers, a
use-case layer and a repository layer means the domain can be tested directly,
without spinning up a server.</p>

<h2>Make errors part of the contract</h2>

<p>Error responses are as much a part of your API as success responses. Two
habits help:</p>

<ul>
  <li>Return a stable machine-readable code alongside the human message, so
  clients can branch on the code rather than parse prose.</li>
  <li>Use the right status code. A validation failure is <code>400</code>; a
  missing resource is <code>404</code>; an unexpected failure is
  <code>500</code>. Collapsing everything into <code>200</code> with an error
  field forces every client to reinvent status handling.</li>
</ul>

<h2>Propagate context</h2>

<p>Pass <code>context.Context</code> through every layer. It carries
cancellation, which is what lets a request that the client abandoned stop
doing work instead of holding a connection and a database transaction open.
Deriving a fresh background context inside a handler discards that signal.</p>

<h2>Shut down deliberately</h2>

<p>On SIGTERM a server should stop accepting new connections, let in-flight
requests finish, and exit. Calling <code>Shutdown</code> with a context that
is already cancelled aborts the drain immediately — the requests you were
trying to protect are the ones that get killed. Derive the shutdown deadline
from a context that is not the one that just fired.</p>
`,
    },
    {
        id: 3,
        title: "Astro vs Next.js: When to Choose What",
        slug: "astro-vs-nextjs",
        excerpt: "A comparison based on real project experience.",
        date: "2026-01-10",
        category: { name: "Architecture" },
        body: `
<p>Both frameworks can build the same sites. They differ in what they assume
about your page, and that assumption shows up in the defaults.</p>

<h2>The default rendering model</h2>

<p>Next.js assumes an application: components are interactive unless you opt
out. Astro assumes a document: pages are static unless you opt in. For a
marketing site, a blog or a portfolio, the second assumption matches reality
and produces less JavaScript by default.</p>

<h2>When Next.js is the better fit</h2>

<ul>
  <li>The page is genuinely an application — dashboards, editors, anything
  with sustained client-side state.</li>
  <li>You need server-side rendering per request against a user's session.</li>
  <li>Your team already works in React and the cost of a second mental model
  outweighs the bundle savings.</li>
</ul>

<h2>When Astro is the better fit</h2>

<ul>
  <li>Content is known at build time and changes on deploy.</li>
  <li>You want islands of interactivity without a full framework runtime on
  every page.</li>
  <li>You want to mix frameworks per component rather than commit to one.</li>
</ul>

<h2>What actually decides it</h2>

<p>Ask how much of the page is interactive and how often the content changes.
If the answer is "a little" and "on deploy", static generation with islands
is the simpler system. If the page is a long-lived client-side session,
an application framework earns its weight. Choosing the wrong default means
fighting the framework on every page rather than once.</p>
`,
    },
];
