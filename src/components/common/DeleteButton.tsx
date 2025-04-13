import { useState } from 'react';
import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { handleError } from '../../utils/errorUtils';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ConfirmModal from '../modal/ConfrimModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface DeleteButtonProps {
  id: string;
  token: string;
  type: 'list' | 'item'; // Type to specify if it's a list or an item
  onDelete: (id: string, token: string) => Promise<AxiosResponse>; // Service to delete the list or item
  onSuccess?: () => void; //only for items
  name?: string; //only for list name
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id,token, type,name, onDelete, onSuccess }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showAlert, setShowAlert] = useState(false); // Controls visibility of the alert

  
    // React Query mutation for delete operation
    const deleteMutation = useMutation({
      mutationFn: () => onDelete(id, token),
      onSuccess: () => {
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
        setShowAlert(false);
  
        if (type === 'list') {
          queryClient.invalidateQueries({ queryKey: ["userLists", token] });
          navigate('/dashboard/wishlist');
        } else if(type === 'item'){
          //invalidate the item related query
          if (onSuccess) onSuccess();
        }
      },
      onError: (error: any) => {
        handleError(`Error deleting ${type}`, error);
      },
    });



  const showDeleteAlert = () => {
    setShowAlert(true); // Show the alert when the user clicks the delete button
  };

  const closeAlert = () => {
    setShowAlert(false); // Close the alert if the user cancels
  };

  return (
    <div>
      {/* Delete Button */}
      <button
        className={`btn ${type === 'item'? 'btn-sm' :'btn-md btn-outline'}  btn-error`}
        onClick={showDeleteAlert}
        disabled={deleteMutation.isPending} // Disable the button while loading
      >
        {deleteMutation.isPending ? 'Deleting...' : (
          <FontAwesomeIcon icon={faTrash} />
        )}
      </button>

      {/* DaisyUI Alert (only visible when showAlert is true) */}
      {showAlert && type === 'item' ? (
        <div role="alert" className="alert bg-red-100 fixed inset-x-0 top-1/4 flex items-center justify-center z-50  shadow-lg p-6 rounded-lg max-w-3/4 max-h-1/2 h-auto"
        style={{ maxHeight: '50vh' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Are you sure you want to delete this {type}? This action cannot be undone.
          </span>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-error" onClick={()=>deleteMutation.mutate()} disabled={deleteMutation.isPending}>
              Yes, Delete
            </button>
            <button className="btn btn-sm" onClick={closeAlert} disabled={deleteMutation.isPending}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <ConfirmModal isOpen={showAlert} type={'list'} name={name || ''} onClose={closeAlert} onConfirm={()=>deleteMutation.mutate()} disable={deleteMutation.isPending} />
      )}
    </div>
  );
};

export default DeleteButton;
