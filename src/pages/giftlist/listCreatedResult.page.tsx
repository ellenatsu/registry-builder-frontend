import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import ShareListModal from "../../components/modal/ShareListModal";

const ListCreatedResultPage: React.FC = () => {
  const { id: listId } = useParams();
  if (listId === undefined) {
    return <div>Invalid list id</div>;
  }

  return (
    <div className="p-6 flex flex-col items-center justify-center space-y-6 text-center">
      <CheckCircleOutlined style={{ fontSize: "64px", color: "green" }} />
      <h1 className="text-2xl font-bold">Wishlist Created Successfully!</h1>
      <p className="text-gray-600">
        Your wishlist has been created. You can now share it with friends and
        family to start receiving donations.
      </p>
      <ShareListModal listId={listId} className="btn btn-outline" />
      <div
        className="btn btn-primary"
        onClick={() => (window.location.href = `/wishlist/${listId}`)}
      >
        View Wishlist
      </div>
    </div>
  );
};

export default ListCreatedResultPage;
