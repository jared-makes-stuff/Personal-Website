const EXTERNAL_PROTOCOL_PATTERN = /^(https?:|mailto:|tel:|data:|blob:)/i;

export const normalizeExternalUrl = (value?: string): string | null => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (EXTERNAL_PROTOCOL_PATTERN.test(trimmed) || trimmed.startsWith("/")) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

export const resolveAssetUrl = (value?: string): string | null => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (EXTERNAL_PROTOCOL_PATTERN.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  return `${import.meta.env.BASE_URL}${trimmed}`;
};
