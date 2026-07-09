import type { DisputeDto } from "~/shared/types/api/disputes";
import { withMockOrProxy } from "~/server/utils/mockOrProxy";

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<DisputeDto>>(event);

  return withMockOrProxy(event, "/disputes", () => {
    const newDispute: DisputeDto = {
      id: `dispute-${Math.random().toString(36).slice(2, 8)}`,
      orderId: body.orderId ?? "",
      reason: body.reason ?? "other",
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      initiatedBy: body.initiatedBy ?? "current-user",
      assignedTo: body.assignedTo ?? "moderator",
      description: body.description ?? "",
      messages: [],
      evidence: body.evidence ?? [],
      metadata: {},
    };

    return {
      success: true,
      dispute: newDispute,
    };
  });
});
