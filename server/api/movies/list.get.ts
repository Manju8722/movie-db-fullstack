import { API_END_POINTS } from "../../utils/api-endpoints";

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event);

    const data = await $fetch(API_END_POINTS.MOVIES_LIST, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${config.accessToken}`,
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
