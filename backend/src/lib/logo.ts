const DATA_URL_PATTERN = /^data:([^;]+);base64,(.+)$/;

export function decodeLogoDataUrl(value: string | null) {
  if (!value) {
    return {
      logoData: null,
      logoMimeType: null,
    };
  }

  const matched = DATA_URL_PATTERN.exec(value);

  if (!matched) {
    throw new Error("Logo must be a valid data URL");
  }

  return {
    logoMimeType: matched[1],
    logoData: Buffer.from(matched[2], "base64"),
  };
}

export function encodeLogoDataUrl(
  logoData: Buffer | Uint8Array | null,
  logoMimeType: string | null,
) {
  if (!logoData || !logoMimeType) {
    return null;
  }

  const buffer = Buffer.isBuffer(logoData)
    ? logoData
    : Buffer.from(logoData);

  return `data:${logoMimeType};base64,${buffer.toString("base64")}`;
}
