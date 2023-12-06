import NavBar from "../components/shared/NavBar";
import ClientsOpinionsWidget from "../components/features/ClientsOpinionsWidget";
import OffersRankWidget from "../components/features/OffersRankWidget";
import OrdersWidget from "../components/features/OrdersWidget";
import SellingQualityWidget from "../components/features/SellingQualityWidget";
import SellingChartWidget from "../components/features/SellingChartWidget";

function Dashboard() {
  return (
    <>
      <NavBar />
      <main>
        <ClientsOpinionsWidget />
        <OffersRankWidget />
        <OrdersWidget />
        <SellingQualityWidget />
        <SellingChartWidget />
      </main>
    </>
  );
}

export default Dashboard;
