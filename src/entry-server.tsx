import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";
import {
  homeSchema,
  aboutSchema,
  coursesSchema,
  contactSchema,
} from "./data/schema";

/** Renders one route to HTML for the prerender step. */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}

/** JSON-LD written into each prerendered page's <head>. */
export const pageSchemas: Record<string, object> = {
  "/": homeSchema,
  "/about": aboutSchema,
  "/courses": coursesSchema,
  "/contact": contactSchema,
};

export { pageMeta, fullTitle, canonical } from "./data/meta";
export { prerenderPaths } from "./routes";
