import Widget from "../shared/Widget";
import { FormGroup, Label, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { loadOffersRank } from "../../state/slices/offersRankSlice";

function OffersRankWidget() {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const offers = useSelector((state) => state.offersRank.offers);
  const [sortingOption, setSortingOption] = useState('mostPurchased');

  useEffect(() => {
    dispatch(
      loadOffersRank(),
    );
  }, []);

  const sortedFiveOffers = useMemo(() => {
    if (offers.length === 0) {
      return [];
    }

    switch (sortingOption) {
      case 'mostPurchased':
        return [...offers].sort((a, b) => {
          const sortBySold = a.numberOfPiecesSold - b.numberOfPiecesSold;
          if (sortBySold === 0) {
            return a.turnover - b.turnover;
          }
          return sortBySold;
        }).slice(-5).reverse();
      case 'leastPurchased':
        return [...offers].sort((a, b) => {
          const sortBySold = b.numberOfPiecesSold - a.numberOfPiecesSold;
          if (sortBySold === 0) {
            return a.numberOfUniqueViews - b.numberOfUniqueViews;
          }
          return sortBySold;
        }).slice(-5).reverse();
      default:
        return offers.slice(-5);
    }
  }, [offers, sortingOption]);

  const handleSortingOptionChange = (event) => {
    setSortingOption(event.target.value);
  };

  const listCardClass = useMemo(() => {
    return isDarkMode ? "list-card-dark" : "list-card";
  }, [isDarkMode]);

  return (
    <Widget heading={t("offersRank")}>
      <p className="text-center text-body-secondary mb-1">
        {t("sortingType")}:
      </p>
      <div className="mt-3" style={{ display: "flex", justifyContent: "center" }}>
        <FormGroup tag="fieldset" style={{ display: "flex", gap: "2rem" }}>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="radioOption"
                value="mostPurchased"
                checked={sortingOption === 'mostPurchased'}
                onChange={handleSortingOptionChange}
              />{' '}
              {t("sortingTypeMostPurchased")}
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="radioOption"
                value="leastPurchased"
                checked={sortingOption === 'leastPurchased'}
                onChange={handleSortingOptionChange}
              />{' '}
              {t("sortingTypeLeastPurchased")}
            </Label>
          </FormGroup>
        </FormGroup>
      </div>
      <p className="text-center text-body-secondary mb-1 mt-4">
        {t("listOf5SortedOffers")}:
      </p>

      <div
        className="d-flex flex-column gap-1 mx-auto w-100"
        style={{ maxWidth: "25rem" }}
      >
        {sortedFiveOffers.length === 0 ? (
          <p className="text-center text-body-secondary my-5">
            {t("noOffersToDisplay")}
          </p>
        ) : (
          sortedFiveOffers.map((offer) => (

            <div
              key={offer.id} className={`${listCardClass} rounded-3 align-items-center px-3`}
              style={{ display: "flex" }}
            >
              <img
                src={offer.image}
                style={{ height: "3rem", width: "3rem", marginLeft: "-0.5rem", marginRight: "0.5rem" }}
              />
              <div style={{ width: "100%" }}>
                <p
                  className="fw-bolder"
                  style={{ width: "100%", paddingTop: "0.5rem", fontSize: "0.85rem" }}
                >
                  {offer.name}
                </p>
                <div style={{ width: "100%", fontSize: "0.7rem", margin: "0rem" }}>
                  <p style={{ marginTop: "-1.2rem" }}>
                    {t("numberOfPiecesSold") + ": " + offer.numberOfPiecesSold}
                  </p>
                  <p style={{ marginTop: "-1.2rem", marginBottom: "0.3rem" }}>
                    {sortingOption === 'mostPurchased' ? (
                      t("turnover") + ": " + offer.turnover
                    ) : (
                      t("numberOfUniqueViews") + ": " + offer.numberOfUniqueViews
                    )}
                  </p>
                </div>
              </div>
            </div>

          ))
        )}
      </div>

    </Widget>
  );
}

export default OffersRankWidget;
