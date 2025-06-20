// Get the base API URL from environment and strip trailing '/api' for image/static resources
export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/api\/?$/, "");

// Returns full API endpoint (for fetch to /api)
export const getApiEndpoint = (path) =>
  `${API_URL}/api${path.startsWith("/") ? path : `/${path}`}`;

// Returns static/image URL
export const getImageUrl = (path) =>
  path.startsWith("http")
    ? path
    : `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
