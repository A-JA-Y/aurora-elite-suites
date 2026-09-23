/**
 * Tiny BM25 retriever over the knowledge base. No external services needed,
 * so the assistant stays grounded in site content even before an LLM key exists.
 */
import { KNOWLEDGE, type Chunk } from "./knowledge";

const STOP = new Set(
  "a an the and or of to in on at for with is are be been do does did it its this that these those i you we they my our your me us can could would should will may might there here what which who whom how when where why from by as about into than then also any some just very much more most please tell know like want need get have has had".split(
    " ",
  ),
);

const SYNONYMS: Record<string, string[]> = {
  wifi: ["wi-fi", "internet", "wireless"],
  internet: ["wi-fi", "wifi"],
  price: ["rate", "tariff", "cost", "rates"],
  prices: ["rate", "tariff", "cost", "rates"],
  cost: ["rate", "tariff", "price"],
  rate: ["tariff", "price", "rates"],
  rent: ["rate", "tariff", "price"],
  cheap: ["rate", "tariff", "price"],
  expensive: ["rate", "tariff", "price"],
  pool: ["swimming"],
  swim: ["swimming", "pool"],
  gym: ["exercise", "open-air", "equipment"],
  car: ["parking"],
  park: ["parking"],
  airport: ["jewar", "igi", "noida international"],
  flight: ["airport"],
  metro: ["station", "aqua", "delta"],
  train: ["metro", "station"],
  expo: ["mart", "exhibition", "india expo"],
  exhibition: ["expo", "mart"],
  kids: ["children", "family"],
  child: ["children", "family"],
  children: ["kids", "play"],
  laundry: ["washing", "machine"],
  wash: ["washing", "machine"],
  dog: ["pets", "pet"],
  cat: ["pets", "pet"],
  pet: ["pets"],
  pets: ["pet"],
  checkin: ["check-in"],
  checkout: ["check-out"],
  arrive: ["check-in"],
  arrival: ["check-in"],
  leave: ["check-out"],
  late: ["check-out", "check-in"],
  early: ["check-in"],
  cook: ["kitchen", "cooking"],
  cooking: ["kitchen", "hob", "induction"],
  food: ["kitchen", "cooking", "dinner"],
  restaurant: ["dinner", "pari chowk", "mall"],
  eat: ["kitchen", "dinner"],
  breakfast: ["kitchen", "cooking"],
  bed: ["beds", "bedroom"],
  beds: ["bed", "bedroom"],
  bedroom: ["bed", "beds"],
  sleep: ["beds", "bedroom"],
  bathroom: ["bathrooms", "shower"],
  toilet: ["bathroom", "wc"],
  shower: ["bathroom", "rain"],
  hot: ["geyser", "hot water"],
  ac: ["air conditioning"],
  aircon: ["air conditioning"],
  television: ["tv"],
  work: ["workspace", "desk", "wi-fi"],
  office: ["workspace", "desk"],
  desk: ["workspace"],
  view: ["views", "balcony", "golf course"],
  views: ["view", "balcony"],
  balcony: ["view", "views"],
  safe: ["safety", "security", "cctv"],
  security: ["safety", "cctv", "gated"],
  camera: ["cctv"],
  smoke: ["smoking"],
  smoking: ["smoke", "vaping"],
  party: ["parties", "events"],
  parties: ["party", "events"],
  guests: ["guest", "people", "occupancy"],
  people: ["guests", "occupancy"],
  persons: ["guests", "occupancy"],
  far: ["distance", "km", "minutes"],
  distance: ["km", "far", "minutes"],
  near: ["nearby", "distance", "km"],
  nearby: ["near", "distance", "attractions"],
  close: ["near", "distance", "km"],
  hospital: ["kailash", "sharda", "medical"],
  doctor: ["hospital", "medical"],
  university: ["sharda", "gautam buddha", "knowledge park"],
  college: ["university", "knowledge park"],
  mall: ["grand venice", "dlf", "shopping"],
  shopping: ["mall", "grand venice"],
  taj: ["agra", "day trip"],
  agra: ["taj", "day trip"],
  delhi: ["india gate", "akshardham"],
  cancel: ["cancellation"],
  cancellation: ["cancel", "policy"],
  refund: ["cancellation", "policy"],
  id: ["identity", "aadhaar", "passport"],
  passport: ["id", "identity"],
  aadhaar: ["id", "identity"],
  monthly: ["long stays", "weekly", "month"],
  weekly: ["long stays", "monthly", "week"],
  month: ["long stays", "monthly"],
  week: ["long stays", "weekly"],
  long: ["long stays", "weekly", "monthly"],
  address: ["located", "tower", "sector 27"],
  location: ["located", "where", "sector 27"],
  where: ["location", "located", "address"],
  contact: ["phone", "whatsapp", "email"],
  phone: ["call", "whatsapp", "number"],
  call: ["phone", "number"],
  number: ["phone", "whatsapp"],
  whatsapp: ["phone", "message"],
  email: ["mail", "contact"],
  host: ["team", "response", "hospitality"],
  clean: ["cleanliness", "cleaned", "spotless"],
  cleaning: ["cleaned", "cleanliness"],
  review: ["reviews", "rating", "guests say"],
  reviews: ["review", "rating"],
  rating: ["reviews", "stars"],
  photos: ["gallery", "pictures", "images"],
  pictures: ["gallery", "photos"],
  images: ["gallery", "photos"],
  golf: ["golf course", "fairways", "greens"],
  difference: ["compare", "comparison", "both suites"],
  compare: ["comparison", "difference"],
  which: ["compare", "comparison"],
  best: ["compare", "comparison", "recommend"],
  recommend: ["compare", "comparison"],
  business: ["work", "business travellers", "knowledge park"],
  wedding: ["families", "family"],
  family: ["families", "children", "kids"],
  families: ["family", "children"],
  student: ["students", "university"],
  students: ["student", "university"],
  photoshoot: ["commercial photography", "shoot"],
  shoot: ["commercial photography", "photoshoot"],
  visitor: ["visitors", "guests"],
  visitors: ["visitor", "registered guests"],
  noise: ["quiet hours", "decibel"],
  quiet: ["quiet hours", "noise"],
  fire: ["fire extinguisher", "smoke alarm", "safety"],
  key: ["keys", "access card"],
  keys: ["key", "access card"],
  towel: ["towels", "toiletries"],
  towels: ["towel", "toiletries"],
  linen: ["bedding", "towels"],
  heater: ["heating", "geyser"],
  heating: ["heater", "warm"],
  chimney: ["kitchen", "hob"],
  fridge: ["refrigerator"],
  refrigerator: ["fridge"],
  microwave: ["kitchen"],
  lift: ["lifts", "elevator"],
  elevator: ["lift", "lifts"],
  stairs: ["lift", "lifts"],
  floor: ["tower", "high above"],
  cab: ["taxi", "app cabs"],
  taxi: ["cab", "app cabs"],
  uber: ["cab", "app cabs"],
  ola: ["cab", "app cabs"],
};

export function tokenize(text: string): string[] {
  const raw = text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\-\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const out: string[] = [];
  for (let t of raw) {
    if (t.length > 4 && t.endsWith("s") && !t.endsWith("ss")) t = t.slice(0, -1);
    if (t.length < 2 || STOP.has(t)) continue;
    out.push(t);
    // keep hyphenated pieces too: "check-in" -> "check", "in"
    if (t.includes("-")) out.push(...t.split("-").filter((p) => p.length > 1 && !STOP.has(p)));
  }
  return out;
}

function expand(tokens: string[]): string[] {
  const out = [...tokens];
  for (const t of tokens) {
    const syn = SYNONYMS[t] ?? SYNONYMS[`${t}s`];
    if (syn) for (const s of syn) out.push(...tokenize(s));
  }
  return out;
}

interface Doc {
  chunk: Chunk;
  tf: Map<string, number>;
  len: number;
}

class BM25 {
  private docs: Doc[] = [];
  private df = new Map<string, number>();
  private avgLen = 1;
  private k1 = 1.4;
  private b = 0.75;

  constructor(chunks: Chunk[]) {
    for (const chunk of chunks) {
      // Title and tags count extra, they are the "gist" of the chunk.
      const tokens = [...tokenize(chunk.title), ...tokenize(chunk.title), ...tokenize(chunk.tags ?? ""), ...tokenize(chunk.text)];
      const tf = new Map<string, number>();
      for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
      for (const t of tf.keys()) this.df.set(t, (this.df.get(t) ?? 0) + 1);
      this.docs.push({ chunk, tf, len: tokens.length });
    }
    this.avgLen = this.docs.reduce((a, d) => a + d.len, 0) / Math.max(1, this.docs.length);
  }

  search(query: string, k = 6): { chunk: Chunk; score: number }[] {
    const qTokens = expand(tokenize(query));
    if (qTokens.length === 0) return [];
    const N = this.docs.length;
    const scored = this.docs.map((d) => {
      let score = 0;
      for (const t of new Set(qTokens)) {
        const f = d.tf.get(t);
        if (!f) continue;
        const n = this.df.get(t) ?? 0;
        const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
        score += idf * ((f * (this.k1 + 1)) / (f + this.k1 * (1 - this.b + (this.b * d.len) / this.avgLen)));
      }
      return { chunk: d.chunk, score: score * (d.chunk.boost ?? 1) };
    });
    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, k);
  }
}

let index: BM25 | null = null;

export function retrieve(query: string, k = 6) {
  if (!index) index = new BM25(KNOWLEDGE);
  return index.search(query, k);
}

/** Plain-language answer built from retrieval alone (used when no LLM key is configured). */
export function fallbackAnswer(query: string): string {
  const results = retrieve(query, 3);
  const whatsapp = "https://wa.me/919999700602";
  if (results.length === 0 || results[0].score < 1.5) {
    return `I don't have that detail on the website yet. The team can answer it quickly on WhatsApp at [+91 99997 00602](${whatsapp}) or by email at bookings@auroraelitesuits.com, usually within the hour.`;
  }
  const top = results[0].chunk;
  if (top.id.startsWith("faq-")) {
    const answer = top.text.replace(/^Q:[\s\S]*?A:\s*/, "");
    return `${answer}\n\nMore on this: [${top.title}](${top.url})`;
  }
  const extra = results
    .slice(1)
    .filter((r) => r.score > 1.5)
    .map((r) => `- [${r.chunk.title}](${r.chunk.url})`)
    .join("\n");
  return `**${top.title}**\n\n${top.text}${extra ? `\n\nYou may also find these useful:\n${extra}` : ""}\n\nFor availability and today's rate, WhatsApp the team at [+91 99997 00602](${whatsapp}).`;
}
