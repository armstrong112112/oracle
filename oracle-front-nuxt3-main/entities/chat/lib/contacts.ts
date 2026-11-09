import type { VacRoom, VacRoomUser } from "~/entities/chat/model";

export interface ContactGroup {
  letter: string;
  people: VacRoomUser[];
}

export const uniqueUsers = (rooms: readonly Pick<VacRoom, "users">[]): VacRoomUser[] => {
  const seen = new Map<string, VacRoomUser>();
  for (const user of rooms.flatMap((room) => room.users)) {
    if (!seen.has(user._id)) {
      seen.set(user._id, user);
    }
  }
  return [...seen.values()];
};

export const filterByName = (people: readonly VacRoomUser[], query: string): VacRoomUser[] => {
  const needle = query.trim().toLowerCase();
  return needle ? people.filter((user) => user.username.toLowerCase().includes(needle)) : [...people];
};

export const groupByLetter = (people: readonly VacRoomUser[]): ContactGroup[] => {
  const groups: ContactGroup[] = [];
  for (const person of people) {
    const letter = person.username.slice(0, 1).toUpperCase() || "#";
    const last = groups[groups.length - 1];
    if (last?.letter === letter) {
      last.people.push(person);
    } else {
      groups.push({ letter, people: [person] });
    }
  }
  return groups;
};
