import { ChatKind } from "~/entities/chat/model";
import type { ChatFolder } from "~/entities/chat/model";

export const MOCK_FOLDERS: ChatFolder[] = [
  {
    id: "all",
    name: "All Chats",
    includeIds: [],
    excludeIds: [],
    includeTypes: [],
  },
  {
    id: "work",
    name: "Work",
    includeIds: ["group-oracle", "group-dev", "channel-news"],
    excludeIds: [],
    includeTypes: [ChatKind.Group, ChatKind.Channel],
  },
  {
    id: "personal",
    name: "Personal",
    includeIds: ["dm-anna", "dm-max"],
    excludeIds: [],
    includeTypes: [ChatKind.Dm],
  },
  {
    id: "french",
    name: "French",
    includeIds: [],
    excludeIds: [],
    includeTypes: [],
  },
  {
    id: "china",
    name: "China",
    includeIds: ["dm-support"],
    excludeIds: [],
    includeTypes: [],
  },
];
