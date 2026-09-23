export interface Review {
  id: number;
  name: string;
  from?: string;
  date: string;
  text: string;
}

/** All ten Airbnb reviews of the Golf View Suite, quoted word for word. */
export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Mudassir",
    date: "July 2026",
    text: "I highly recommend Aurora Elite Suites for anyone seeking premium accommodation in Greater Noida. The property cultivates a serene and upscale atmosphere, offering an ideal environment for relaxation. Every aspect of the stay was meticulously managed, featuring a seamless check-in and check-out process. The suite was impeccably clean, well-appointed, and fully functional. Its strategic location within Godrej Golf Links provides excellent access to both Pari Chowk and the India Expo Mart. The host demonstrated exceptional professionalism and attentiveness, ensuring a flawless experience from start to finish. I look forward to future stays and will confidently refer colleagues, friends, and family to this exceptional property.",
  },
  {
    id: 2,
    name: "Simran",
    date: "July 2026",
    text: "We had a wonderful stay at Aurora Elite Suites. The apartment was spotless, peaceful, and beautifully maintained, with everything we needed for a comfortable stay. It truly felt like a home away from home.\nThe host was incredibly kind, professional, and always quick to respond whenever we had a question. Their attention to detail and genuine hospitality made our experience even more enjoyable\nI would highly recommend Aurora Elite Suites to anyone travelling with family, friends, or for business. We would be delighted to stay here again.",
  },
  {
    id: 3,
    name: "Shashank",
    date: "July 2026",
    text: "I had an excellent stay at Aurora Elite Suites, Godrej Sector 27, Greater Noida. The suite was exceptionally clean, modern, spacious, and equipped with all the essential amenities for a comfortable stay. The interiors were elegant, the bed was comfortable, and the overall atmosphere was peaceful and relaxing. The host was courteous, responsive, and ensured a smooth check-in and check-out experience. The location is excellent, with easy access to Pari Chowk, India Expo Mart, Jaypee Greens, and other key destinations. I truly enjoyed my stay and would highly recommend Aurora Elite Suites to anyone visiting Greater Noida for business or leisure. Whenever I visit Greater Noida again, this will be my first choice, and I will gladly recommend it to my friends, family, and colleagues. Thank you for the wonderful hospitality.",
  },
  {
    id: 4,
    name: "Manjeet",
    date: "July 2026",
    text: "My stay at Aurora Elite Suites, Godrej Golf Links, Sector 27, Greater Noida was truly enjoyable. The suite was spotless, beautifully designed, and equipped with everything required for a comfortable stay. The peaceful environment and premium amenities made the experience even more relaxing. The host was friendly, professional, and always available to assist whenever needed. The check-in process was smooth, and the overall service exceeded my expectations. Its convenient location near Pari Chowk and India Expo Mart is an added advantage for both business and leisure travelers. I sincerely appreciate the excellent hospitality and would gladly choose Aurora Elite Suites again. I highly recommend this property to anyone looking for a clean, comfortable, and premium stay in Greater Noida.",
  },
  {
    id: 5,
    name: "Ashish",
    from: "Rajkot",
    date: "September 2026",
    text: "Great stay! The location was excellent and very convenient. The flat was clean, comfortable, and well maintained. The host was very friendly, helpful, and responsive throughout our stay. We really enjoyed our experience and would definitely stay here again. Highly recommended!",
  },
  {
    id: 6,
    name: "Anuraga",
    from: "Lucknow",
    date: "September 2026",
    text: "Excellent and peacefully stay at the property, balcony view was perfect.\nHost was very responsive and was avalaible 24*7.",
  },
  {
    id: 7,
    name: "Gaurav",
    date: "July 2026",
    text: "Very good flat and host is welcoming, a great place to stay with good views.",
  },
  {
    id: 8,
    name: "Ahaan Raj",
    date: "July 2026",
    text: "had a great stay, everything was clean and just as described. would definitely come back!",
  },
  {
    id: 9,
    name: "Harpreet",
    from: "Amritsar",
    date: "August 2026",
    text: "Very Good Flat",
  },
  {
    id: 10,
    name: "Vikrant",
    from: "New Delhi",
    date: "September 2026",
    text: "Wonderful",
  },
];

/** Short quotes used in the home page carousel. */
export const REVIEW_HIGHLIGHTS = [
  {
    text: "The apartment was spotless, peaceful, and beautifully maintained, with everything we needed for a comfortable stay. It truly felt like a home away from home.",
    name: "Simran",
    date: "July 2026",
  },
  {
    text: "Excellent and peacefully stay at the property, balcony view was perfect.",
    name: "Anuraga",
    from: "Lucknow",
    date: "September 2026",
  },
  {
    text: "The location was excellent and very convenient. The flat was clean, comfortable, and well maintained.",
    name: "Ashish",
    from: "Rajkot",
    date: "September 2026",
  },
  {
    text: "The suite was exceptionally clean, modern, spacious, and equipped with all the essential amenities for a comfortable stay.",
    name: "Shashank",
    date: "July 2026",
  },
  {
    text: "Its strategic location within Godrej Golf Links provides excellent access to both Pari Chowk and the India Expo Mart.",
    name: "Mudassir",
    date: "July 2026",
  },
  {
    text: "had a great stay, everything was clean and just as described. would definitely come back!",
    name: "Ahaan Raj",
    date: "July 2026",
  },
];

export const RATING = {
  overall: "5.0",
  count: 10,
  fiveStarShare: 100,
  badge: "Airbnb Guest Favourite",
  categories: [
    { label: "Cleanliness", value: 4.9 },
    { label: "Accuracy", value: 5.0 },
    { label: "Check-in", value: 4.9 },
    { label: "Communication", value: 5.0 },
    { label: "Location", value: 4.9 },
    { label: "Value", value: 5.0 },
  ],
  mentions: [
    { label: "Hospitality", count: 7 },
    { label: "Cleanliness", count: 6 },
    { label: "Comfort", count: 4 },
    { label: "Location", count: 4 },
    { label: "Check-in", count: 3 },
    { label: "Amenities", count: 3 },
  ],
};
