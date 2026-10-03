import type { Bien } from "../types/bien";

const API_BASE_URL = "http://localhost:4000";

export async function fetchProperties(): Promise<Bien[]> {
  const response = await fetch(`${API_BASE_URL}/properties`);
  if (!response.ok) {
    throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<Bien[]>;
}

export async function fetchPropertyById(id: string): Promise<Bien> {
  const response = await fetch(`${API_BASE_URL}/properties/${id}`);
  if (!response.ok) {
    throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<Bien>;
}
