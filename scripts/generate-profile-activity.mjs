import { mkdir, writeFile } from "node:fs/promises";

const username = process.env.GITHUB_ACTOR || "jahajeevan";
const token = process.env.GITHUB_TOKEN;

if (!token) throw new Error("GITHUB_TOKEN is required to generate profile telemetry.");

const query = `query($login: String!) {
  user(login: $login) {
    repositories(first: 100, privacy: PUBLIC) { totalCount }
    followers { totalCount }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { contributionCount date } }
      }
    }
  }
}`;

const response = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ query, variables: { login: username } }),
});
const payload = await response.json();
if (!response.ok || payload.errors) throw new Error(JSON.stringify(payload.errors ?? payload));

const user = payload.data.user;
const calendar = user.contributionsCollection.contributionCalendar;
const count = (n) => (n === 0 ? "#1D2A3C" : n < 3 ? "#174E63" : n < 7 ? "#147D86" : n < 12 ? "#16B3A3" : "#62F6D1");
const cells = calendar.weeks.flatMap((week, x) =>
  week.contributionDays.map((day, y) => {
    const title = `${day.date}: ${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"}`;
    return `<g><title>${title}</title><rect x="${470 + x * 12}" y="${106 + y * 12}" width="8" height="8" rx="2" fill="${count(day.contributionCount)}"/></g>`;
  }),
).join("");

const today = new Date().toISOString().slice(0, 10);
const svg = `<svg width="1200" height="250" viewBox="0 0 1200 250" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
<title id="title">Jahajeevan build telemetry</title><desc id="desc">Live GitHub activity dashboard generated from public contribution data.</desc>
<defs><linearGradient id="bg" x1="0" y1="0" x2="1200" y2="250" gradientUnits="userSpaceOnUse"><stop stop-color="#09111F"/><stop offset="1" stop-color="#101D32"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<rect width="1200" height="250" rx="18" fill="url(#bg)"/><path d="M0 52H1200M0 204H1200" stroke="#26374F"/><text x="42" y="42" fill="#8FA7C9" font-family="ui-monospace,Menlo,monospace" font-size="14" letter-spacing="2">LIVE BUILD TELEMETRY / ${today}</text>
<text x="42" y="103" fill="#FFFFFF" font-family="ui-sans-serif,system-ui,sans-serif" font-size="44" font-weight="700">${calendar.totalContributions}</text><text x="42" y="130" fill="#98A8BF" font-family="ui-sans-serif,system-ui,sans-serif" font-size="16">contributions in the last year</text>
<text x="230" y="103" fill="#62F6D1" font-family="ui-sans-serif,system-ui,sans-serif" font-size="44" font-weight="700">${user.repositories.totalCount}</text><text x="230" y="130" fill="#98A8BF" font-family="ui-sans-serif,system-ui,sans-serif" font-size="16">public repositories</text>
<text x="42" y="179" fill="#A371F7" font-family="ui-monospace,Menlo,monospace" font-size="14">SCOUT</text><text x="128" y="179" fill="#A371F7" font-family="ui-monospace,Menlo,monospace" font-size="14">/</text><text x="150" y="179" fill="#A371F7" font-family="ui-monospace,Menlo,monospace" font-size="14">JARVIS</text><text x="232" y="179" fill="#A371F7" font-family="ui-monospace,Menlo,monospace" font-size="14">/</text><text x="254" y="179" fill="#A371F7" font-family="ui-monospace,Menlo,monospace" font-size="14">JK HOSPITAL</text>
<text x="470" y="82" fill="#C9D1D9" font-family="ui-sans-serif,system-ui,sans-serif" font-size="16" font-weight="700">Contribution field</text>${cells}
<circle cx="1115" cy="75" r="5" fill="#62F6D1" filter="url(#glow)"/><text x="1128" y="80" fill="#62F6D1" font-family="ui-monospace,Menlo,monospace" font-size="12">ACTIVE</text>
</svg>`;

await mkdir("assets", { recursive: true });
await writeFile("assets/activity-map.svg", svg);
