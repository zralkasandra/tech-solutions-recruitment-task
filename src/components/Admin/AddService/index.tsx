import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  ChoiceLabel,
  Icon,
  Choice,
  Choices,
  Icons,
  Image,
} from "./styled";
import { Field, FieldGroup, GroupTitle } from "styled";
import icons from "data/icons";
import { isNotEmpty, isUniqueName, validatePrice } from "helpers/validation";
import useInput from "hooks/useInput";
import useInputGroup, { InputType } from "hooks/useInputGroup";
import { TeleComService } from "types/telecomunicationService";
import {
  addTeleComService,
  selectTeleComServices,
} from "features/teleComServicesSlice";
import { selectYears } from "features/yearsSlice";
import Button from "components/UI/Button";
import Error from "components/UI/Error";
import Input from "components/FormControls/Input";
import Label from "components/FormControls/Label";

const AddService: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [showIcons, setShowIcons] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");
  const allServices = useSelector(selectTeleComServices);
  const nameValidation = useCallback(
    (value: string) => {
      return isNotEmpty(value) && isUniqueName(value, allServices);
    },
    [allServices]
  );
  const years = useSelector(selectYears);
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(nameValidation);
  const {
    value: iconValue,
    isValid: iconIsValid,
    hasError: iconHasError,
    valueChangeHandler: iconChangeHandler,
    inputBlurHandler: iconBlurHandler,
    reset: resetIcon,
  } = useInput(isNotEmpty);
  const {
    values: pricesValue,
    isValid: pricesAreValid,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrices,
  } = useInputGroup(
    years.map((year) => year.toString()),
    validatePrice
  );

  const [serviceDependencies, setServiceDependencies] = useState<string[]>([]);

  const handleServiceSelection = (id: string) => {
    if (serviceDependencies.includes(id)) {
      setServiceDependencies((prevDependencies) => {
        const newDeps = prevDependencies.filter(
          (dependency: string) => dependency !== id
        );
        return newDeps;
      });
    } else {
      setServiceDependencies((prevDependencies) => [...prevDependencies, id]);
    }
  };

  const createNewService = () => {
    const currentIconOption =
      !showIcons && iconValue !== "" ? iconValue : selectedIcon;
    if (nameIsValid && (selectedIcon || iconIsValid) && pricesAreValid) {
      const service = {
        id: nameValue.toLowerCase().trim(),
        name: nameValue,
        icon: currentIconOption,
        prices: pricesValue.map((price: InputType) => ({
          year: parseInt(price.id),
          value: parseInt(price.value),
        })),
        dependencies: serviceDependencies,
      };
      dispatch(addTeleComService(service));
      resetName();
      resetIcon();
      setSelectedIcon("");
      resetPrices();
      onSuccess();
    }
  };

  const toggleIcons = () => {
    setShowIcons((prevShowIcons) => !prevShowIcons);
  };

  const formIsValid =
    nameIsValid && (selectedIcon || iconIsValid) && pricesAreValid;
  const iconsLabel = showIcons ? "Schowaj listę" : "Wybierz ikonę z listy";

  return (
    <Container>
      <h1>Dodaj nową usługę</h1>
      <form>
        <FieldGroup>
          <GroupTitle>Dane usługi</GroupTitle>
          <Field>
            <Label name="Nazwa usługi" />
            <Input
              required
              type="text"
              id="name"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={nameValue}
            />
            {nameHasError && (
              <Error error="Nazwa usługi nie może być pusta i musi być unikalna!" />
            )}
          </Field>
          <Field>
            <Label name="Ikona dla usługi" />
            {!showIcons && (
              <Input
                required
                type="text"
                id="icon"
                onChange={iconChangeHandler}
                onBlur={iconBlurHandler}
                value={iconValue}
                placeholder="Wpisz URL lub wybierz z listy"
              />
            )}
            <Button type="button" onClick={toggleIcons} label={iconsLabel} />
            {showIcons && (
              <Icons>
                {icons.map((icon) => (
                  <Image
                    key={icon}
                    src={icon}
                    onClick={() => setSelectedIcon(icon)}
                    selected={selectedIcon === icon}
                  />
                ))}
              </Icons>
            )}
            {selectedIcon === "" && iconHasError && (
              <Error error="Ikona usługi nie może być pusta!" />
            )}
          </Field>
        </FieldGroup>
        <FieldGroup>
          <GroupTitle>Cennik usługi</GroupTitle>
          {years.map((year: number) => {
            const price = pricesValue.find(
              (price: InputType) => price.id === year.toString()
            )!;
            return (
              <Field key={year}>
                <Label name={`Rok ${year} (zł)`} />
                <Input
                  required
                  type="number"
                  id={year.toString()}
                  onChange={priceChangeHandler}
                  onBlur={priceBlurHandler}
                  value={price.value}
                />
                {price.isTouched && price.error && (
                  <Error error={price.error} />
                )}
              </Field>
            );
          })}
        </FieldGroup>
        <FieldGroup>
          <GroupTitle>Zależności (opcjonalne)</GroupTitle>
          <Field>
            <Label name="Usługa nie może być zakupiona bez:" />

            <Choices>
              {allServices.map((service: TeleComService) => (
                <ChoiceLabel
                  selected={serviceDependencies.includes(service.id)}
                  htmlFor={service.id}
                  key={service.id}
                >
                  <Choice
                    id={service.id}
                    type="checkbox"
                    checked={serviceDependencies.includes(service.id)}
                    onChange={() => handleServiceSelection(service.id)}
                  />
                  <Icon src={service.icon} />
                  {service.name}
                </ChoiceLabel>
              ))}
            </Choices>
          </Field>
        </FieldGroup>
        <Button
          onClick={createNewService}
          label="Dodaj usługę"
          disabled={!formIsValid}
          type="button"
        />
      </form>
    </Container>
  );
};

export default AddService;
