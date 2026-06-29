export {};

declare global {
  interface Window {
    chattable: {
      initialize: (options: { theme?: string; stylesheet?: string }) => void;
    };
  }
}
