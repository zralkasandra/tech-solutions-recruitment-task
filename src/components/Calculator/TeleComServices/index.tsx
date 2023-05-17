import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TeleComService } from "types/telecomunicationService";
import { getPriceForYear } from "helpers/cart";
import {
  toggleTeleComServiceInCart,
  selectChosenTeleComServices,
  selectError,
  selectTeleComServices,
} from "features/teleComServicesSlice";
import { selectActiveYear } from "features/yearsSlice";
import Service from "./Service";
import Error from "components/UI/Error";

const TeleComServices: React.FC = () => {
  const dispatch = useDispatch();
  const teleComServices = useSelector(selectTeleComServices);
  const chosenTeleComServices = useSelector(selectChosenTeleComServices);
  const activeYear = useSelector(selectActiveYear);
  const error = useSelector(selectError);

  return (
    <div>
      {error && <Error error={error} />}
      {teleComServices?.map((teleComService: TeleComService) => (
        <Service
          key={teleComService.id}
          id={teleComService.id}
          icon={teleComService.icon}
          name={teleComService.name}
          onChooseService={() =>
            dispatch(toggleTeleComServiceInCart({ teleComService }))
          }
          chosen={chosenTeleComServices.includes(teleComService.id)}
          price={getPriceForYear(teleComService, activeYear)}
        />
      ))}
    </div>
  );
};

export default TeleComServices;
