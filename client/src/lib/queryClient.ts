import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = Array.isArray(queryKey) ? queryKey[0] : queryKey;
        const response = await fetch(url as string);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      },
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export async function apiRequest(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API request failed:', {
      url,
      status: response.status,
      statusText: response.statusText,
      body: errorText
    });
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }

  try {
    return await response.json();
  } catch (error) {
    const responseText = await response.text();
    console.error('Failed to parse JSON response:', {
      url,
      responseText: responseText.substring(0, 500),
      error: error instanceof Error ? error.message : String(error)
    });
    throw new Error(`Invalid JSON response: ${error instanceof Error ? error.message : String(error)}`);
  }
}