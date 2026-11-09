import { FolderExcludeType, FolderIncludeType } from "~/entities/chat/model";
import type { FolderTypeOption } from "./types";

export const FOLDER_COLORS = [
  "#ffffff",
  "#3faa20",
  "#d57624",
  "#cc5048",
  "#955ddc",
  "#309dba",
  "#c7508a",
  "#74899a",
];

export const INCLUDE_TYPE_OPTIONS: FolderTypeOption<FolderIncludeType>[] = [
  { id: FolderIncludeType.Contacts, label: "chat.folders.contacts", icon: "/svg/figma-icons/contacts.svg" },
  { id: FolderIncludeType.NonContacts, label: "chat.folders.nonContacts", icon: "/svg/figma-icons/non-contacts.svg" },
  { id: FolderIncludeType.Groups, label: "chat.folders.groups", icon: "/svg/figma-icons/groups.svg" },
  { id: FolderIncludeType.Channels, label: "chat.folders.channels", icon: "/svg/figma-icons/channels.svg" },
  { id: FolderIncludeType.Bots, label: "chat.folders.bots", icon: "/svg/figma-icons/bots.svg" },
];

export const EXCLUDE_TYPE_OPTIONS: FolderTypeOption<FolderExcludeType>[] = [
  { id: FolderExcludeType.Saved, label: "chat.savedMessages", icon: "/svg/figma-icons/saved-messages.svg" },
  { id: FolderExcludeType.Catalogue, label: "chat.catalogue", icon: "/svg/figma-icons/catalogue.svg" },
  { id: FolderExcludeType.Archived, label: "chat.folders.archived", icon: "/svg/figma-icons/archived.svg" },
];
