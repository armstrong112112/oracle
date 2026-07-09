import {
  sanitizeArray,
  sanitizeBoolean,
  sanitizeNumber,
  sanitizeRecord,
  sanitizeString,
  unwrapApiPayload,
} from "./common";

export interface DisputeMessageDto {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
  type: string;
  isSystem: boolean;
}

export interface DisputeEvidenceDto {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedAt: string;
}

export interface DisputeDto {
  id: string;
  orderId: string;
  reason: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  initiatedBy: string;
  assignedTo: string;
  description: string;
  messages: DisputeMessageDto[];
  evidence: DisputeEvidenceDto[];
  metadata: Record<string, unknown>;
}

export interface DisputeListResponseDto {
  disputes: DisputeDto[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateDisputeRequestDto {
  orderId: string;
  reason: string;
  description?: string;
  evidence?: DisputeEvidenceDto[];
}

export interface ResolveDisputeRequestDto {
  disputeId: string;
  resolution: string;
  decision: string;
}

export const sanitizeDisputeMessage = (payload: unknown): DisputeMessageDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    id: sanitizeString(dto.id),
    senderId: sanitizeString(dto.senderId),
    text: sanitizeString(dto.text),
    createdAt: sanitizeString(dto.createdAt),
    type: sanitizeString(dto.type),
    isSystem: sanitizeBoolean(dto.isSystem),
  };
};

export const sanitizeDisputeEvidence = (payload: unknown): DisputeEvidenceDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    id: sanitizeString(dto.id),
    name: sanitizeString(dto.name),
    url: sanitizeString(dto.url),
    type: sanitizeString(dto.type),
    uploadedAt: sanitizeString(dto.uploadedAt),
  };
};

export const sanitizeDispute = (payload: unknown): DisputeDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    id: sanitizeString(dto.id),
    orderId: sanitizeString(dto.orderId),
    reason: sanitizeString(dto.reason),
    status: sanitizeString(dto.status),
    createdAt: sanitizeString(dto.createdAt),
    updatedAt: sanitizeString(dto.updatedAt),
    initiatedBy: sanitizeString(dto.initiatedBy),
    assignedTo: sanitizeString(dto.assignedTo),
    description: sanitizeString(dto.description),
    messages: sanitizeArray(dto.messages, []).map((item) => sanitizeDisputeMessage(item)),
    evidence: sanitizeArray(dto.evidence, []).map((item) => sanitizeDisputeEvidence(item)),
    metadata: sanitizeRecord(dto.metadata),
  };
};

export const sanitizeDisputeListResponse = (payload: unknown): DisputeListResponseDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    disputes: sanitizeArray(dto.disputes, []).map((item) => sanitizeDispute(item)),
    total: sanitizeNumber(dto.total),
    page: sanitizeNumber(dto.page),
    limit: sanitizeNumber(dto.limit),
  };
};
