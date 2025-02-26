import { GitHubUser } from "@/types/GitHubUser";

const GITHUB_API_BASE_URL = process.env.NEXT_PUBLIC_GITHUB_API_BASE_URL; // I set this in a constant for performance reasons
const ENDPOINTS = {
  USERS: '/users',
  SEARCH: '/search',
};

export const fetchGitHubUsers = async (): Promise<GitHubUser[]> => {
  const response = await fetch(`${GITHUB_API_BASE_URL}${ENDPOINTS.USERS}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub users: ${response.status}`);
  }
  
  return await response.json();
}

export const searchGitHubUsers = async (query: string): Promise<GitHubUser[]> => {
  const response = await fetch(`${GITHUB_API_BASE_URL}${ENDPOINTS.SEARCH}/users?q=${query}`);
  
  if (!response.ok) {
    throw new Error(`Failed to search GitHub users: ${response.status}`);
  }
  
  return await response.json();
}

export const fetchGitHubUser = async (username: string): Promise<GitHubUser> => {
  const response = await fetch(`${GITHUB_API_BASE_URL}${ENDPOINTS.USERS}/${username}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub user: ${response.status}`);
  }
  
  return await response.json();
}
