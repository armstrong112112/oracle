import { ALL_FOLDER_ID } from "~/entities/chat/model";

export const folderTitle = (id: string, name: string, translate: (key: string) => string): string =>
  id === ALL_FOLDER_ID ? translate("chat.folders.allChats") : name;
