import "./instrument";
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth0ProviderWithRedirectCallback from "./components/auth/AuthProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Auth0ProviderWithRedirectCallback>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Auth0ProviderWithRedirectCallback>
);