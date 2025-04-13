import React, { useEffect } from "react";
import EditProfileForm from "../../components/form/EditProfileForm";
import { useUserStore } from "../../stores/userStore";
import { handleError } from "../../utils/errorUtils";


const ProfilePage: React.FC = () => {
  const { userData, fetchUserData, isAuthenticated, updateUser } =
    useUserStore();
  const [isEditing, setIsEditing] = React.useState(false);

  useEffect(() => {
    if (!userData) {
      fetchUserData(); // Only fetch if userData is null or undefined
    }
  }, [userData, fetchUserData]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async (formData: any) => {
    if (userData === null) return;
    try {
      await updateUser({
        sub: userData.sub,
        ...formData,
      }); // Update user data in Zustand store

      // Refresh user data from backend or Zustand after update
      fetchUserData();

      setIsEditing(false);
    } catch (error) {
      //TODO: check if this error display ok, this is error to handle backend validation error
      handleError("edit user profile",error);
      // console.error("Error updating user:", error);
      // toast.error("Sorry an error occured, please try again later!");
    }
  };

  if (!isAuthenticated || !userData) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="mt-6 w-full max-w-lg mx-auto">
      {isEditing ? (
        <EditProfileForm
          userData={userData}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="flex flex-col w-full gap-3 items-center ">
          <div className="flex flex-row gap-3 justify-between items-baseline">
            <img
              src={userData.picture || ""}
              alt={userData.name || ""}
              className="w-24 rounded-full border"
            />
          </div>
          <div>
            <strong>Name:</strong> {userData.name}
          </div>
          <div>
            <strong>Email:</strong> {userData.email || "No email provided"}
          </div>

          <button className="btn btn-outline mt-4" onClick={handleEdit}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
