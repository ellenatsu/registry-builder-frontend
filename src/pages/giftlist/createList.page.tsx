import React, { useEffect, useState } from "react";
import { Stepper } from "react-form-stepper";
import ShoppingBag from "../../components/createList/ShoppingBag";
import ItemTemplate from "../../components/createList/ItemTemplate";
import toast, { Toaster } from "react-hot-toast";
import PopularItems from "../../components/createList/PopularItems";
import ReviewItems from "../../components/createList/ReviewItems";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllPopularItems } from "../../services/item.service";
import { LocalItem, PopularItem } from "../../types/item.type";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createListWithItems } from "../../services/list.service";
import { useAuthToken } from "../../hooks/useAuthToken";

const CreateWishlistInSteps: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = useAuthToken();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const displayFor = searchParams.get("category") || "wedding";
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]);

  // Determine the current category from URL query parameters; default to "wedding/all"
  const currentCategory = searchParams.get("category")?.toLocaleLowerCase() === "baby" ? "baby" : "wedding";
  const otherCategory = currentCategory === "wedding" ? "baby" : "wedding";

  const handleSwitch = () => {
    // Navigate to the /create page with the new category
    navigate(`/wishlist/create?category=${otherCategory}`);
  };

  //fetch all popular items
  const {
    data: response,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["popularItems"],
    queryFn: () => getAllPopularItems(),
    staleTime: 600000,
  });

  useEffect(() => {
    if (response && response.data) {
      const specializedPopularItems = response.data.filter(
        (item: PopularItem) =>
          item.displayFor.some((df) =>
            df.toLowerCase().includes(displayFor.toLowerCase())
          )
      );
      console.log(specializedPopularItems);
      setPopularItems(specializedPopularItems);
    }
  }, [response]);

  useEffect(() => {
    if (isError) {
      console.error("fetch all popular items", error);
    }
  }, [isError]);

  //stepper navigation
  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  //mutation to create and edit
  const createListMutation = useMutation({
    mutationFn: ({
      name,
      target_amount,
      category,
      visibility,
      items,
      token,
    }: {
      name: string;
      target_amount: number;
      category: string;
      visibility: string;
      items: LocalItem[];
      token: string;
    }) =>
      createListWithItems(
        name,
        target_amount,
        category,
        visibility,
        items,
        token
      ),
    onSuccess: (response) => {
      // Invalidate user’s lists
      queryClient.invalidateQueries({ queryKey: ["userLists", token] });
      //toast and navigate
      toast.success("List created successfully!");
      navigate(`/wishlist/create-success/${response.data.id}`);
    },
    onError: (error: any) => {
      console.error("create list", error);
    },
  });
  const handleConfirm = (
    name: string,
    target_amount: number,
    visibility: string,
    items: LocalItem[],
    token: string
  ) => {
    //add category
    const category =
      displayFor === "baby"
        ? "babyregistry"
        : displayFor === "wedding"
        ? "wedding"
        : "other";
    //create list mutation
    createListMutation.mutate({
      name,
      target_amount,
      category,
      visibility,
      items,
      token,
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      <Toaster />
      {/* Stepper showing current step */}
      <Stepper
        activeStep={currentStep - 1}
        steps={[
          { label: "Choose Template" },
          { label: "Browse Popular Items" },
          { label: "Review & Confirm" },
        ]}
      />
      <div className="mt-6">
        {currentStep === 1 &&
          (!isPending && popularItems && popularItems.length > 0 ? (
            <>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span>
                  Right now you are viewing <span className="text-primary font-bold">{currentCategory === 'wedding' ? 'wedding/all' : otherCategory}</span> template
                </span>
                <button onClick={handleSwitch} className="btn btn-link btn-primary">
                  Switch to {otherCategory  === 'wedding' ? 'wedding/all' : otherCategory }
                </button>
              </div>
              <ItemTemplate
                displayFor={displayFor}
                popularItems={popularItems}
                onNext={handleNext}
              />
            </>
          ) : (
            <div>Fetching templates, please wait...</div>
          ))}
        {currentStep === 2 && (
          <PopularItems
            displayFor={displayFor}
            popularItems={popularItems}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 3 && (
          <ReviewItems onBack={handleBack} onConfirm={handleConfirm} />
        )}
      </div>

      {/* Persistent Shopping Bag */}
      {currentStep !== 3 && <ShoppingBag />}
    </div>
  );
};

export default CreateWishlistInSteps;
