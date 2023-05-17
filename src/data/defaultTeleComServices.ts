import { TeleComService } from "types/telecomunicationService";

const defaultTeleComServices: TeleComService[] = [
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
        value: 49,
      },
      {
        year: 2025,
        value: 59,
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
        value: 59,
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
        value: 29,
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
        value: 29,
      },
    ],
    dependencies: ["tv"],
  },
];
export default defaultTeleComServices;
