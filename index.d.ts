/* tslint:disable */
/* eslint-disable */

/* auto-generated by NAPI-RS */

export interface Options {
  theme?: "default" | "github-light" | "github-dark"
}
export function highlight(code: string, language: "js" | "jsx" | "ts"| "tsx" | "go" | "c" | "py" | "rb", options?: Options | undefined | null): string
