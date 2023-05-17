export const unavailableServices = [
  {
    id: "internet",
    name: "Internet",
    icon: require("img/services/internet.png"),
    prices: [
      {
        year: 2023,
        value: 39,
      },
      {
        year: 2024,
        value: -1,
      },
      {
        year: 2025,
        value: -1,
      },
    ],
  },
  {
    id: "tv",
    name: "Telewizja",
    icon: require("img/services/tv.png"),
    prices: [
      {
        year: 2023,
        value: 49,
      },
      {
        year: 2024,
        value: 49,
      },
      {
        year: 2025,
        value: -1,
      },
    ],
  },
  {
    id: "phone",
    name: "Abonament telefoniczny",
    icon: require("img/services/phone.png"),
    prices: [
      {
        year: 2023,
        value: 29,
      },
      {
        year: 2024,
        value: 29,
      },
      {
        year: 2025,
        value: -1,
      },
    ],
  },
  {
    id: "decoder",
    name: "Dekoder 4K",
    icon: require("img/services/decoder.png"),
    prices: [
      {
        year: 2023,
        value: 29,
      },
      {
        year: 2024,
        value: 29,
      },
      {
        year: 2025,
        value: -1,
      },
    ],
    dependencies: ["tv"],
  },
];
