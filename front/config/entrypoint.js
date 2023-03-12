export const ENTRYPOINT =
  typeof window === "undefined"
    ? import.meta.env.VITE_PUBLIC_ENTRYPOINT
    : window.origin + "/api";
