export interface Distance {
  name: string;
  km: number;
  kmLabel: string;
  time: string;
  category: "transit" | "shopping" | "health" | "business" | "education" | "leisure" | "airport" | "daytrip";
}

export const LOCATION_PAGE = {
  seo: {
    title: "Location | Aurora Elite Suites near Pari Chowk, Greater Noida",
    description:
      "Godrej Golf Links, Sector 27, Greater Noida: 2 km from Delta 1 Metro, 4 km from Pari Chowk, 6 km from India Expo Mart and 43 km from Noida International Airport.",
  },
  h1: "Our Location",
  subheading: "Godrej Golf Links, Sector 27, near Pari Chowk, Greater Noida",
  bannerImageId: "GV-VIEW-06",
  intro:
    "Aurora Elite Suites is inside Godrej Golf Links, a gated township by Godrej Properties in Sector 27, near Pari Chowk. The township is built around a 9-hole golf course and sits opposite the Jaypee Greens golf resort, so there's green in almost every direction. Step outside the gate and you're a few minutes from Pari Chowk, the Noida-Greater Noida Expressway and the Yamuna Expressway.",
  introImageIds: ["GV-SOC-03", "GV-SOC-08"],
  mapNote: "The exact tower and flat details are shared once your booking is confirmed.",
};

export const DISTANCES: Distance[] = [
  { name: "Delta 1 Metro Station (Aqua Line)", km: 1.8, kmLabel: "1.8 km", time: "5 min", category: "transit" },
  { name: "The Grand Venice Mall", km: 3.2, kmLabel: "3.2 km", time: "8 to 10 min", category: "shopping" },
  { name: "Pari Chowk", km: 3.7, kmLabel: "3.7 km", time: "8 to 10 min", category: "shopping" },
  { name: "Kailash Hospital, Greater Noida", km: 3.8, kmLabel: "3.8 km", time: "10 min", category: "health" },
  { name: "Pari Chowk Metro Station", km: 4, kmLabel: "4 km", time: "10 min", category: "transit" },
  { name: "Knowledge Park II Metro Station", km: 5.6, kmLabel: "5.6 km", time: "12 min", category: "transit" },
  { name: "India Expo Centre & Mart", km: 6, kmLabel: "6 km", time: "12 to 15 min", category: "business" },
  { name: "Sharda University and Sharda Hospital", km: 7.7, kmLabel: "7.7 km", time: "15 to 20 min", category: "education" },
  { name: "Gautam Buddha University", km: 9, kmLabel: "9 km", time: "15 to 20 min", category: "education" },
  { name: "Surajpur Wetland (bird sanctuary)", km: 11, kmLabel: "11 km", time: "20 to 25 min", category: "leisure" },
  { name: "Buddh International Circuit", km: 20, kmLabel: "20 km", time: "25 to 30 min", category: "leisure" },
  { name: "DLF Mall of India, Noida", km: 30, kmLabel: "30 km", time: "40 to 45 min", category: "shopping" },
  { name: "Akshardham, Delhi", km: 36, kmLabel: "36 km", time: "50 to 60 min", category: "daytrip" },
  { name: "India Gate, New Delhi", km: 41, kmLabel: "41 km", time: "60 to 75 min", category: "daytrip" },
  { name: "Noida International Airport (Jewar)", km: 43, kmLabel: "43 km", time: "45 to 50 min", category: "airport" },
  { name: "Indira Gandhi International Airport, Delhi", km: 57, kmLabel: "57 km", time: "75 to 90 min", category: "airport" },
  { name: "Prem Mandir, Vrindavan", km: 137, kmLabel: "137 km", time: "2 to 2.5 hours", category: "daytrip" },
  { name: "Taj Mahal, Agra", km: 178, kmLabel: "178 km", time: "about 3 hours", category: "daytrip" },
];

export const GETTING_HERE = [
  {
    mode: "By metro",
    text: "Delta 1 station on the Noida Metro Aqua Line is about 2 km from the suites. The Aqua Line runs to Noida Sector 51, where a walkway links it to Noida Sector 52 on the Delhi Metro Blue Line for Noida City Centre and Delhi.",
    imageId: "EXT-14",
  },
  {
    mode: "By road",
    text: "The Noida-Greater Noida Expressway takes you to Noida and on to Delhi. The Yamuna Expressway runs south to Noida International Airport, Mathura, Vrindavan and Agra.",
    imageId: "EXT-13",
  },
  {
    mode: "By air",
    text: "Noida International Airport (Jewar) opened for commercial flights on 15 June 2026 and is about 45 minutes away. Delhi's IGI Airport is 75 to 90 minutes by road, depending on traffic.",
    imageId: "EXT-03",
  },
];

export interface NearbyPlace {
  id: string;
  title: string;
  text: string;
  distance: string;
  imageIds: string[];
  dayTrip?: boolean;
}

export const NEARBY: NearbyPlace[] = [
  {
    id: "expo",
    title: "India Expo Centre & Mart",
    text: "Greater Noida's big exhibition venue in Knowledge Park II, with trade fairs and shows through the year.",
    distance: "About 6 km, 12 to 15 minutes",
    imageIds: ["GV-LOC-01"],
  },
  {
    id: "pari-chowk",
    title: "Pari Chowk and The Grand Venice Mall",
    text: "Pari Chowk is Greater Noida's best-known junction, with malls and restaurants around it. The Grand Venice Mall nearby has around 250 stores, a cinema and gondola rides along its canals.",
    distance: "About 3 to 4 km",
    imageIds: ["EXT-12"],
  },
  {
    id: "bic",
    title: "Buddh International Circuit",
    text: "The circuit that hosted India's Formula One Grand Prix and MotoGP races, now used for motorsport events and track days.",
    distance: "About 20 km",
    imageIds: ["EXT-01", "EXT-02"],
  },
  {
    id: "surajpur",
    title: "Surajpur Wetland",
    text: "A protected wetland and bird sanctuary. Winter brings migratory birds like bar-headed geese, and black-necked storks are often seen over the marshes.",
    distance: "About 20 to 25 minutes away",
    imageIds: ["EXT-17", "EXT-18", "EXT-19", "EXT-20"],
  },
  {
    id: "knowledge-park",
    title: "Knowledge Park and the universities",
    text: "Greater Noida's education hub, home to Sharda University and several engineering and management colleges. Gautam Buddha University's 511-acre campus is about 9 km away.",
    distance: "About 8 to 9 km",
    imageIds: ["EXT-15", "EXT-16"],
  },
  {
    id: "greater-noida",
    title: "Greater Noida",
    text: "A planned city with wide roads, big green parks and a calmer pace than Delhi.",
    distance: "All around you",
    imageIds: ["EXT-11"],
  },
  {
    id: "dlf",
    title: "DLF Mall of India, Noida",
    text: "One of India's largest malls, in Noida Sector 18.",
    distance: "About 40 to 45 minutes by road",
    imageIds: ["EXT-23", "EXT-24", "EXT-25"],
  },
  {
    id: "taj",
    title: "Taj Mahal, Agra",
    text: "About three hours down the Yamuna Expressway. Leave early, see the Taj in the morning light and be back for dinner.",
    distance: "178 km, about 3 hours",
    imageIds: ["EXT-05", "EXT-06", "EXT-07", "EXT-04"],
    dayTrip: true,
  },
  {
    id: "prem-mandir",
    title: "Prem Mandir, Vrindavan",
    text: "A white marble temple known for its evening lights, about 2 to 2.5 hours away by the Yamuna Expressway.",
    distance: "137 km, 2 to 2.5 hours",
    imageIds: ["EXT-21", "EXT-22"],
    dayTrip: true,
  },
  {
    id: "delhi",
    title: "India Gate and Akshardham, Delhi",
    text: "Delhi's landmarks are about an hour away by road, or take the metro from Delta 1.",
    distance: "36 to 41 km, about an hour",
    imageIds: ["EXT-08", "EXT-09", "EXT-10"],
    dayTrip: true,
  },
];

export const DISTANCE_CHIPS = [
  { label: "Delta 1 Metro", value: "2 km" },
  { label: "Grand Venice Mall", value: "3 km" },
  { label: "Pari Chowk", value: "4 km" },
  { label: "India Expo Mart", value: "6 km" },
  { label: "Buddh International Circuit", value: "20 km" },
  { label: "Noida International Airport", value: "43 km" },
];
