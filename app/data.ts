///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 🛑 This piece of code was adapted from Remix.Run's Official Contacts Tutorial, it's just a fake database
///////////////////////////////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import invariant from "tiny-invariant";


type GamerMutation = {
  id?: string;
  firstname?: string;
  lastname?: string;
  avatar?: string;
  username?: string;
  points?: number;
  notes?: string;
};

export type GamerRecord = GamerMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeGamers = {
  records: {} as Record<string, GamerRecord>,

  async getAll(): Promise<GamerRecord[]> {
    return Object.keys(fakeGamers.records)
      .map((key) => fakeGamers.records[key])
      .sort(sortBy("-createdAt", "lastname"));
  },

  async get(id: string): Promise<GamerRecord | null> {
    return fakeGamers.records[id] || null;
  },

  async create(values: GamerMutation): Promise<GamerRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newGamer = { id, createdAt, ...values };
    fakeGamers.records[id] = newGamer;
    return newGamer;
  },

  async set(id: string, values: GamerMutation): Promise<GamerRecord> {
    const gamer = await fakeGamers.get(id);
    invariant(gamer, `No gamer found for ${id}`);
    const updatedGamer = { ...gamer, ...values };
    fakeGamers.records[id] = updatedGamer;
    return updatedGamer;
  },

  destroy(id: string): null {
    delete fakeGamers.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getGamers(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let gamers = await fakeGamers.getAll();
  if (query) {
    gamers = matchSorter(gamers, query, {
      keys: ["firstname", "lastname"],
    });
  }
  return gamers.sort(sortBy("lastname", "createdAt"));
}

export async function createEmptyGamer() {
  const gamer = await fakeGamers.create({});
  return gamer;
}

export async function getGamer(id: string) {
  return fakeGamers.get(id);
}

export async function updateGamer(id: string, updates: GamerMutation) {
  const gamer = await fakeGamers.get(id);
  if (!gamer) {
    throw new Error(`No gamer found for ${id}`);
  }
  await fakeGamers.set(id, { ...gamer, ...updates });
  return gamer;
}

export async function deleteGamer(id: string) {
  fakeGamers.destroy(id);
}

[
  {
    avatar: "assets/icons/icon_user_uxderrick.svg",
    firstname: "Alex",
    lastname: "Anderson",
    username: "uxderrick",
    points: 4030,
  },
  {
    avatar: "assets/icons/icon_user_dragon64.svg",
    firstname: "Giovanni",
    lastname: "Benussi",
    username: "dragon64",
    points: 3900,
  },
  {
    avatar: "assets/icons/icon_user_ghana_09.svg",
    firstname: "Paul",
    lastname: "Bratslavsky",
    username: "ghana_09",
    points: 2233,
  },
  {
    avatar: "assets/icons/icon_user_hey__ok.svg",
    firstname: "Pedro",
    lastname: "Cattori",
    username: "hey__ok",
    points: 1239,
  },
  {
    avatar: "assets/icons/icon_user_you.svg",
    firstname: "Christopher",
    lastname: "Chedeau",
    username: "__oscarnewman",
    points: 335
  },
  {
    avatar:
      "https://sessionize.com/image/b07e-400o400o2-KgNRF3S9sD5ZR4UsG7hG4g.jpg",
    firstname: "Michael",
    lastname: "Jackson",
    username: "@Vjeux",
  },
  {
    avatar:
      "https://sessionize.com/image/262f-400o400o2-UBPQueK3fayaCmsyUc1Ljf.jpg",
    firstname: "Cameron",
    lastname: "Matheson",
    username: "@cmatheson",
  },
  {
    avatar:
      "https://sessionize.com/image/820b-400o400o2-Ja1KDrBAu5NzYTPLSC3GW8.jpg",
    firstname: "Brooks",
    lastname: "Lybrand",
    username: "@BrooksLybrand",
  },
  {
    avatar:
      "https://sessionize.com/image/df38-400o400o2-JwbChVUj6V7DwZMc9vJEHc.jpg",
    firstname: "Shruti",
    lastname: "Kapoor",
    username: "@ralex1993",
  },
  {
    avatar:
      "https://sessionize.com/image/5578-400o400o2-BMT43t5kd2U1XstaNnM6Ax.jpg",
    firstname: "Kent C.",
    lastname: "Dodds",
    username: "@kentcdodds",
  },
  {
    avatar:
      "https://sessionize.com/image/c9d5-400o400o2-Sri5qnQmscaJXVB8m3VBgf.jpg",
    firstname: "Nevi",
    lastname: "Shah",
    username: "@nevikashah",
  },
  {
    avatar:
      "https://sessionize.com/image/2694-400o400o2-MYYTsnszbLKTzyqJV17w2q.png",
    firstname: "Andrew",
    lastname: "Petersen",
  },
  {
    avatar:
      "https://sessionize.com/image/907a-400o400o2-9TM2CCmvrw6ttmJiTw4Lz8.jpg",
    firstname: "Scott",
    lastname: "Smerchek",
    username: "@smerchek",
  },
  {
    avatar:
      "https://sessionize.com/image/08be-400o400o2-WtYGFFR1ZUJHL9tKyVBNPV.jpg",
    firstname: "Glenn",
    lastname: "Reyes",
    username: "@giovannibenussi",
  },
  {
    avatar:
      "https://sessionize.com/image/f814-400o400o2-n2ua5nM9qwZA2hiGdr1T7N.jpg",
    firstname: "Igor",
    lastname: "Minar",
    username: "@IgorMinar",
  },
  {
    avatar:
      "https://sessionize.com/image/fb82-400o400o2-LbvwhTVMrYLDdN3z4iEFMp.jpeg",
    firstname: "Brandon",
    lastname: "Kish",
  },
  {
    avatar:
      "https://sessionize.com/image/fcda-400o400o2-XiYRtKK5Dvng5AeyC8PiUA.png",
    firstname: "Arisa",
    lastname: "Fukuzaki",
    username: "@arisa_dev",
  },
  {
    avatar:
      "https://sessionize.com/image/c8c3-400o400o2-PR5UsgApAVEADZRixV4H8e.jpeg",
    firstname: "Alexandra",
    lastname: "Spalato",
    username: "@alexadark",
  },
  {
    avatar:
      "https://sessionize.com/image/7594-400o400o2-hWtdCjbdFdLgE2vEXBJtyo.jpg",
    firstname: "Cat",
    lastname: "Johnson",
  },
  {
    avatar:
      "https://sessionize.com/image/5636-400o400o2-TWgi8vELMFoB3hB9uPw62d.jpg",
    firstname: "Ashley",
    lastname: "Narcisse",
    username: "@_darkfadr",
  },
  {
    avatar:
      "https://sessionize.com/image/6aeb-400o400o2-Q5tAiuzKGgzSje9ZsK3Yu5.JPG",
    firstname: "Edmund",
    lastname: "Hung",
    username: "@_edmundhung",
  },
  {
    avatar:
      "https://sessionize.com/image/30f1-400o400o2-wJBdJ6sFayjKmJycYKoHSe.jpg",
    firstname: "Clifford",
    lastname: "Fajardo",
    username: "@cliffordfajard0",
  },
  {
    avatar:
      "https://sessionize.com/image/6faa-400o400o2-amseBRDkdg7wSK5tjsFDiG.jpg",
    firstname: "Erick",
    lastname: "Tamayo",
    username: "@ericktamayo",
  },
  {
    avatar:
      "https://sessionize.com/image/feba-400o400o2-R4GE7eqegJNFf3cQ567obs.jpg",
    firstname: "Oscar",
    lastname: "Newman",
    username: "@codingthirty",
  },
  {
    avatar:
      "https://sessionize.com/image/c315-400o400o2-spjM5A6VVfVNnQsuwvX3DY.jpg",
    firstname: "Ryan",
    lastname: "Florence",
    username: "@pcattori",
  },
  {
    avatar:
      "https://sessionize.com/image/eec1-400o400o2-HkvWKLFqecmFxLwqR9KMRw.jpg",
    firstname: "Andre",
    lastname: "Landgraf",
    username: "@AndreLandgraf94",
  },
  {
    avatar:
      "https://sessionize.com/image/c73a-400o400o2-4MTaTq6ftC15hqwtqUJmTC.jpg",
    firstname: "Monica",
    lastname: "Powell",
    username: "@indigitalcolor",
  },
  {
    avatar:
      "https://sessionize.com/image/cef7-400o400o2-KBZUydbjfkfGACQmjbHEvX.jpeg",
    firstname: "Brian",
    lastname: "Lee",
    username: "@brian_dlee",
  },
  {
    avatar:
      "https://sessionize.com/image/f83b-400o400o2-Pyw3chmeHMxGsNoj3nQmWU.jpg",
    firstname: "Sean",
    lastname: "McQuaid",
    username: "@SeanMcQuaidCode",
  },
  {
    avatar:
      "https://sessionize.com/image/a9fc-400o400o2-JHBnWZRoxp7QX74Hdac7AZ.jpg",
    firstname: "Shane",
    lastname: "Walker",
    username: "@swalker326",
  },
  {
    avatar:
      "https://sessionize.com/image/6644-400o400o2-aHnGHb5Pdu3D32MbfrnQbj.jpg",
    firstname: "Jon",
    lastname: "Jensen",
    username: "@jenseng",
  },
].forEach((gamer) => {
  fakeGamers.create({
    ...gamer,
    id: `${gamer.firstname.toLowerCase()}-${gamer.lastname.toLocaleLowerCase()}`,
  });
});
