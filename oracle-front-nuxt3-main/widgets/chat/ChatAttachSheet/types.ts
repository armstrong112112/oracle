export type AttachPickKind = "image" | "file";

export interface AttachPick {
  id: string;
  url: string;
  name: string;
  kind: AttachPickKind;
}
