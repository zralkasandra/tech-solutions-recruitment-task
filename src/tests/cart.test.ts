import defaultTeleComPackages from "data/defaultTeleComPackages";
import defaultTeleComServices from "data/defaultTeleComServices";
import { getCart } from "helpers/cart";

describe("Getting cart without packages", () => {
  test("Should get a right cart for every year", () => {
    expect(
      getCart(
        defaultTeleComPackages,
        ["tv", "phone"],
        2023,
        defaultTeleComServices
      )
    ).toEqual({ packages: [], services: ["tv", "phone"], free: [], price: 78 });
    expect(
      getCart(
        defaultTeleComPackages,
        ["tv", "phone"],
        2024,
        defaultTeleComServices
      )
    ).toEqual({
      packages: [],
      services: ["tv", "phone"],
      free: [],
      price: 78,
    });
    expect(
      getCart(
        defaultTeleComPackages,
        ["tv", "phone"],
        2025,
        defaultTeleComServices
      )
    ).toEqual({
      packages: [],
      services: ["tv", "phone"],
      free: [],
      price: 88,
    });
  });
});

describe("Getting cart with one package", () => {
  test("Should get a right cart for every year", () => {
    expect(
      getCart(
        defaultTeleComPackages,
        ["tv", "internet"],
        2023,
        defaultTeleComServices
      )
    ).toEqual({ packages: ["package1"], services: [], free: [], price: 79 });
    expect(
      getCart(
        defaultTeleComPackages,
        ["tv", "internet"],
        2024,
        defaultTeleComServices
      )
    ).toEqual({
      packages: ["package1"],
      services: [],
      free: [],
      price: 89,
    });
    expect(
      getCart(
        defaultTeleComPackages,
        ["tv", "internet"],
        2025,
        defaultTeleComServices
      )
    ).toEqual({
      packages: ["package1"],
      services: [],
      free: [],
      price: 99,
    });
  });
});

describe("Getting more profitable package", () => {
  test("Should get a right cart for every year", () => {
    expect(
      getCart(
        defaultTeleComPackages,
        ["tv", "internet", "phone"],
        2023,
        defaultTeleComServices
      )
    ).toEqual({
      packages: ["package1"],
      services: ["phone"],
      free: [],
      price: 108,
    });
    expect(
      getCart(
        defaultTeleComPackages,
        ["tv", "internet", "phone"],
        2024,
        defaultTeleComServices
      )
    ).toEqual({
      packages: ["package2"],
      services: ["tv"],
      free: [],
      price: 113,
    });
    expect(
      getCart(
        defaultTeleComPackages,
        ["tv", "internet", "phone"],
        2025,
        defaultTeleComServices
      )
    ).toEqual({
      packages: ["package2"],
      services: ["tv"],
      free: [],
      price: 123,
    });
  });
});

describe("Getting more profitable package with free decoder", () => {
  test("Should get a right cart for every year", () => {
    expect(
      getCart(
        defaultTeleComPackages,
        ["tv", "internet", "phone", "decoder"],
        2023,
        defaultTeleComServices
      )
    ).toEqual({
      packages: ["package1"],
      services: ["phone"],
      free: ["decoder"],
      price: 108,
    });
    expect(
      getCart(
        defaultTeleComPackages,
        ["tv", "internet", "phone", "decoder"],
        2024,
        defaultTeleComServices
      )
    ).toEqual({
      packages: ["package1"],
      services: ["phone"],
      free: ["decoder"],
      price: 118,
    });
    expect(
      getCart(
        defaultTeleComPackages,
        ["tv", "internet", "phone", "decoder"],
        2025,
        defaultTeleComServices
      )
    ).toEqual({
      packages: ["package1"],
      services: ["phone"],
      free: ["decoder"],
      price: 128,
    });
  });
});
