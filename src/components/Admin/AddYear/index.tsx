import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "./styled";
import { Field, FieldGroup } from "styled";
import {
  validatePrice,
  validatePackage,
  isUniqueYear,
  isNotEmpty,
  validatePackageProfitability,
} from "helpers/validation";
import useInput from "hooks/useInput";
import useInputGroup from "hooks/useInputGroup";
import { TeleComPackage, TeleComService } from "types/telecomunicationService";
import {
  selectTeleComPackages,
  selectTeleComServices,
  updateTeleComPackagePrices,
  updateTeleComServicePrices,
} from "features/teleComServicesSlice";
import { addYear, selectYears } from "features/yearsSlice";
import Error from "components/UI/Error";
import Button from "components/UI/Button";
import Input from "components/FormControls/Input";
import Label from "components/FormControls/Label";
import PricesFields from "../PricesFields";
import { preparePricesFromFormValues } from "helpers/teleComServices";

const AddYear: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const years = useSelector(selectYears);
  const [packagePriceError, setPackagePriceError] = useState("");
  const {
    value: yearValue,
    isValid: yearIsValid,
    hasError: yearHasError,
    valueChangeHandler: yearChangeHandler,
    inputBlurHandler: yearBlurHandler,
    reset: resetYear,
  } = useInput(
    useCallback(
      (value) => {
        return isNotEmpty(value) && isUniqueYear(parseInt(value), years);
      },
      [years]
    ),
    (years[years.length - 1] + 1).toString()
  );
  const allServices = useSelector(selectTeleComServices);
  const allPackages = useSelector(selectTeleComPackages);
  const {
    values: servicePricesValue,
    isValid: servicePricesAreValid,
    valueChangeHandler: servicePricesChangeHandler,
    inputBlurHandler: servicePricesBlurHandler,
    reset: resetServicePrices,
  } = useInputGroup(
    allServices.map((tcService: TeleComService) => tcService.id),
    validatePrice
  );
  const {
    values: packagePricesValue,
    isValid: packagePricesAreValid,
    valueChangeHandler: packagePricesChangeHandler,
    inputBlurHandler: packagePricesBlurHandler,
    reset: resetPackagePrices,
  } = useInputGroup(
    allPackages.map((tcPackage: TeleComPackage) => tcPackage.id),
    validatePackage
  );

  const dispatch = useDispatch();

  const createYear = () => {
    const errors = validatePackageProfitability(
      packagePricesValue,
      allPackages,
      servicePricesValue
    );
    setPackagePriceError(errors.join(". "));

    if (
      yearIsValid &&
      servicePricesAreValid &&
      packagePricesAreValid &&
      !errors.length
    ) {
      dispatch(addYear(parseInt(yearValue)));
      dispatch(
        updateTeleComServicePrices({
          year: parseInt(yearValue),
          prices: preparePricesFromFormValues(servicePricesValue),
        })
      );
      dispatch(
        updateTeleComPackagePrices({
          year: parseInt(yearValue),
          prices: preparePricesFromFormValues(packagePricesValue),
        })
      );

      resetYear();
      resetServicePrices();
      resetPackagePrices();
      onSuccess();
    }
  };

  const formIsValid =
    yearIsValid && servicePricesAreValid && packagePricesAreValid;

  return (
    <Container>
      <h1>Dodaj nowy rok</h1>
      <FieldGroup>
        <Field>
          <Label name="Rok" />
          <Input
            required
            id="year"
            type="number"
            value={yearValue}
            onChange={yearChangeHandler}
            onBlur={yearBlurHandler}
          />
          {yearHasError && (
            <Error error="Rok nie może być pusty i musi być unikalny" />
          )}
        </Field>
      </FieldGroup>
      <PricesFields
        year={yearValue}
        packagePriceError={packagePriceError}
        servicePricesValue={servicePricesValue}
        servicePricesChangeHandler={servicePricesChangeHandler}
        servicePricesBlurHandler={servicePricesBlurHandler}
        packagePricesValue={packagePricesValue}
        packagePricesChangeHandler={packagePricesChangeHandler}
        packagePricesBlurHandler={packagePricesBlurHandler}
      />
      <Button onClick={createYear} label="Dodaj rok" disabled={!formIsValid} />
    </Container>
  );
};

export default AddYear;
