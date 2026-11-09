import { ensureShadowStyle } from "~/entities/chat/lib/vac-shadow";
import { chatImages } from "~/entities/chat/lib/media-files";
import { isPhotoSelection, selectionMessageId } from "~/entities/chat/lib/photo-selection";
import type { VacMessage, VacMessageFile } from "~/entities/chat/model";

const STYLE_ID = "oracle-photo-mosaic";
const SELECT_STYLE_ID = "oracle-photo-mosaic-selected";
const CHECK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 10'%3E%3Cpath d='M1 5.2 4.2 8.2 11 1.2' fill='none' stroke='%23fff' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")";

type MosaicMessage = Pick<VacMessage, "_id" | "files">;

const album = (message: MosaicMessage): VacMessageFile[] | null => {
  const files = message.files ?? [];
  const images = chatImages(files);
  if (images.length < 2 || images.length !== files.length) {
    return null;
  }
  return images;
};

const shell = (id: string, columns: string, rows: string): string => {
  const sel = `#${CSS.escape(id)}`;
  return `
${sel} .vac-message-container {
  width: auto !important;
  max-width: 280px !important;
  padding: 0 !important;
  background: transparent !important;
}
${sel} .vac-message-card {
  position: relative;
  width: 280px !important;
  max-width: 280px !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}
${sel} .vac-message-files-container {
  display: grid;
  grid-template-columns: ${columns};
  grid-template-rows: ${rows};
  gap: 2px;
  width: 280px;
  height: 256px;
  margin: 0;
}
${sel} .vac-message-files-container > div:not(.vac-format-message-wrapper) {
  position: relative;
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow: hidden;
}
${sel} .vac-message-file-container,
${sel} .vac-message-image-container,
${sel} .vac-message-image {
  width: 100%;
  height: 100%;
  max-height: none !important;
  margin: 0;
}
${sel} .vac-message-image {
  background-size: cover !important;
  background-position: center !important;
  border-radius: inherit;
  box-shadow: inset 0 0 0 999px rgba(0, 0, 0, 0.1);
}
${sel} .vac-format-message-wrapper,
${sel} .vac-message-files-container > div:nth-child(n + 5):not(.vac-format-message-wrapper) {
  display: none !important;
}
${sel} .vac-text-timestamp {
  position: absolute;
  z-index: 4;
  left: 8px;
  bottom: 8px;
  display: flex;
  align-items: center;
  margin: 0 !important;
  padding: 4px 8px;
  border-radius: 100px;
  background: rgba(0, 0, 0, 0.15);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  color: #fff !important;
  font-family: Roboto, Inter, sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.35;
}
${sel} .vac-text-timestamp span,
${sel} .vac-text-timestamp .vac-icon-check {
  color: #fff;
}
${sel} .vac-text-timestamp .vac-icon-check {
  display: none;
}
${sel} .vac-message-files-container > div:nth-child(-n + 4)::before {
  content: "";
  position: absolute;
  z-index: 5;
  top: 6px;
  left: 6px;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 1.5px solid rgba(255, 255, 255, 0.75);
  border-radius: 50%;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 10px 8px;
  opacity: 0;
  transform: scale(0.72);
  pointer-events: none;
  transition: opacity 220ms cubic-bezier(0.22, 1, 0.36, 1), transform 220ms cubic-bezier(0.22, 1, 0.36, 1), background-color 160ms ease, border-color 160ms ease;
}
:host(.oracle-selecting) ${sel} .vac-message-files-container > div:nth-child(-n + 4)::before {
  opacity: 1;
  transform: scale(1);
}
`;
};

const placed = (id: string, child: number, radius: string, area: string): string => `
#${CSS.escape(id)} .vac-message-files-container > div:nth-child(${child}):not(.vac-format-message-wrapper) {
  ${area}
  border-radius: ${radius};
}
`;

const layoutFor = (id: string, count: number): string => {
  if (count === 2) {
    return `
${shell(id, "139px 139px", "256px")}
${placed(id, 1, "12px 4px 4px 12px", "grid-column: 1; grid-row: 1;")}
${placed(id, 2, "4px 12px 12px 4px", "grid-column: 2; grid-row: 1;")}
`;
  }

  if (count === 3) {
    return `
${shell(id, "170px 108px", "127px 127px")}
${placed(id, 1, "12px 4px 4px 12px", "grid-column: 1; grid-row: 1 / span 2;")}
${placed(id, 2, "4px 12px 4px 4px", "grid-column: 2; grid-row: 1;")}
${placed(id, 3, "4px 4px 12px 4px", "grid-column: 2; grid-row: 2;")}
`;
  }

  const overflow = count - 4;
  const more = overflow > 0
    ? `
#${CSS.escape(id)} .vac-message-files-container > div:nth-child(4) .vac-message-image {
  box-shadow: inset 0 0 0 999px rgba(0, 0, 0, 0.4);
}
#${CSS.escape(id)} .vac-message-files-container > div:nth-child(4)::after {
  content: "+${overflow}";
  position: absolute;
  z-index: 2;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: Roboto, Inter, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  pointer-events: none;
}
`
    : "";

  return `
${shell(id, "170px 108px", "84px 84px 84px")}
${placed(id, 1, "12px 4px 4px 12px", "grid-column: 1; grid-row: 1 / span 3;")}
${placed(id, 2, "4px 12px 4px 4px", "grid-column: 2; grid-row: 1;")}
${placed(id, 3, "4px", "grid-column: 2; grid-row: 2;")}
${placed(id, 4, "4px 4px 12px 4px", "grid-column: 2; grid-row: 3;")}
${more}
`;
};

const selectedCell = (id: string, child: number): string => `
:host(.oracle-selecting) #${CSS.escape(id)} .vac-message-files-container > div:nth-child(${child})::before {
  border-color: transparent;
  background-color: var(--primary-2);
  background-image: ${CHECK};
}
`;

const selectedRules = (messages: readonly MosaicMessage[], ids: readonly string[]): string => {
  const albums = new Map<string, number>();
  for (const message of messages) {
    const images = album(message);
    if (images) {
      albums.set(message._id, Math.min(images.length, 4));
    }
  }

  const full = new Set(ids.filter((id) => !isPhotoSelection(id)));
  const rules: string[] = [];

  for (const [id, visible] of albums) {
    const picked = new Set<number>();
    if (full.has(id)) {
      for (let index = 0; index < visible; index += 1) {
        picked.add(index);
      }
    }
    for (const key of ids) {
      if (!isPhotoSelection(key) || selectionMessageId(key) !== id) {
        continue;
      }
      const index = Number(key.slice(id.length + 1));
      if (index >= 0 && index < visible) {
        picked.add(index);
      }
    }
    for (const index of picked) {
      rules.push(selectedCell(id, index + 1));
    }
  }

  return rules.join("");
};

export const applyPhotoMosaics = (
  host: HTMLElement,
  messages: readonly VacMessage[],
  selectedIds: readonly string[],
): void => {
  const root = host.shadowRoot;
  if (!root) {
    return;
  }

  const albums = messages.filter((message) => album(message));
  const layout = albums.map((message) => layoutFor(message._id, chatImages(message.files).length)).join("");
  ensureShadowStyle(root, STYLE_ID, layout);
  ensureShadowStyle(root, SELECT_STYLE_ID, selectedRules(albums, selectedIds));
};
