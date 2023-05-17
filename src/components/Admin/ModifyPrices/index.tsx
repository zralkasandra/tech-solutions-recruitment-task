import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Selector } from "./styled";
import { Field, FieldGroup } from "styled";
import {
  validatePrice,
  validatePackage,
  validatePackageProfitability,
} from "helpers/validation";
import useInputGroup from "hooks/useInputGroup";
import {
  selectTeleComPackages,
  selectTeleComServices,
  updateTeleComPackagePrices,
  updateTeleComServicePrices,
} from "features/teleComServicesSlice";
import Label from "components/FormControls/Label";
import { selectYears } from "features/yearsSlice";
import Button from "components/UI/Button";
import {
  getDefaultPrices,
  preparePricesFromFormValues,
} from "helpers/teleComServices";
import PricesFields from "../PricesFields";

const ModifyPrices: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [packagePriceError, setPackagePriceError] = useState("");
  const allServices = useSelector(selectTeleComServices);
  const allPackages = useSelector(selectTeleComPackages);
  const years = useSelector(selectYears);
  const dispatch = useDispatch();
  const [activeYear, setActiveYear] = useState("2023");

  const {
    values: servicePricesValue,
    isValid: servicePricesAreValid,
    valueChangeHandler: servicePricesChangeHandler,
    inputBlurHandler: servicePricesBlurHandler,
    reset: resetServicePrices,
    updateDefaultData: updateServicesDefaultData,
  } = useInputGroup(
    allServices.map((tcService) => tcService.id),
    validatePrice,
    getDefaultPrices(allServices, parseInt(activeYear))
  );
  const {
    values: packagePricesValue,
    isValid: packagePricesAreValid,
    valueChangeHandler: packagePricesChangeHandler,
    inputBlurHandler: packagePricesBlurHandler,
    reset: resetPackagePrices,
    updateDefaultData: updatePackagesDefaultData,
  } = useInputGroup(
    allPackages.map((tcPackage) => tcPackage.id),
    validatePackage,
    getDefaultPrices(allPackages, parseInt(activeYear))
  );

  const changeYear = (e: React.FormEvent<HTMLSelectElement>) => {
    const year = (e.target as HTMLSelectElement).value;
    setActiveYear(year);
    updateServicesDefaultData(getDefaultPrices(allServices, parseInt(year)));
    updatePackagesDefaultData(getDefaultPrices(allPackages, parseInt(year)));
  };

  const modifyPrices = () => {
    const errors = validatePackageProfitability(
      packagePricesValue,
      allPackages,
      servicePricesValue
    );
    setPackagePriceError(errors.join(". "));

    if (servicePricesAreValid && packagePricesAreValid && !errors.length) {
      dispatch(
        updateTeleComServicePrices({
          year: parseInt(activeYear),
          prices: preparePricesFromFormValues(servicePricesValue),
        })
      );
      dispatch(
        updateTeleComPackagePrices({
          year: parseInt(activeYear),
          prices: preparePricesFromFormValues(packagePricesValue),
        })
      );

      resetServicePrices();
      resetPackagePrices();
      onSuccess();
    }
  };

  const formIsValid = servicePricesAreValid && packagePricesAreValid;

  return (
    <Container>
      <h1>Modyfikuj ceny</h1>
      <FieldGroup>
        <Field>
          <Label name="Wybierz rok" />
          <Selector onChange={changeYear} value={activeYear}>
            {years.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </Selector>
        </Field>
      </FieldGroup>
      <PricesFields
        year={activeYear}
        packagePriceError={packagePriceError}
        servicePricesValue={servicePricesValue}
        servicePricesChangeHandler={servicePricesChangeHandler}
        servicePricesBlurHandler={servicePricesBlurHandler}
        packagePricesValue={packagePricesValue}
        packagePricesChangeHandler={packagePricesChangeHandler}
        packagePricesBlurHandler={packagePricesBlurHandler}
      />
      <Button
        onClick={modifyPrices}
        label="Modyfikuj ceny"
        disabled={!formIsValid}
      />
    </Container>
  );
};

export default ModifyPrices;
