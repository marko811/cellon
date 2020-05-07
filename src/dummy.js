export default {
  stylistSchedule: [
    { time: "08:00", active: "Available" },
    { time: "09:00", active: "Booking" },
    { time: "10:00", active: "Taken" },
    { time: "11:00", active: "Taken" },
    { time: "13:00", active: "Available" },
    { time: "14:00", active: "Available" },
    { time: "15:00", active: "Available" },
    { time: "16:00", active: "Taken" },
    { time: "19:00", active: "Taken" },
    { time: "20:00", active: "Available" },
  ],
  bookingHistory: [
    {
      avatar: require("./assets/images/Oval-2x.png"),
      date: "Jan, 5",
    },
    {
      avatar: require("./assets/images/Oval-2x.png"),
      date: "Feb,1",
    },
    {
      avatar: require("./assets/images/Oval-2x.png"),
      date: "Mar, 10",
    },
    {
      avatar: require("./assets/images/Oval-2x.png"),
      date: "Apr, 20",
    },
    {
      avatar: require("./assets/images/Oval-2x.png"),
      date: "May, 11",
    },
    {
      avatar: require("./assets/images/Oval-2x.png"),
      date: "Jun, 23",
    },
  ],
  customreReview: [
    {
      avatar: require("./assets/images/Oval-2x.png"),
      rating: 4.8,
      name: "Charlotte",
      description:
        "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      avatar: require("./assets/images/Oval-2x.png"),
      rating: 4.8,
      name: "Isabella",
      description:
        "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      avatar: require("./assets/images/Oval-2x.png"),
      rating: 4.8,
      name: "Olivia",
      description:
        "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      avatar: require("./assets/images/Oval-2x.png"),
      rating: 4.8,
      name: "Charlotte",
      description:
        "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ],
  orders: [
    {
      type: "order",
      time: "9:00",
      duration: "09:00 - 10:00",
      name: "Lindsey Johnson",
      serviceType: "Cut & Colour",
      paid: "Paid R340",
      avatar: require("./assets/images/Oval-2x.png"),
    },
    {
      type: "order",
      time: "10:00",
      duration: "10:00 - 11:00",
      name: "Lindsey Johnson",
      serviceType: "Cut & Colour",
      paid: "Paid R340",
      avatar: require("./assets/images/Oval-2x.png"),
    },
    {
      type: "order",
      time: "11:00",
      duration: "11:00 - 12:00",
      name: "Lindsey Johnson",
      serviceType: "Cut & Colour",
      paid: "Paid R340",
      avatar: require("./assets/images/Oval-2x.png"),
    },
    {
      type: "lunch",
      time: "12:PM",
      duration: "12:00 - 13:00 PM",
      name: "Lunch Break",
      serviceType: "",
      paid: "",
      avatar: require("./assets/images/clock-circular-outline-2x.png"),
    },
  ],
  stylistList: [
    {
      name: "Nelle Phillips",
      serviceType: "Hair style",
      rating: 4.8,
      jobsDone: 130,
      status: "Availability",
      paid: "Paid R340",
      avatar: require("./assets/images/Oval-2x.png"),
    },
    {
      name: "Nelle Phillips",
      serviceType: "Hair style",
      rating: 4.8,
      jobsDone: 130,
      status: "Availability",
      paid: "Paid R340",
      avatar: require("./assets/images/Oval-2x.png"),
    },
    {
      name: "Nelle Phillips",
      serviceType: "Hair style",
      rating: 4.8,
      jobsDone: 130,
      status: "Availability",
      paid: "Paid R340",
      avatar: require("./assets/images/Oval-2x.png"),
    },
    {
      name: "Nelle Phillips",
      serviceType: "Hair style",
      rating: 4.8,
      jobsDone: 130,
      status: "Availability",
      paid: "Paid R340",
      avatar: require("./assets/images/Oval-2x.png"),
    },
    {
      name: "Nelle Phillips",
      serviceType: "Hair style",
      rating: 4.8,
      jobsDone: 130,
      status: "Availability",
      paid: "Paid R340",
      avatar: require("./assets/images/Oval-2x.png"),
    },
    {
      name: "Nelle Phillips",
      serviceType: "Hair style",
      rating: 4.8,
      jobsDone: 130,
      status: "Availability",
      paid: "Paid R340",
      avatar: require("./assets/images/Oval-2x.png"),
    },
  ],
  locations: {
    myLocation: {
      latitude: -26.195246,
      longitude: 28.034088,
    },
    directions: [
      {
        latitude: -26.195929,
        longitude: 28.02867,
      },
      {
        latitude: -26.169079,
        longitude: 28.046666,
      },
    ],
  },
  myTour: [
    {
      name: "Lindsey Johnson",
      serviceType: "Cut & Colour",
      time: "1h 15min 20s",
      cadence: 95,
      steps: 28,
      avatar: require("./assets/images/Oval-2x.png"),
      locations: [
        {
          latitude: -26.195929,
          longitude: 28.02867,
        },
        {
          latitude: -26.169079,
          longitude: 28.046666,
        },
      ],
    },
    {
      name: "Lindsey Johnson",
      serviceType: "Cut & Colour",
      time: "1h 15min 20s",
      cadence: 96,
      steps: 25,
      avatar: require("./assets/images/Oval-2x.png"),
      locations: [
        {
          latitude: -26.195929,
          longitude: 28.02867,
        },
        {
          latitude: -26.169079,
          longitude: 28.046666,
        },
      ],
    },
    {
      name: "Lindsey Johnson",
      serviceType: "Cut & Colour",
      time: "1h 15min 20s",
      cadence: 109,
      steps: 88,
      avatar: require("./assets/images/Oval-2x.png"),
      locations: [
        {
          latitude: -26.195929,
          longitude: 28.02867,
        },
        {
          latitude: -26.169079,
          longitude: 28.046666,
        },
      ],
    },
    {
      name: "Lindsey Johnson",
      serviceType: "Cut & Colour",
      time: "1h 15min 20s",
      cadence: 133,
      steps: 28,
      avatar: require("./assets/images/Oval-2x.png"),
      locations: [
        {
          latitude: -26.195929,
          longitude: 28.02867,
        },
        {
          latitude: -26.169079,
          longitude: 28.046666,
        },
      ],
    },
  ],
  message: {
    title: "Hello Lindsey Johnson",
    message: "Hi Nelle, where are you now?",
    avatar: require("./assets/images/Oval-2x.png"),
  },
};
