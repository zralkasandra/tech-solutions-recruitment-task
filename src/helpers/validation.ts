import { InputType } from "hooks/useInputGroup";
import { TeleComPackage } from "types/telecomunicationService";
interface WithName {
  name: string;
}

export const isNotEmpty = (value: string) => value.trim() !== "";

export const isUniqueName = (name: string, objectsWithNames: WithName[]) =>
  !objectsWithNames.find(
    (obj: WithName) =>
      obj.name.trim().toLowerCase() === name.trim().toLowerCase()
  );

export const isUniqueYear = (year: number, years: number[]) =>
  !years.includes(year);

export const validatePrice = (value: number) => {
  if (value < -1) {
    return "Cena usługi nie może być ujemna";
  }
  if (value === 0) {
    return "Cena usługi nie może wynosić zero - jeżeli usługa ma być niedostępna w danym roku wpisz -1";
  }
  return "";
};

export const validatePackage = (value: number) => {
  if (value <= 0) {
    return "Cena pakietu musi być większa od 0";
  }
  return "";
};

export const validatePackageProfitability = (
  packagePricesValue: InputType[],
  allPackages: TeleComPackage[],
  servicePricesValue: InputType[]
) => {
  const errors: string[] = [];
  packagePricesValue.forEach((packageValue) => {
    const tcPackage = allPackages.find((pack) => pack.id === packageValue.id)!;
    const priceSum = tcPackage.items
      .map(
        (teleComServiceId) =>
          servicePricesValue.find(
            (teleComService) => teleComService.id === teleComServiceId
          )!
      )
      .reduce((acc, curr) => acc + parseInt(curr.value), 0);

    if (priceSum <= parseInt(packageValue.value)) {
      errors.push(
        `Cena pakietu ${tcPackage.name} nie jest niższa niż suma cen usług w pakiecie!`
      );
    }
  });
  return errors;
};
