import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useUserStore } from "../../stores/userStore";

const Auth0ProviderWithRedirectCallback: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const onRedirectCallback = (appState?: any) => {
      const { setDest, setPreferredCategory } = useUserStore.getState();
      if (appState.dest) {
        //for different redirect
        setDest(appState.dest ? appState.dest : "/dashboard");
        setPreferredCategory(appState.preferredCategory || "");
      }else{
        //for protected routes
        window.location.href = appState && appState.returnTo || window.location.pathname;
      }
  };

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${import.meta.env.VITE_AUTH0_REDIRECT_URI}`,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithRedirectCallback;
