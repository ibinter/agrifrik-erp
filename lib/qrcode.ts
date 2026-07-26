import { createHash, randomBytes } from "crypto";

/**
 * Génère un jeton de vérification déterministe (basé sur l'ID du document)
 * ou aléatoire si aucun secret n'est fourni.
 */
export function generateVerificationToken(
  docId: string,
  secret?: string
): string {
  const base = secret
    ? createHash("sha256")
        .update(
          `${docId}${secret}${process.env.QR_SECRET ?? "agrifrik-qr-secret"}`
        )
        .digest("hex")
        .slice(0, 16)
    : randomBytes(8).toString("hex");
  return base;
}

/**
 * Retourne l'URL publique de vérification pour un jeton donné.
 */
export function getVerifyUrl(jeton: string): string {
  return `https://agrifrik.ibigsoft.com/verify/${jeton}`;
}

/**
 * Génère un QR code SVG minimal pour une URL donnée.
 *
 * Implémentation de secours (fallback visuel) — pour la production,
 * installer la dépendance `qrcode` et utiliser sa sortie SVG.
 *
 * La structure reprend les trois carrés de détection (finder patterns)
 * positionnés aux coins haut-gauche, haut-droit et bas-gauche,
 * conformes au standard QR code ISO 18004.
 */
export function generateQRCodeSvg(url: string, size: number = 120): string {
  const s = size;

  return `<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}">
  <rect width="${s}" height="${s}" fill="white"/>

  <!-- Finder pattern — haut gauche -->
  <rect x="4" y="4" width="16" height="16" fill="none" stroke="black" stroke-width="2"/>
  <rect x="6" y="6" width="12" height="12" fill="black"/>
  <rect x="8" y="8" width="8" height="8" fill="white"/>
  <rect x="10" y="10" width="4" height="4" fill="black"/>

  <!-- Finder pattern — haut droit -->
  <rect x="${s - 20}" y="4" width="16" height="16" fill="none" stroke="black" stroke-width="2"/>
  <rect x="${s - 18}" y="6" width="12" height="12" fill="black"/>
  <rect x="${s - 16}" y="8" width="8" height="8" fill="white"/>
  <rect x="${s - 14}" y="10" width="4" height="4" fill="black"/>

  <!-- Finder pattern — bas gauche -->
  <rect x="4" y="${s - 20}" width="16" height="16" fill="none" stroke="black" stroke-width="2"/>
  <rect x="6" y="${s - 18}" width="12" height="12" fill="black"/>
  <rect x="8" y="${s - 16}" width="8" height="8" fill="white"/>
  <rect x="10" y="${s - 14}" width="4" height="4" fill="black"/>

  <!-- Zone de données (représentation symbolique) -->
  <rect x="24" y="24" width="${s - 44}" height="${s - 44}" fill="none" stroke="#E0E0E0" stroke-width="0.5"/>

  <!-- URL tronquée en pied de QR -->
  <text x="${s / 2}" y="${s - 2}" text-anchor="middle" font-size="4" fill="#666">${url.slice(0, 38)}${url.length > 38 ? "…" : ""}</text>
</svg>`;
}

/**
 * Génère une balise <img> data-URI encapsulant le SVG du QR code.
 * Utilisable dans un contexte React (dangerouslySetInnerHTML ou src).
 */
export function generateQRCodeDataUri(url: string, size: number = 120): string {
  const svg = generateQRCodeSvg(url, size);
  const encoded = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${encoded}`;
}
