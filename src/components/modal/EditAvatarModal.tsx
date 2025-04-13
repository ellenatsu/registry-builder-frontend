import React, { useState } from 'react';
import CloudinaryUploader from './../cloudinary/CloudinaryUploader';


interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (avatarUrl: string) => void;
}

const EditAvatarModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, onSave }) => {
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  //upload widget
  const handleOnUpload = (error: any, result: any) => {
    if (!error && result.event === 'success') {
      setAvatarUrl(result.info.secure_url);
    }
  };

  const handleSave = () => {
    onSave(avatarUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
      <div className="bg-white p-6 rounded-lg shadow-lg">
          <CloudinaryUploader onUpload={handleOnUpload}>
            {({ open }) => (
              <button onClick={open} className="btn btn-outline">
                Upload New Avatar
              </button>
            )}
          </CloudinaryUploader>
          {avatarUrl && (
          <div className="mt-4 mb-4">
            <img src={avatarUrl} alt="Avatar Preview" className="rounded-full w-36 h-36" />
          </div>
        )}

        <div className="mt-5">
          <button className="btn btn-success mr-2" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAvatarModal;
