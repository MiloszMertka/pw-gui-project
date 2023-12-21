import Widget from "../shared/Widget";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loadOrders } from "../../state/slices/ordersSlice";

function OrdersWidget() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const unpaid = useSelector((state) => state.orders.unpaid);
  const notSent = useSelector((state) => state.orders.notSent);
  const returns = useSelector((state) => state.orders.returns);
  const account = useSelector((state) => state.auth.activeAccount.internalName);
  
  const ordersDataList = ["unpaid", "notSent", "returns"];

  useEffect(() => {
    dispatch(
      loadOrders({
        account,
      }),
    );
  }, [account, dispatch]);

  return (
    <Widget heading={t("orders")}>
      {(unpaid === 0 && notSent === 0 && returns === 0) ? (
        <div style={{display: "flex", justifyContent: "center"}}>
          <p className="text-center text-body-secondary mb-1" style={{maxWidth: "28rem"}}>
            {t("ordersEmpty")}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
          {ordersDataList.map((data, index) => (
              <Link to={`/orders/${data}`} style={{ width: "10rem", textDecoration: "none", color: "inherit" }}>
              <p className="text-center text-body-secondary mb-1 mt-3" >
                {t(data)}
              </p>
              <h2 className="text-center text-body-primary mb-1" style={{ fontWeight: "bold" }}>
                {eval(data)}
              </h2>
            </Link>
          ))}
        </div>
      )}
    </Widget>
  );
}

export default OrdersWidget;
