import { API_END_POINTS } from "../../utils/api-endpoints";

export default defineEventHandler(async (event) => {
  try {
    const { media_id, favorite } = await readBody(event);
    if (!media_id) {
      throw createError({
        statusCode: 400,
        message: "Media ID not found in the request",
      });
    }
    if (favorite === undefined || favorite === null) {
      throw createError({
        statusCode: 400,
        message: "Favorite status not found in the request",
      });
    }
    const config = useRuntimeConfig(event);
    const query = `append_to_response=account_states&session_id=${config.sessionId}`;
    const data = await $fetch(
      API_END_POINTS.MOVIES_FAVORITE?.replace(
        "{account_id}",
        config.accountId
      ) +
        "?" +
        query,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${config.accessToken}`,
        },
        body: { ...{ media_id, favorite }, media_type: "movie" },
      }
    );
    console.log("🚀 ~ data:", data);
    return data;
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: (error as Error).message,
    });
  }
});
