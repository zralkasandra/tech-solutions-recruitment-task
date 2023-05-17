import {
  selectTeleComPackages,
  selectTeleComServices,
} from "features/teleComServicesSlice";
import { useSelector } from "react-redux";
import { FieldGroup, Field, GroupTitle } from "styled";
import { InputType } from "hooks/useInputGroup";
import Label from "components/FormControls/Label";
import Input from "components/FormControls/Input";
import Error from "components/UI/Error";

const PricesFields: React.FC<{
  year: string;
  servicePricesValue: InputType[];
  servicePricesChangeHandler: (
    event: React.FormEvent<HTMLInputElement>
  ) => void;
  servicePricesBlurHandler: (event: React.FormEvent<HTMLInputElement>) => void;
  packagePricesValue: InputType[];
  packagePricesChangeHandler: (
    event: React.FormEvent<HTMLInputElement>
  ) => void;
  packagePricesBlurHandler: (event: React.FormEvent<HTMLInputElement>) => void;
  packagePriceError: string;
}> = ({
  year,
  servicePricesValue,
  servicePricesChangeHandler,
  servicePricesBlurHandler,
  packagePricesValue,
  packagePricesChangeHandler,
  packagePricesBlurHandler,
  packagePriceError,
}) => {
  const allServices = useSelector(selectTeleComServices);
  const allPackages = useSelector(selectTeleComPackages);

  return (
    <>
      <FieldGroup>
        <GroupTitle>Ceny za usługi w roku {year}</GroupTitle>
        {allServices.map((service) => {
          const tcService = servicePricesValue.find(
            (price) => price.id === service.id
          )!;
          return (
            <Field key={service.id}>
              <Label name={`${service.name} (zł)`} />
              <Input
                required
                id={service.id}
                type="number"
                value={tcService.value}
                onChange={servicePricesChangeHandler}
                onBlur={servicePricesBlurHandler}
              />
              {tcService.isTouched && tcService.error && (
                <Error error={tcService.error} />
              )}
            </Field>
          );
        })}
      </FieldGroup>
      <FieldGroup>
        <GroupTitle>Ceny za pakiety w roku {year}</GroupTitle>
        {allPackages.map((pack) => {
          const tcPackage = packagePricesValue.find(
            (price) => price.id === pack.id
          )!;
          return (
            <Field key={pack.id}>
              <Label name={`${pack.name} (zł)`} />

              <Input
                required
                id={pack.id}
                type="number"
                value={tcPackage.value}
                onChange={packagePricesChangeHandler}
                onBlur={packagePricesBlurHandler}
              />
              {tcPackage.isTouched && tcPackage.error && (
                <Error error={tcPackage.error} />
              )}
            </Field>
          );
        })}
        {packagePriceError && <Error error={packagePriceError} />}
      </FieldGroup>
    </>
  );
};

export default PricesFields;
