import React, { useEffect} from "react";
import { Form, Input,  Radio } from "antd";

import { RawList } from "../../types/list.type";
import {
  LIST_VISIBILITY,
} from "../../constants/constants";

import { validateText } from "../../utils/validateUtils";


interface ListFormProps {
  initialData: RawList;
}

const ListForm: React.FC<ListFormProps> = ({
  initialData,
}) => {
  //for ant UI
  const [form] = Form.useForm();
  // const { Option } = Select;
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState<string>("");
  // const [imageURL, setImageURL] = useState<string>("");

  //load initial data 
  useEffect(() => {
    form.setFieldsValue(initialData);
    // setSelectedCategory(initialData.category);
    // setImageURL(initialData.cover_image);
  },[initialData, form]);


  //load cloudinary
  // const isLoading = useCloudinaryScript();
  // const {
  //   data: response,
  //   error,
  //   isPending,
  //   isError,
  // } = useQuery({
  //   queryKey: ["listDefaultData"], // Use an array as the query key
  //   queryFn: () => getListDefaultData(), // Pass the function, not its invocation
  //   staleTime: 6000000, // Set stale time to 100 minutes for caching
  // }); //data: {images: defaultImages, categories: LIST_CATEGORIES}

  // useEffect(() => {
  //   if (isError) {
  //     handleError("get list default data", error);
  //   }
  // }, [isError]);

  // const categories: Record<string, string> = response
  //   ? response.data.categories
  //   : {};
  // const categoriesArr = categories
  //   ? Object.entries(categories).map(([key, value]) => ({
  //       key,
  //       value,
  //     }))
  //   : [];
  //id, image_type, category, image_url
  // const defaultImages = response ? response.data.images : [];
  // Organize images by category
  // const groupedImages = defaultImages.reduce((acc: any, image: any) => {
  //   if (image.category) {
  //     if (!acc[image.category]) {
  //       acc[image.category] = [];
  //     }
  //     acc[image.category].push(image.image_url);
  //   }
  //   return acc;
  // }, {});

  // const handleValuesChange = (changedValues: any) => {
  //   // Get the updated category when it changes
  //   // if (changedValues.category) {
  //   //   setSelectedCategory(changedValues.category);
  //   // }
  //   // if(changedValues.cover_image){
  //   //   setImageURL(changedValues.cover_image);
  //   // }
  // };

  // const handleSelectImage = (imageUrl: string) => {
  //   if (!validateURL(imageUrl)) {
  //     toast.error("Invalid image, please retry.");
  //     return;
  //   }
  //   setImageURL(imageUrl);
  //   setIsModalOpen(false);
  // };

  //upload widget
  // const handleOnUpload = (error: any, result: any) => {
  //   if (!error && result.event === "success") {
  //     //result.info.secure_url);
  //     setImageURL(result.info.secure_url);
  //   }
  // };

 

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialData}
        onFinish={()=>console.log("submit form.")}
        // onValuesChange={handleValuesChange}
      >
        {/* List Name */}
       {/* Partner Names Field */}
       <Form.Item
          label="Enter your names as registry name"
          name="name"
          hasFeedback
          validateTrigger="onBlur"
          rules={[
            { required: true, message: "Please enter your names." },
            {
              validator: (_, value) => {
                if (value && !validateText(value)) {
                  return Promise.reject(
                    new Error("Names must be a legit text.")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input id="name" placeholder="e.g. Alice & Bob" />
        </Form.Item>

        {/* Visibility */}
        <Form.Item
          label="Visibility"
          name="visibility"
          rules={[
            {
              required: true,
              message: "Please select a visibility for your wishlist.",
            },
          ]}
        >
          <Radio.Group>
            <Radio value={LIST_VISIBILITY.PRIVATE}>Private</Radio>
            <Radio value={LIST_VISIBILITY.PUBLIC}>Public</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Category */}
        {/* <Form.Item
          label="Category"
          name="category"
          hasFeedback
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "Please select a category for your wishlist.",
            },
          ]}
        >
          <Select placeholder="Select a category">
            {categoriesArr.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.key}
              </Option>
            ))}
          </Select>
        </Form.Item> */}

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
                    new Error("Thank you message must be legit text.")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <TextArea
            id="description"
            placeholder="Enter a brief description for your wishlist"
            rows={2}
          />
        </Form.Item> */}

        {/* Thank You Message */}
        <Form.Item
          label="Thank You Message"
          name="thank_you_message"
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
                    new Error("Thank you message must be legit text.")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            name="thank_you_message"
            placeholder="Write a thank you message for your friends and families..."
          />
        </Form.Item>

        {/* Cover Image Section */}
        {/* <div className="form-control mb-6">
          <label className="label text-base">Cover Image</label>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full h-56 rounded-lg overflow-hidden border border-gray-300 shadow-md">
              {isPending ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <img
                  src={
                    imageURL === ""
                      ? IMAGE_PLACEHOLDER
                      : imageURL
                  }
                  alt="Cover Preview"
                  className="object-cover w-full h-full"
                />
              )}
              <div className="absolute bottom-2 right-2 flex flex-row gap-2">
                {!isLoading && (
                  <CloudinaryUploader onUpload={handleOnUpload}>
                    {({ open }) => (
                      <button onClick={open} className="btn btn-xs btn-outline">
                        <FontAwesomeIcon icon={faUpload} />
                        Upload cover
                      </button>
                    )}
                  </CloudinaryUploader>
                )}

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn-xs btn btn-outline"
                >
                  Browse default covers
                </button>
              </div>
            </div>
          </div>
        </div> */}

        {/* Modal */}
        {/* {isModalOpen && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
              <h3 className="font-bold text-lg">Pick a cover image</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
                {groupedImages[selectedCategory]?.map(
                  (url: string, index: any) => (
                    <img
                      key={index}
                      src={url}
                      alt={selectedCategory}
                      className="rounded-lg cursor-pointer border hover:border-primary"
                      onClick={() => handleSelectImage(url)}
                    />
                  )
                )}
              </div>
            </div>
          </dialog>
        )} */}
      </Form>
    </>
  );
};

export default ListForm;
