// Next.js remounts `template.js` on every navigation (unlike layout.js),
// giving each page a quick, tasteful entrance instead of popping in
// instantly or showing a blank frame — pure CSS animation, no added
// navigation latency.
export default function SiteTemplate({ children }) {
  return <div className="page-transition">{children}</div>;
}
