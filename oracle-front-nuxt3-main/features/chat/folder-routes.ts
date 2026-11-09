import type { LocationQueryRaw } from "vue-router";
import { ChatRoute } from "~/entities/chat/config";
import { FolderDraftMode } from "~/entities/chat/model";
import type { FolderPickerKind } from "~/entities/chat/model";

export const folderFormPath = (mode: FolderDraftMode): ChatRoute =>
  mode === FolderDraftMode.New ? ChatRoute.FolderNew : ChatRoute.FolderEdit;

export const folderPickerPath = (mode: FolderDraftMode, kind: FolderPickerKind): string =>
  `${folderFormPath(mode)}/${kind}`;

export const folderQuery = (id: string | null | undefined): LocationQueryRaw => (id ? { id } : {});
