import { useDispatch, useSelector } from "react-redux";
import { Container, Label, YearsBox, Year } from "./styled";
import { selectActiveYear, selectYears, chooseYear } from "features/yearsSlice";

const Years = () => {
  const dispatch = useDispatch();
  const years = useSelector(selectYears);
  const activeYear = useSelector(selectActiveYear);

  return (
    <Container>
      <Label>Wybierz rok:</Label>
      <YearsBox>
        {years.map((year) => (
          <Year
            key={year}
            selected={year === activeYear}
            onClick={() => dispatch(chooseYear(year))}
          >
            {year}
          </Year>
        ))}
      </YearsBox>
    </Container>
  );
};

export default Years;
