export function bekraftaLamna(smutsig: boolean, bekrafta: () => boolean): boolean {
  return !smutsig || bekrafta();
}

export function harAndringar(original: unknown, utkast: unknown): boolean {
  return JSON.stringify(original) !== JSON.stringify(utkast);
}