declare module '*.scm' {
  const content: string;
  export default content;
}

declare module '*.wasm' {
  const dataUri: string;
  export default dataUri;
}
