import { useParams } from "react-router-dom";
import NavBar from "../components/shared/NavBar";
import { useTranslation } from "react-i18next";

function Orders() {
  const { category } = useParams();
  const { t } = useTranslation();

  return (
    <>
      <NavBar />
      <div className="container my-5">
        <h1>{t("orders")} - {t(category)}</h1>
        <div className="bg-body-secondary w-100 vh-100"></div>
      </div>
    </>
  );
}

export default Orders;
