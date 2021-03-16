export {};
declare global {
  interface Window {
    grecaptcha: {
      render: (container: HTMLElement, parameters: object) => void;
      reset: () => void;
    };
    onLoadRecaptcha: () => void;
  }
}