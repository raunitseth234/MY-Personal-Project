export const CHROME_HIDDEN_PREFIXES = ['/account', '/login', '/register'];

export function isChromeHidden(pathname: string) {
  return CHROME_HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}
