import { GHUserGistType, GitHubUserType, GHUserRepositoryType } from "@/types/GitHubUser";

const GITHUB_API_BASE_URL = process.env.NEXT_PUBLIC_GITHUB_API_BASE_URL; // I set this in a constant for performance reasons
const ENDPOINTS = {
  USERS: '/users',
  SEARCH: '/search',
};

export const fetchGitHubUsers = async (page = 1, perPage = 12): Promise<GitHubUserType[]> => {
  const response = await fetch(`${GITHUB_API_BASE_URL}${ENDPOINTS.USERS}?per_page=${perPage}&since=${(page - 1) * perPage}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub users: ${response.status}`);
  }
  
  return await response.json();
}

export const searchGitHubUsers = async (query: string, page = 1, perPage = 12): Promise<GitHubUserType[]> => {
  const response = await fetch(`${GITHUB_API_BASE_URL}${ENDPOINTS.SEARCH}/users?q=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`);
  
  if (!response.ok) {
    throw new Error(`Failed to search GitHub users: ${response.status}`);
  }
  
  const data = await response.json();
  return data.items || [];
}

export const fetchGitHubUser = async (username: string): Promise<GitHubUserType> => {
  const response = await fetch(`${GITHUB_API_BASE_URL}${ENDPOINTS.USERS}/${username}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub user: ${response.status}`);
  }
  
  return await response.json();
}

export const fetchUserRepositories = async (username: string): Promise<GHUserRepositoryType[]> => {
  const response = await fetch(`${GITHUB_API_BASE_URL}${ENDPOINTS.USERS}/${username}/repos?per_page=5&sort=updated&direction=desc`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch repositories: ${response.status}`);
  }
  
  return await response.json();
}

export const fetchUserFollowers = async (username: string): Promise<GitHubUserType[]> => {
  const response = await fetch(`${GITHUB_API_BASE_URL}${ENDPOINTS.USERS}/${username}/followers?per_page=6`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch followers: ${response.status}`);
  }
  
  return await response.json();
}

export const fetchUserFollowing = async (username: string): Promise<GitHubUserType[]> => {
  const response = await fetch(`${GITHUB_API_BASE_URL}${ENDPOINTS.USERS}/${username}/following?per_page=6`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch following: ${response.status}`);
  }
  
  return await response.json();
}

export const fetchUserGists = async (username: string): Promise<GHUserGistType[]> => {
  const response = await fetch(`${GITHUB_API_BASE_URL}${ENDPOINTS.USERS}/${username}/gists?per_page=5&sort=updated&direction=desc`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch gists: ${response.status}`);
  }
  
  return await response.json();
}
