import { API_END_POINTS } from "../../utils/api-endpoints";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Id not found in the request",
      });
    }
    const config = useRuntimeConfig(event);
    const query = `append_to_response=account_states&session_id=${config.sessionId}`;
    const data = await $fetch(
      API_END_POINTS.MOVIES_DETAILS + `/${id}?${query}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${config.accessToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: (error as Error).message,
    });
  }
});
