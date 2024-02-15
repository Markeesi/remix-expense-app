import sharedStyles from "~/styles/shared.css";
import Error from "./components/util/Error";

const {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useMatches,
} = require("@remix-run/react");

export const meta = () => ({
  charset: "utf-8",
  title: "Diamond Expenses Tracking App",
  viewport: "width=device-width,initial-scale=1",
});

function Document({ title, children }) {
  const matches = useMatches();
  const disableJS = matches.some((match) => match.handle?.disableJS);

  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!disableJS && <Scripts />}
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caughtRes = useCatch();

  return (
    <Document title={caughtRes.statusText}>
      <main>
        <Error title={caughtRes.statusText}>
          <p>{caughtRes.data?.message || "Something went wrong."}</p>
          <p>
            Back to <Link to="/">safety</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <Document title="An error occured">
      <main>
        <Error title="An error occured">
          <p>{error.message || "Something went wrong."}</p>
          <p>
            Back to <Link to="/">safety</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}
