import type { CheckItem } from "~/entities/checks/model/checks.types";
import { createMockCheck } from "~/shared/mocks/checks.mock";
import { proxyToBackend } from "~/server/utils/proxy";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (!config.public.useMocks) {
    return proxyToBackend(event, "/checks");
  }

  try {
    const body = (await readBody(event)) as Partial<CheckItem> | undefined;

    return {
      success: true,
      check: createMockCheck(body),
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create check",
    });
  }
});

