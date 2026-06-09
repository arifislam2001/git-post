// lib/apiClient.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";

const request = async (
  endpoint,
  {
    method = "GET",
    body,
    headers = {},
    cache = "no-store",
    revalidate,
    tags,
    options = {}, // extra fetch options
  } = {}
) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,

      headers: {
        "Content-Type": "application/json",
        ...headers,
      },

      ...(body && {
        body: JSON.stringify(body),
      }),

      /**
       * Next.js Cache Config
       */

      ...(cache && { cache }),

      ...(revalidate && {
        next: {
          revalidate: revalidate,
        },
      }),

      ...(tags && {
        next: {
          tags,
        },
      }),

      /**
       * Extra Custom Options
       */

      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error : ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API ERROR:", error.message);

    return {
      success: false,
      message: error.message,
    };
  }
};

export const apiClient = {
  get: (endpoint, options = {}) =>
    request(endpoint, {
      method: "GET",
      ...options,
    }),

  post: (endpoint, body, options = {}) =>
    request(endpoint, {
      method: "POST",
      body,
      ...options,
    }),

  put: (endpoint, body, options = {}) =>
    request(endpoint, {
      method: "PUT",
      body,
      ...options,
    }),

  patch: (endpoint, body, options = {}) =>
    request(endpoint, {
      method: "PATCH",
      body,
      ...options,
    }),

  delete: (endpoint, options = {}) =>
    request(endpoint, {
      method: "DELETE",
      ...options,
    }),

  options: (endpoint, options = {}) =>
    request(endpoint, {
      method: "OPTIONS",
      ...options,
    }),
};