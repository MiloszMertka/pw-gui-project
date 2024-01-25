import NavBar from "../components/shared/NavBar";
import ClientsOpinionsWidget from "../components/features/ClientsOpinionsWidget";
import OffersRankWidget from "../components/features/OffersRankWidget";
import OrdersWidget from "../components/features/OrdersWidget";
import SellingQualityWidget from "../components/features/SellingQualityWidget";
import SellingChartWidget from "../components/features/SellingChartWidget";

import "../styles/dashboard.scss";

function Dashboard() {
  return (
    <>
      <NavBar />
      <main className="container gap-5 my-5 dashboard-row">
        <div className="gap-5 my-5 dashboard-column">
          <OrdersWidget />
          <SellingQualityWidget />
          <ClientsOpinionsWidget />
        </div>
        <div className="gap-5 my-5 dashboard-column">
            <OffersRankWidget />
            <SellingChartWidget />
          </div>
      </main>
    </>
  );
}

export default Dashboard;
