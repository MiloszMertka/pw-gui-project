import Widget from "../shared/Widget";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { loadQuality } from "../../state/slices/sellQualitySlice";

function SellingQualityWidget() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isDetermined = useSelector((state) => state.sellQuality.sellingQualityDetermined);
  const aspects = useSelector((state) => state.sellQuality.sellingAspects);
  const account = useSelector((state) => state.auth.activeAccount.internalName);

  useEffect(() => {
    dispatch(
      loadQuality({
        account,
      }),
    );
  }, [account]);

  const maxScore = useMemo(() => {
    let sum = 0;
    aspects.forEach((aspect) => {
      sum += aspect.maxGrade;
    });
    return sum;
  }, [aspects]);

  const score = useMemo(() => {
    let sum = 0;
    aspects.forEach((aspect) => {
      sum += aspect.grade;
    });
    return sum;
  }, [aspects]);

  const scoreRank = useMemo(() => {
    const percentage = (score / maxScore) * 100;
    let rank = "";
    if (percentage >= 90) {
      rank = "qualityExcellent";
    } else if (percentage >= 80) {
      rank = "qualityVeryGood";
    } else if (percentage >= 70) {
      rank = "qualityGood";
    } else if (percentage >= 60) {
      rank = "qualityFair";
    } else {
      rank = "qualityPoor";
    }
    return rank;
  }, [score, maxScore]);

  const worstAspects = useMemo(() => {
    const sortedAspects = [...aspects].sort((a, b) => b.grade - a.grade);
    
    return sortedAspects.slice(-3).reverse();
  }, [aspects]);

  return (
    <Widget heading={t("sellingQuality")}>
      {isDetermined ? (
        <div>
          <p className="text-center text-body-secondary mb-1">
            {t(scoreRank)}
          </p>
          <h1 className="text-center text-body-primary green-text mb-1" style={{ fontWeight: "bold" }}>
            {score}/{maxScore}
          </h1>
          <p className="text-center text-body-secondary mb-1 mt-5">
            {t("WorstAspects")}:
          </p>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
            {worstAspects.map((aspect, index) => (
              <div key={index} style={{ width: "10rem" }}>
                <p className="text-center text-body-secondary mb-1 mt-3" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                  {aspect.aspect}
                </p>
                <h2 className="text-center text-body-primary red-text mb-1" style={{ fontWeight: "bold" }}>
                  {aspect.grade}/{aspect.maxGrade}
                </h2>
              </div>
            ))}
          </div>
      </div>
      ) : (
        <p className="text-center text-body-secondary mb-1">
          {t("sellQualityNotDetermined")}
        </p>
      )}
      <Link to="/sell-quality" className="mx-auto my-5">
        <Button color="primary">{t("seeMore")}</Button>
      </Link>
    </Widget>
  );
}

export default SellingQualityWidget;
