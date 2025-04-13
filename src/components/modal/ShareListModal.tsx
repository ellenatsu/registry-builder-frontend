import React, { useState } from "react";
import { Modal, Button, Tabs, Input, Tooltip } from "antd";
import { toast } from "react-hot-toast";
import {
  FacebookFilled,
  InstagramOutlined,
  WhatsAppOutlined,
  TwitterOutlined,
  CopyOutlined,
} from "@ant-design/icons";

interface ShareListModalProps {
  listId: string;
  className?: string; // Optional custom className
}

const ShareListModal: React.FC<ShareListModalProps> = ({
  listId,
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const shareableLink = `${window.location.origin}/wishlist/${listId}`;
  const shareTemplate = `Come and donate for my wishlist items here: ${shareableLink}`;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(shareTemplate)
      .then(() => toast.success("Message copied to clipboard!"))
      .catch(() => toast.error("Failed to copy the message."));
  };

  const socialMediaLinks = {
    Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareableLink
    )}`,
    Instagram: `https://www.instagram.com/`, // Instagram doesn’t support direct sharing, so you can link the user to the app.
    WhatsApp: `https://wa.me/?text=${encodeURIComponent(shareTemplate)}`,
    X: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareTemplate
    )}`,
  };

  return (
    <div className="w-full">
      <div
        onClick={() => setIsModalOpen(true)}
        className={className || ""}
      >
        Share Wishlist
      </div>

      <Modal
        title="Share on social media or Copy the message to share!"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div className="space-y-2">
          <div className="relative">
            <Input.TextArea
              value={shareTemplate}
              rows={3}
              readOnly
              className="mb-2"
            />
            <Tooltip title="Copy Message">
              <CopyOutlined
                className="absolute top-2 right-2 text-gray-500 hover:text-primary cursor-pointer"
                style={{ fontSize: "20px" }}
                onClick={handleCopy}
              />
            </Tooltip>
          </div>

          <Tabs defaultActiveKey="1">
            {Object.entries(socialMediaLinks).map(([platform, link]) => (
              <Tabs.TabPane
                tab={
                  <span>
                    {platform === "Facebook" && <FacebookFilled />}
                    {platform === "Instagram" && <InstagramOutlined />}
                    {platform === "WhatsApp" && <WhatsAppOutlined />}
                    {platform === "X" && <TwitterOutlined />}
                    {platform}
                  </span>
                }
                key={platform}
              >
                <Button
                  type="primary"
                  onClick={() => window.open(link, "_blank")}
                  block
                >
                  Share on {platform}
                </Button>
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      </Modal>
    </div>
  );
};

export default ShareListModal;
