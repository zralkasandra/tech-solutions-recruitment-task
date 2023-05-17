import React from "react";
import { Item, Icon, Name, Price, Title } from "./styled";
import { TeleComPackage, TeleComService } from "types/telecomunicationService";
import { getPriceForYear } from "helpers/cart";
import { useSelector } from "react-redux";
import { selectActiveYear } from "features/yearsSlice";

const Section: React.FC<{
  title: string;
  items: string[];
  isFree?: boolean;
  itemsData: (TeleComPackage | TeleComService)[];
}> = ({ title, items, isFree, itemsData }) => {
  const activeYear = useSelector(selectActiveYear);
  const getItemData = (id: string) =>
    itemsData.find((item: any) => item.id === id);

  return (
    <>
      <Title>{title}</Title>
      {items.map((item) => {
        const itemData = getItemData(item)!;
        return (
          <Item key={itemData.id}>
            {"icon" in itemData && <Icon src={itemData.icon} />}
            <Name>{itemData.name}</Name>
            <Price>
              {isFree ? "Gratis!" : getPriceForYear(itemData, activeYear)}
            </Price>
          </Item>
        );
      })}
    </>
  );
};

export default Section;
