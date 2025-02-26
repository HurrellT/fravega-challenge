const GITHUB_API_BASE_URL = process.env.NEXT_PUBLIC_GITHUB_API_BASE_URL; // I set this in a constant for performance reasons
const ENDPOINTS = {
  USERS: '/users',
  SEARCH: '/search',
};

export type GitHubUser = {
  id: number;
  login: string;
  avatar_url: string;
  // Add other fields as needed
};

export const fetchGitHubUsers = async (): Promise<GitHubUser[]> => {
  const response = await fetch(`${GITHUB_API_BASE_URL}${ENDPOINTS.USERS}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub users: ${response.status}`);
  }
  
  return await response.json();
}
