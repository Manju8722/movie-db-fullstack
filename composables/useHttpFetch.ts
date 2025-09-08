export default function useApi<T>(
  link: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  options?: any
) {
  const config = useRuntimeConfig();

  return useFetch<T>(link, {
    method,
    ...options,
    headers: {
      accept: "application/json",
      ...options?.headers,
    },
  });
}
