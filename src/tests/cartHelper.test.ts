import { describe, expect, test } from "@jest/globals";

import {
  getPriceForYear,
  removeUnavailableServices,
  getMatchingPackages,
  getNoPackageServices,
  filterOutFreeServices,
  countPricesForIds,
} from "helpers/cart";
import defaultTeleComServices from "data/defaultTeleComServices";
import defaultTeleComPackages from "data/defaultTeleComPackages";
import { TeleComService } from "types/telecomunicationService";
import { unavailableServices } from "./cartHelpers.mock";

let cases: any;

cases = [
  [defaultTeleComServices[0], 2023, 39],
  [defaultTeleComServices[0], 2024, 49],
  [defaultTeleComServices[0], 2025, 59],
  [defaultTeleComPackages[0], 2023, 79],
  [defaultTeleComPackages[0], 2024, 89],
  [defaultTeleComPackages[0], 2025, 99],
];
describe("Getting prices", () => {
  test.each(cases)(
    "given %p and %p as argument should return %p",
    (firstArg, secondArg, expectedResult) => {
      const result = getPriceForYear(firstArg, secondArg);
      expect(result).toBe(expectedResult);
    }
  );
});

describe("Removing service if is unavailable", () => {
  let selectedServices: string[] = [];
  let allServices: TeleComService[] = [];
  beforeAll(() => {
    selectedServices = ["internet", "tv", "phone", "decoder"];
    allServices = unavailableServices;
  });

  test("Shouldn't remove any services for 2023", () => {
    expect(
      removeUnavailableServices(selectedServices, allServices, 2023).length
    ).toBe(defaultTeleComServices.length);
  });

  test("Should remove internet for 2024", () => {
    let remainingServices = removeUnavailableServices(
      selectedServices,
      allServices,
      2024
    );

    expect(remainingServices.length).toBe(selectedServices.length - 1);
  });

  test("Should remove all services for 2025", () => {
    let remainingServices = removeUnavailableServices(
      selectedServices,
      allServices,
      2025
    );

    expect(remainingServices.length).toBe(0);
  });
});
cases = [
  [["internet", "tv"], "package1"],
  [["internet", "phone"], "package2"],
];
describe("Returning matching packages", () => {
  test.each(cases)(
    "given %p as argument should return %p",
    (firstArg, expectedResult) => {
      const result = getMatchingPackages(defaultTeleComPackages, firstArg);
      expect(result[0].id).toEqual(expectedResult);
      expect(result.length).toBe(1);
    }
  );
});

cases = [
  [["internet", "decoder"], []],
  [["tv", "phone"], []],
  [["internet"], []],
  [["tv"], []],
];
describe("Returning no matching packages for unpackagable values", () => {
  test.each(cases)(
    "given %p as argument should return %p",
    (firstArg, expectedResult) => {
      const result = getMatchingPackages(defaultTeleComPackages, firstArg);
      expect(result.length).toBe(expectedResult.length);
    }
  );
});

cases = [
  [
    defaultTeleComPackages[0],
    ["internet", "tv", "decoder", "phone"],
    ["decoder", "phone"],
  ],
  [defaultTeleComPackages[0], ["internet", "tv", "phone"], ["phone"]],
  [defaultTeleComPackages[0], ["internet", "tv"], []],
  [defaultTeleComPackages[1], ["internet", "phone"], []],
];
describe("Filter out services in packages", () => {
  test.each(cases)(
    "given %p and %p as arguments, returns %p",
    (firstArg, secondArg, expectedResult) => {
      const result = getNoPackageServices(firstArg, secondArg);
      expect(result).toEqual(expectedResult);
    }
  );
});

cases = [
  [["decoder", "phone"], defaultTeleComPackages[0], ["phone"]],
  [["decoder"], defaultTeleComPackages[0], []],
  [["decoder", "phone"], defaultTeleComPackages[1], ["decoder", "phone"]],
  [["decoder"], defaultTeleComPackages[1], ["decoder"]],
];
describe("Filter out free services", () => {
  test.each(cases)(
    "given %p and %p as arguments, returns %p",
    (firstArg, secondArg, expectedResult) => {
      const result = filterOutFreeServices(firstArg, secondArg);
      expect(result).toEqual(expectedResult);
    }
  );
});

cases = [
  [[], defaultTeleComServices, 2023, 0],
  [[], defaultTeleComServices, 2024, 0],
  [[], defaultTeleComServices, 2025, 0],
  [["internet"], defaultTeleComServices, 2023, 39],
  [["tv"], defaultTeleComServices, 2024, 49],
  [["phone"], defaultTeleComServices, 2025, 29],
  [["internet", "tv"], defaultTeleComServices, 2023, 88],
  [["internet", "tv", "phone"], defaultTeleComServices, 2023, 117],
  [["internet", "tv", "phone", "decoder"], defaultTeleComServices, 2023, 146],
];

describe("Counting prices for services", () => {
  test.each(cases)(
    "given %p and %p and %p as arguments, returns %p",
    (firstArg, secondArg, thirdArg, expectedResult) => {
      const result = countPricesForIds(firstArg, secondArg, thirdArg);
      expect(result).toEqual(expectedResult);
    }
  );
});
