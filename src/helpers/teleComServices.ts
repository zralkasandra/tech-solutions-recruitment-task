import { InputType } from "hooks/useInputGroup";
import {
  WithPrices,
  TeleComService,
  PriceToUpdate,
} from "types/telecomunicationService";
import { getPriceForYear } from "./cart";

export const preparePricesFromFormValues = (servicePricesValue: InputType[]) =>
  servicePricesValue.map((servicePrice) => ({
    id: servicePrice.id,
    price: parseInt(servicePrice.value),
  }));

export const getDefaultPrices = <T extends WithPrices>(
  items: T[],
  year: number
) => items.map((item) => getPriceForYear(item, year).toString());

export const getDependenciesNames = (
  dependencies: string[],
  allTeleComServices: TeleComService[]
) => {
  return dependencies
    .map(
      (dependency) =>
        allTeleComServices.find((tcService) => tcService.id === dependency)!
          .name
    )
    .join(", ");
};

export const updatePrices = <T extends WithPrices>(
  items: T[],
  prices: PriceToUpdate[],
  year: number
) => {
  const filteredItems = items.map((itemWithPrice) => {
    const filteredPrices = itemWithPrice.prices.filter(
      (price) => price.year !== year
    );
    itemWithPrice.prices = filteredPrices;
    return itemWithPrice;
  });
  const updatedItems = prices.map((price) => {
    let itemToUpdate = filteredItems.find((item) => item.id === price.id)!;
    itemToUpdate.prices!.push({
      value: price.price,
      year: year,
    });
    return itemToUpdate;
  });
  return updatedItems;
};

export const addTeleComServiceToCart = (
  teleComService: TeleComService,
  selectedServices: string[],
  allServices: TeleComService[]
) => {
  const result = {
    error: "",
    selectedServices: selectedServices,
  };
  if (
    teleComService.dependencies &&
    !teleComService.dependencies.every((dependency: string) =>
      selectedServices.includes(dependency)
    )
  ) {
    result.error = `Nie możesz zakupić usługi "${
      teleComService.name
    }" bez następujących usług: ${getDependenciesNames(
      teleComService.dependencies,
      allServices
    )}`;
  } else {
    result.selectedServices = [...selectedServices, teleComService.id];
  }
  return result;
};

export const removeTeleComServiceFromCart = (
  teleComService: TeleComService,
  selectedServices: string[],
  allServices: TeleComService[]
) => {
  const result = {
    error: "",
    selectedServices: selectedServices,
  };
  const currentServices = allServices.filter((teleComService) =>
    selectedServices.includes(teleComService.id)
  );
  const packageDependencies = currentServices.filter((teleComPackage) =>
    teleComPackage.dependencies?.includes(teleComService.id)
  );

  if (packageDependencies.length) {
    result.error = `Najpierw usuń: ${packageDependencies
      .map((dep) => dep.name)
      .join(", ")}`;
  } else {
    result.selectedServices = selectedServices.filter(
      (tcService) => tcService !== teleComService.id
    );
  }

  return result;
};
