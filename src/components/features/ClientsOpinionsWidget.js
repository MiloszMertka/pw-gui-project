import Widget from "../shared/Widget";
import { Button, ButtonGroup } from "reactstrap";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

function ClientsOpinionsWidget() {
  const { isDarkMode } = useTheme();

  const opinions = useSelector((state) => state.opinions.sortedOpinions);

  const [showPositiveOpinions, setShowPositiveOpinions] = useState(null);

  const lastFiveOpinions = useMemo(() => {
    if (opinions.length === 0) {
      return [];
    }

    switch (showPositiveOpinions) {
      case true:
        return opinions
          .filter((opinion) => opinion.isPositive === true)
          .slice(-5)
          .reverse();
      case false:
        return opinions
          .filter((opinion) => opinion.isPositive === false)
          .slice(-5)
          .reverse();
      default:
        return opinions.slice(-5).reverse();
    }
  }, [opinions, showPositiveOpinions]);

  const listCardClass = useMemo(() => {
    return isDarkMode ? "list-card-dark" : "list-card";
  }, [isDarkMode]);

  return (
    <Widget heading="Opinie Kupujących">
      <p className="text-center text-body-secondary mb-1">
        Kategoria wyświetlanych opinii:
      </p>
      <ButtonGroup className="w-100 mx-auto" style={{ maxWidth: "21.625rem" }}>
        <Button
          color="primary"
          active={showPositiveOpinions === null}
          onClick={() => setShowPositiveOpinions(null)}
        >
          Wszystkie
        </Button>
        <Button
          color="primary"
          active={showPositiveOpinions === true}
          onClick={() => setShowPositiveOpinions(true)}
        >
          Pozytywne
        </Button>
        <Button
          color="primary"
          active={showPositiveOpinions === false}
          onClick={() => setShowPositiveOpinions(false)}
        >
          Negatywne
        </Button>
      </ButtonGroup>
      <p className="text-center text-body-secondary mt-5 mb-1">
        Lista 5 ostatnich opinii:
      </p>
      <div
        className="d-flex flex-column gap-1 mx-auto w-100"
        style={{ maxWidth: "25rem" }}
      >
        {lastFiveOpinions.length === 0 ? (
          <p className="text-center text-body-secondary my-5">
            Brak opinii do wyświetlenia.
          </p>
        ) : (
          lastFiveOpinions.map((opinion) => (
            <div
              key={opinion.id}
              className={`${listCardClass} rounded-3 d-flex align-items-center gap-3 px-3 py-2`}
            >
              <p className="my-0 fw-bolder fs-2" style={{ width: 50 }}>
                {opinion.grade}/5
              </p>
              <p className="my-0">{opinion.comment}</p>
            </div>
          ))
        )}
      </div>
      <Link to="/opinions" className="mx-auto my-4">
        <Button color="primary">Zobacz więcej</Button>
      </Link>
    </Widget>
  );
}

export default ClientsOpinionsWidget;
