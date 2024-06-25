import { jwtDecode, InvalidTokenError } from "jwt-decode";

export const isNotEmpty = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== undefined && value !== null && value !== "";
};

export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

export function isNumber(value: unknown) {
  return value !== null && typeof value === "number";
}

export function serializeObject(value: unknown): string | null {
  if (isObject(value)) {
    return JSON.stringify(value);
  }
  return null;
}

const tokenDateToLocaleString = (tokenDate: number) => {
  return new Date(tokenDate * 1000).toLocaleString(Intl.Locale.name, {
    timeZoneName: "short",
  });
};

export function parseClaimValue(value: unknown): string {
  if (isObject(value)) {
    return JSON.stringify(value);
  } else if (isNumber(value)) {
    return tokenDateToLocaleString(value as number);
  } else {
    return (value as string) ?? "";
  }
}

export function decodeToken(
  token?: string | null
): Record<string, unknown> | null {
  try {
    if (!token) {
      return null;
    }
    const decodedToken = jwtDecode(token) as Record<string, unknown>;
    const unixTimestampKeys = ["exp", "iat", "nbf", "xms_tcdt"];
    unixTimestampKeys.forEach((key) => {
      if (decodedToken[key]) {
        decodedToken[key] = tokenDateToLocaleString(
          decodedToken[key] as number
        );
      }
    });

    return decodedToken;
  } catch (error: unknown) {
    console.error("Error decoding token", error);
    const tokenError = error as InvalidTokenError;
    return { error: tokenError.message };
  }
}
