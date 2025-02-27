import { GHUserGistType, GitHubUserType, GHUserRepositoryType } from "@/types/GitHubUser";

const GITHUB_API_BASE_URL = process.env.NEXT_PUBLIC_GITHUB_API_BASE_URL; // I set this in a constant for performance reasons
const ENDPOINTS = {
  USERS: '/users',
  SEARCH: '/search',
};

export const fetchGitHubUsers = async (): Promise<GitHubUserType[]> => {
  const response = await fetch(`${GITHUB_API_BASE_URL}${ENDPOINTS.USERS}?per_page=32`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub users: ${response.status}`);
  }
  
  return await response.json();
}

export const searchGitHubUsers = async (query: string): Promise<GitHubUserType[]> => {
  const response = await fetch(`${GITHUB_API_BASE_URL}${ENDPOINTS.SEARCH}/users?q=${encodeURIComponent(query)}&per_page=32`);
  
  if (!response.ok) {
    throw new Error(`Failed to search GitHub users: ${response.status}`);
  }
  
  const data = await response.json();
  return data.items || []; // GitHub search API returns results in an 'items' property
}

export const fetchGitHubUser = async (username: string): Promise<GitHubUserType> => {
  const response = await fetch(`${GITHUB_API_BASE_URL}${ENDPOINTS.USERS}/${username}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub user: ${response.status}`);
  }
  
  return await response.json();
}

export const fetchUserRepositories = async (username: string): Promise<GHUserRepositoryType[]> => {
  // Adding sort=updated to get the most recently updated repositories
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
  // Using sort=updated to get the latest gists
  const response = await fetch(`${GITHUB_API_BASE_URL}${ENDPOINTS.USERS}/${username}/gists?per_page=5&sort=updated&direction=desc`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch gists: ${response.status}`);
  }
  
  return await response.json();
}
