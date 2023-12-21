import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import { Provider } from "react-redux";
import { store } from "./state/store";
import Opinions from "./pages/Opinions";
import SellQuality from "./pages/SellQuality";
import Orders from "./pages/Orders";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { ThemeProvider } from "./contexts/ThemeContext";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";
import plTranslation from "./locales/pl/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    pl: {
      translation: plTranslation,
    },
  },
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/opinions",
    element: (
      <ProtectedRoute>
        <Opinions />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sell-quality",
    element: (
      <ProtectedRoute>
        <SellQuality />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders/:category",
    element: (
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    ),
    
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
