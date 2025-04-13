import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";

import { Button, Form, Input, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CloudinaryUploader from "./../cloudinary/CloudinaryUploader";
import { validateNumber, validateText } from "../../utils/validateUtils";

import { LocalItem } from "../../types/item.type";

import { useAuthToken } from "../../hooks/useAuthToken";    

interface ItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: LocalItem) => void;
  initialData: LocalItem;
}
const emptyItem = {
  localId: "",
  name: "",
  quantity: 1,
  price: 0,
  picture: "",
};

const ItemFormModal: React.FC<ItemFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const token = useAuthToken();
  const [newItem, setNewItem] = useState<LocalItem>(emptyItem);
  //for form
  const [form] = Form.useForm();

  //when it's editing mode
  useEffect(() => {
    if (initialData?.name) {
      setNewItem({
        localId: initialData.localId,
        name: initialData.name,
        quantity: initialData.quantity,
        price: initialData.price,
        picture: initialData.picture,
      });
      // Ensure the AntD form updates with the initialData values
      form.setFieldsValue({
        name: initialData.name,
        quantity_requested: initialData.quantity,
        price: initialData.price,
        picture: initialData.picture,
      });
    } else {
      form.resetFields(); // Reset form for new item creation
    }
  }, [initialData]);

  if (!token) {
    return null;
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  //cloudinary uploader
  const handleOnUpload = (error: any, result: any) => {
    if (!error && result.event === "success") {
      setNewItem((prevItem) => ({
        ...prevItem,
        picture: result.info.secure_url,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate all fields and get the values
      const values = await form.validateFields();
      const updatedItem: LocalItem = {
        ...newItem,
        name: values.name,
        quantity: values.quantity_requested,
        price: values.price,
        picture: values.picture,
      };

      onSubmit(updatedItem);

      setNewItem(emptyItem);
      onClose();
    } catch (err) {
      console.error("Form validation error:", err);
      toast.error("Please correct the errors in the form.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
        <div className="flex flex-row gap-2 justify-between">
          <h3 className="text-xl font-semibold mb-4">
            {initialData.localId !== "" ? "Edit gift" : "Add new gift"}
          </h3>
        </div>
        {/* PRELOAD Cloudinary uploader (hidden) */}
        <div style={{ display: "none" }}>
          <CloudinaryUploader onUpload={() => {}}>
            {() => (<></>)}
          </CloudinaryUploader>
        </div>

        <Form
          form={form}
          layout="horizontal"
          initialValues={newItem}
          onFinish={(values) => {
            // Optional: Log the submitted values for debugging
            console.log("Form submitted:", values);
          }}
        >
          {newItem.picture ? (
            <div className="mt-4 mb-4 flex flex-row gap-2 items-center">
              <img
                src={newItem.picture}
                alt="Item"
                className="w-32 h-32 object-cover rounded"
              />
              <CloudinaryUploader onUpload={handleOnUpload}>
                {({ open }) => (
                  <button onClick={open} className="btn btn-sm btn-outline">
                    Change picture
                  </button>
                )}
              </CloudinaryUploader>
            </div>
          ) : (
            <div className="mt-4 mb-4 ">
              <CloudinaryUploader onUpload={handleOnUpload}>
                {({ open }) => (
                  <Button
                    type="dashed"
                    onClick={open}
                    style={{ width: "80%", color: "#1890ff" }}
                    icon={<PlusOutlined />}
                  >
                    Upload Item Picture (Optional)
                  </Button>
                )}
              </CloudinaryUploader>
            </div>
          )}
          {/* Name */}
          <Form.Item
            label="Item Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the item name." },
              {
                validator: (_, value) =>
                  validateText(value)
                    ? Promise.resolve()
                    : Promise.reject(new Error("Invalid item name.")),
              },
            ]}
          >
            <Input
              placeholder="Enter the item name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </Form.Item>
          {/* Quantity */}
          <Form.Item
            label="Quantity"
            name="quantity_requested"
            rules={[
              { required: true, message: "Please enter the quantity." },
              {
                validator: (_, value) =>
                  validateNumber(value, 1, true)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Quantity must be a positive integer.")
                      ),
              },
            ]}
          >
            <InputNumber
              value={newItem.quantity}
              onChange={(value) =>
                setNewItem({ ...newItem, quantity: value as number })
              }
              min={1}
              placeholder="Enter quantity"
            />
          </Form.Item>
          {/* Price */}
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please enter the price." },
              {
                validator: (_, value) =>
                  validateNumber(value, 0.01)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Price must be greater than $0.01.")
                      ),
              },
            ]}
          >
            <InputNumber
              value={newItem.price}
              onChange={(value) =>
                setNewItem({ ...newItem, price: value || (0 as number) })
              }
              min={0.01}
              step={0.01}
              placeholder="Enter price (e.g., 10.50)"
              prefix="$"
            />
          </Form.Item>

          {/* Description */}
          {/* <Form.Item
            label="Description"
            name="description"
            hasFeedback
            validateTrigger="onBlur"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || value === "") {
                    return Promise.resolve(); // Skip validation for empty field
                  }
                  if (!validateText(value)) {
                    return Promise.reject(
                      new Error("Description must be legit text.")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.TextArea
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              rows={3}
              placeholder="Enter a description (optional)"
            />
          </Form.Item> */}

          <div className="flex flex-row justify-end gap-3">
            <button
              className="btn btn-ghost btn-sm cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="btn btn-outline btn-sm" onClick={handleSubmit}>
              {initialData.localId !== "" ? "Save" : "Add"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ItemFormModal;
