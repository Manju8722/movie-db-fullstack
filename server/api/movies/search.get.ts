import { API_END_POINTS } from "../../utils/api-endpoints";

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event);
    const query = getQuery(event);
    const { query: searchQuery, with_genres, year } = query;
    if (!searchQuery && with_genres === undefined && year === undefined) {
      throw createError({
        statusCode: 400,
        message: "one of query,search, with_genres or year is required",
      });
    }
    const data = await $fetch(API_END_POINTS.MOVIES_SEARCH, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${config.accessToken}`,
      },
      params: {
        query: searchQuery,
        language: "en-US",
        page: 1,
        with_genres: with_genres || "",
        year: year || "",
      },
    });
    return data;
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: (error as Error).message,
    });
  }
});
