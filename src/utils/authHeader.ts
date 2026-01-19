// utils/authHeader.ts

// Devuelve un objeto con el header Authorization para Apollo Client
export async function getAuthHeader(
  authStorage: any,
): Promise<{ Authorization: string } | null> {
  if (!authStorage) return null;
  const token = await authStorage.getAccessToken?.();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return null;
}
