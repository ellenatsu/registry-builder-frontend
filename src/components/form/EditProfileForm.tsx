import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../types/user.type';
import EditAvatarModal from './../modal/EditAvatarModal';
import useCloudinaryScript from '../../hooks/useCloudinaryScript';
import { validateEmail, validateText, validateURL } from '../../utils/validateUtils';
import toast, { Toaster } from 'react-hot-toast';



interface EditProfileFormProps {
  userData: User;
  onSave: (formData: any) => void;
  onCancel: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ userData, onSave, onCancel }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name || '',
    email: userData.email || '',
    picture: userData.picture || '',
  });

  //preload cloudinary uploader scripts
  const isLoading = useCloudinaryScript();

  const handleAvartarUpdate = (url: string) => {
    setFormData((prevData) => ({
      ...prevData,
      picture: url
    }));
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Validate inputs before saving
    //user name can be email or name
    if (!validateText(formData.name) && !validateEmail(formData.name)) {
      toast.error('Please enter a valid name.');
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email.');
      return;
    }

    if(!validateURL(formData.picture)){
      toast.error('Error occurs, please re-upload your picture.');
      return;
    }

    //validate pass, save
    onSave(formData);
  };



  return (
    <div className="flex flex-col p-3 lg:w-auto gap-3 items-center">
      {/* Toaster */}
      <div><Toaster/></div>
      <div className="w-full">
        {formData.picture && (
          <div className="mt-4">
            <img src={formData.picture} alt="Avatar Preview" className="rounded-full w-24 h-24" />
          </div>
        )}

        {isLoading ? (
          <button className="btn btn-outline" disabled>
            <FontAwesomeIcon icon={faSpinner} />
          </button>
        ) : (
          <button className='btn btn-outline mb-4' onClick={() => setIsModalOpen(true)}>Edit Avatar</button>

        )}
        <EditAvatarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAvartarUpdate} />

      </div>
      <div className="w-full">
        <label className="block">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
      </div>
      <div className="w-full">
        <label className="block">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          disabled={userData?.provider?.includes('google') || userData?.provider?.includes('auth0') || userData.email_updated}
        />
      </div>

      <div className="flex flex-row gap-3 mt-4">
        <button className="btn btn-outline btn-primary" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-outline btn-success" onClick={onCancel}>
          Cancel
        </button>

      </div>


    </div>
  );
};
export default EditProfileForm;
