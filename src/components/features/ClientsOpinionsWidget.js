import Widget from "../shared/Widget";
import { Button, ButtonGroup } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { loadOpinions } from "../../state/slices/opinionsSlice";

function ClientsOpinionsWidget() {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const opinions = useSelector((state) => state.opinions.sortedOpinions);
  const account = useSelector((state) => state.auth.activeAccount.internalName);

  const [showPositiveOpinions, setShowPositiveOpinions] = useState(null);

  useEffect(() => {
    dispatch(
      loadOpinions({
        account,
      }),
    );
  }, [account]);

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
    <Widget heading={t("customersOpinions")}>
      <p className="text-center text-body-secondary mb-1">
        {t("categoryOfOpinions")}:
      </p>
      <ButtonGroup className="w-100 mx-auto" style={{ maxWidth: "21.625rem" }}>
        <Button
          color="primary"
          active={showPositiveOpinions === null}
          onClick={() => setShowPositiveOpinions(null)}
        >
          {t("all")}
        </Button>
        <Button
          color="primary"
          active={showPositiveOpinions === true}
          onClick={() => setShowPositiveOpinions(true)}
        >
          {t("positive")}
        </Button>
        <Button
          color="primary"
          active={showPositiveOpinions === false}
          onClick={() => setShowPositiveOpinions(false)}
        >
          {t("negative")}
        </Button>
      </ButtonGroup>
      <p className="text-center text-body-secondary mt-5 mb-1">
        {t("listOfFiveLastOpinions")}:
      </p>
      <div
        className="d-flex flex-column gap-1 mx-auto w-100"
        style={{ maxWidth: "25rem" }}
      >
        {lastFiveOpinions.length === 0 ? (
          <p className="text-center text-body-secondary my-5">
            {t("noOpinionsToDisplay")}
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
        <Button color="primary">{t("seeMore")}</Button>
      </Link>
    </Widget>
  );
}

export default ClientsOpinionsWidget;
