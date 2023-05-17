import { TeleComPackage } from "types/telecomunicationService";

const defaultTeleComPackages: TeleComPackage[] = [
  {
    id: "package1",
    items: ["internet", "tv"],
    name: "Internet + Telewizja",
    prices: [
      {
        year: 2023,
        value: 79,
      },
      {
        year: 2024,
        value: 89,
      },
      {
        year: 2025,
        value: 99,
      },
    ],
    free: ["decoder"],
  },
  {
    id: "package2",
    items: ["internet", "phone"],
    name: "Internet + Abonament telefoniczny",
    prices: [
      {
        year: 2023,
        value: 64,
      },
      {
        year: 2024,
        value: 64,
      },
      {
        year: 2025,
        value: 64,
      },
    ],
  },
];

export default defaultTeleComPackages;
