import {
  Price,
  TeleComPackage,
  TeleComService,
  WithPrices,
  Cart,
} from "types/telecomunicationService";

export const getPriceForYear = (item: WithPrices, year: number) =>
  item.prices.find((price: Price) => price.year === year)!.value;

export const removeUnavailableServices = (
  selectedServices: string[],
  allServices: TeleComService[],
  year: number
) =>
  selectedServices.filter(
    (tcServiceId) =>
      getPriceForYear(
        allServices.find((tcService) => tcService.id === tcServiceId)!,
        year
      ) !== -1
  );

export const getMatchingPackages = (
  teleComPackages: TeleComPackage[],
  selectedServicesIds: string[]
) =>
  teleComPackages.filter((teleComPackage) =>
    teleComPackage.items.every((teleComServiceId) =>
      selectedServicesIds.includes(teleComServiceId)
    )
  );

export const getNoPackageServices = (
  teleComPackage: TeleComPackage,
  selectedServices: string[]
) =>
  selectedServices.filter((service) => !teleComPackage.items.includes(service));

export const filterOutFreeServices = (
  teleComServices: string[],
  teleComPackage: TeleComPackage
) =>
  teleComServices.filter(
    (teleComService) => !teleComPackage?.free?.includes(teleComService)
  );

export const countPricesForIds = (
  chosenTeleComServices: string[],
  allServices: TeleComService[],
  year: number
) =>
  chosenTeleComServices
    .map(
      (teleComServiceId) =>
        allServices.find(
          (teleComService) => teleComService.id === teleComServiceId
        )!
    )
    .reduce((acc, curr) => acc + getPriceForYear(curr, year), 0);

export const getCart = (
  allPackages: TeleComPackage[],
  selectedServices: string[],
  year: number,
  allServices: TeleComService[]
) => {
  const carts: Cart[] = [];

  selectedServices = removeUnavailableServices(
    selectedServices,
    allServices,
    year
  );

  const matchingPackages: TeleComPackage[] = getMatchingPackages(
    allPackages,
    selectedServices
  );

  if (matchingPackages.length !== 0) {
    matchingPackages.forEach((matchingPackage) => {
      let price = getPriceForYear(matchingPackage, year);
      let cart: Cart = {
        packages: [],
        services: [],
        free: [],
        price: price,
      };
      cart.packages.push(matchingPackage.id);

      const remainingServices = getNoPackageServices(
        matchingPackage,
        selectedServices
      );

      const removedFreeObjects = filterOutFreeServices(
        remainingServices,
        matchingPackage
      );

      cart.free.push(
        ...remainingServices.filter(
          (tcService) => !removedFreeObjects.includes(tcService)
        )
      );

      cart.price += countPricesForIds(removedFreeObjects, allServices, year);

      cart.services.push(...removedFreeObjects);
      carts.push(cart);
    });
  } else {
    const price = countPricesForIds(selectedServices, allServices, year);
    carts.push({ services: selectedServices, price, packages: [], free: [] });
  }

  const sortedCarts = carts.sort((a, b) => a.price - b.price);
  return sortedCarts[0];
};
