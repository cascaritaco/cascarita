import { RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "./i18n/config";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useRouter } from "./pages/Routes";
import { AuthProvider } from "./components/AuthContext/AuthContext";

const queryClient = new QueryClient();
const routes = useRouter();

const App = () => {
  console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18next}>
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
};

export default App;
