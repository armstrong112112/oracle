import { ref } from "vue";
import { createId } from "~/entities/chat/lib/ids";
import { ALL_FOLDER_ID, FOLDER_INCLUDE_KIND, FolderDraftMode } from "~/entities/chat/model";
import type { ChatFolder, ChatFolderDraft, ChatFolderSnapshot, ChatKind, FolderIncludeType } from "~/entities/chat/model";
import type { RoomList } from "./room-list";

const snapshotOf = (folder?: ChatFolder): ChatFolderSnapshot => ({
  name: folder?.name ?? "",
  color: folder?.color ?? null,
  includeIds: [...(folder?.includeIds ?? [])],
  excludeIds: [...(folder?.excludeIds ?? [])],
  includeTypeIds: [...(folder?.includeTypeIds ?? [])],
  excludeTypeIds: [...(folder?.excludeTypeIds ?? [])],
});

const kindsOf = (typeIds: FolderIncludeType[]): ChatKind[] => [
  ...new Set(typeIds.flatMap((id) => FOLDER_INCLUDE_KIND[id] ?? [])),
];

export const createFolderDraft = ({ folders }: Pick<RoomList, "folders">) => {
  const folderDraft = ref<ChatFolderDraft | null>(null);

  const draftFor = (mode: FolderDraftMode, folder?: ChatFolder): ChatFolderDraft => ({
    mode,
    id: folder?.id ?? null,
    ...snapshotOf(folder),
    baseline: mode === FolderDraftMode.Edit ? snapshotOf(folder) : null,
  });

  const beginNewFolder = (): void => {
    folderDraft.value = draftFor(FolderDraftMode.New);
  };

  const beginEditFolder = (folderId: string): void => {
    const folder = folders.value.find((item) => item.id === folderId);
    if (folder) {
      folderDraft.value = draftFor(FolderDraftMode.Edit, folder);
    }
  };

  const patchFolderDraft = (patch: Partial<ChatFolderSnapshot>): void => {
    if (folderDraft.value) {
      folderDraft.value = { ...folderDraft.value, ...patch };
    }
  };

  const commitFolderDraft = (): boolean => {
    const draft = folderDraft.value;
    const name = draft?.name.trim();
    if (!draft || !name) {
      return false;
    }
    const isNew = draft.mode === FolderDraftMode.New;
    if (isNew && !draft.includeIds.length && !draft.includeTypeIds.length) {
      return false;
    }

    const previous = draft.id ? folders.value.find((item) => item.id === draft.id) : undefined;
    const next: ChatFolder = {
      id: previous?.id ?? createId("folder"),
      name,
      color: draft.color,
      includeIds: [...draft.includeIds],
      excludeIds: [...draft.excludeIds],
      includeTypes: draft.includeTypeIds.length ? kindsOf(draft.includeTypeIds) : [...(previous?.includeTypes ?? [])],
    };
    const usesTypes =
      isNew ||
      Boolean(previous?.includeTypeIds || previous?.excludeTypeIds) ||
      draft.includeTypeIds.length > 0 ||
      draft.excludeTypeIds.length > 0;
    if (usesTypes) {
      next.includeTypeIds = [...draft.includeTypeIds];
      next.excludeTypeIds = [...draft.excludeTypeIds];
    }

    if (previous) {
      folders.value = folders.value.map((item) => (item.id === previous.id ? next : item));
    } else {
      const pinned = folders.value.filter((item) => item.id === ALL_FOLDER_ID);
      const rest = folders.value.filter((item) => item.id !== ALL_FOLDER_ID);
      folders.value = [...pinned, ...rest, next];
    }
    folderDraft.value = null;
    return true;
  };

  return {
    folderDraft,
    beginNewFolder,
    beginEditFolder,
    patchFolderDraft,
    commitFolderDraft,
  };
};
