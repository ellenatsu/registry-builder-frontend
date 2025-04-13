import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";

const AuthPage = () => {
  const { user, loginWithRedirect, isLoading } = useAuth0();
  const { setDest, setPreferredCategory } = useUserStore.getState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  //for user interests category, wedding, baby, other (means normal nothing new)
  const category = searchParams.get("category") || "other";
  const dest = searchParams.get("dest") || "dashboard";

  useEffect(() => {
    if (!user && !isLoading) {
      loginWithRedirect({ appState: { dest: dest, preferredCategory: category } });
    } else if (user && !isLoading) {
      //must be an old user here
      if(dest === 'dashboard'){
        setDest('dashboard');
      }else if(dest === 'create'){
        setDest('create');
        setPreferredCategory(category);
      }
      navigate("/loading");

    } else {
      return;
    }
  }, [user, isLoading, loginWithRedirect]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div>
        if page not automatically take you to the login, please use this button
        manually, thank you.
      </div>
      <button
        onClick={() =>
          loginWithRedirect({ appState: { dest: dest, preferredCategory: category} })
        }
        className="btn lg:btn-md btn-sm btn-primary btn-outline"
      >
        Log In
      </button>
    </div>
  ); // Optionally, add a loading spinner if desired
};

export default AuthPage;
