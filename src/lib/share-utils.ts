// Utility functions for generating and parsing shareable Valentine links

import { UserData } from '@/contexts/UserContext';

export interface ShareableData {
  hisName: string;
  herName: string;
  hisNickname: string;
  herNickname: string;
}

/**
 * Encode user data into a URL-safe base64 string
 */
export function encodeShareData(data: ShareableData): string {
  const json = JSON.stringify(data);
  // Use btoa for base64 encoding and make it URL-safe
  const base64 = btoa(unescape(encodeURIComponent(json)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Decode a URL-safe base64 string back to user data
 */
export function decodeShareData(encoded: string): ShareableData | null {
  try {
    // Restore standard base64 characters
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }
    const json = decodeURIComponent(escape(atob(base64)));
    return JSON.parse(json);
  } catch (error) {
    console.error('Failed to decode share data:', error);
    return null;
  }
}

/**
 * Generate a shareable link for the Valentine experience
 */
export function generateShareLink(data: ShareableData, baseUrl: string): string {
  const encoded = encodeShareData(data);
  return `${baseUrl}/v/${encoded}`;
}

/**
 * Check if we're on a shared experience page
 */
export function isSharedExperience(): boolean {
  return window.location.pathname.startsWith('/v/');
}

/**
 * Get the share code from the current URL
 */
export function getShareCodeFromUrl(): string | null {
  const path = window.location.pathname;
  if (path.startsWith('/v/')) {
    return path.slice(3); // Remove '/v/' prefix
  }
  return null;
}
