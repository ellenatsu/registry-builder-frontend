import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserStore } from "../../stores/userStore";
import { createUser } from "../../services/user.service";
import { handleError } from "../../utils/errorUtils";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const LoadingPage = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { setToken, setIsNewUser, setUserData, dest, preferredCategory } = useUserStore();
  const navigate = useNavigate();

    //mutation to send user data to backend
    const userAuthMutation = useMutation({
      mutationFn: ({user, preferredCategory, token} : {user:any, preferredCategory: string | null, token:string}) => createUser({...user, preferredCategory: preferredCategory}, token),
      onSuccess: (response) => {
        //get if new user
        if (response.showTour) setIsNewUser(true);
        setUserData(response.data);
        console.log('dest is ..', dest);
        if(dest === 'create'){
          //category: wedding, baby, other
          const category = preferredCategory ? preferredCategory : response.data.preferredCategory;
          navigate(`/wishlist/create?category=${category}`)
        }else if(dest === 'dashboard' || '/dashboard'){
          navigate('/dashboard');
        }else if(dest !== 'dashboard' && dest){
          navigate(dest);
        }else{
          navigate('/dashboard');
        }
      },
      onError: (error: any) => {
        console.error("User data sync error:", error);
          // If backend fails, show a toast and return the user to the previous page
          toast.error("Something went wrong with our server. Please try logging in later.");
          window.location.href = "https://www.fundmywish.ca";
      },
    });

  //send data to backend database
  useEffect(() => {
    const sendUserDataToBackend = async () => {
      if (!user) return;

      try {
        const token = await getAccessTokenSilently();
        setToken(token); // Store the token in Zustand
          userAuthMutation.mutate({user, preferredCategory, token})
         
       
      } catch (error) {
        handleError("auth failed", error);
        //Only send the user back to /auth if token retrieval fails
        window.location.href = "https://www.fundmywish.ca";
      }
    };

    sendUserDataToBackend();
  }, [
    user,
    navigate,
    getAccessTokenSilently,
    setToken,
    setIsNewUser,
    setUserData,
  ]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200">
      <div className="flex flex-col items-center justify-center">
        {/* Loading Spinner */}
        <span className="loading loading-spinner loading-lg text-primary mb-5"></span>
        {/* Loading Message */}
        <p className="text-gray-800">
          Please wait a moment while we set things up for you.
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
