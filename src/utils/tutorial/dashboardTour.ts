import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

type TourRefs = {
  sidebarRef: Record<string, HTMLButtonElement | null>;
  onComplete?: () => void;
};

export const startDashboardTour = (refs: TourRefs) => {
  const tour = new Shepherd.Tour({
    defaultStepOptions: {
      classes: 'shadow-md bg-white',
      scrollTo: true,
      cancelIcon: { enabled: true },
    },
    useModalOverlay: true,
  });

  tour.addStep({
    id: 'welcome',
    text: 'Welcome to your dashboard! The home page shows a summary of your activity.',
    attachTo: {
      element: refs.sidebarRef.home!,
      on: 'right',
    },
    buttons: [
      {
        text: 'Next',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'giftlist',
    text: 'Here you can manage all wishlists you created.',
    attachTo: {
      element: refs.sidebarRef.wishlist!,
      on: 'right',
    },
    buttons: [{ text: 'Next', action: tour.next }],
  });

  tour.addStep({
    id: 'transactions',
    text: 'Check your transactions and their current status here.',
    attachTo: {
      element: refs.sidebarRef.transaction!,
      on: 'right',
    },
    buttons: [{ text: 'Next', action: tour.next }],
  });

  tour.addStep({
    id: 'wallet',
    text: 'Your wallet shows your current balance, link Paypal account and withdraw funds.',
    attachTo: {
      element: refs.sidebarRef.wallet!,
      on: 'right',
    },
    buttons: [{ text: 'Next', action: tour.next }],
  });

    // Updated Finish Step
    tour.addStep({
      id: 'profile',
      text: 'View and edit your profile information here.',
      attachTo: {
        element: refs.sidebarRef.profile!,
        on: 'right',
      },
      buttons: [
        {
          text: 'Now you are ready! Create your wishlist!',
          action: () => {
            window.location.href = '/wishlist/create'; // Replace with your target page URL
          },
          classes: 'shepherd-button-primary',
        },
        {
          text: 'Finish the tour',
          action: tour.complete,
          classes: 'shepherd-button-secondary',
        },
      ],
    });

  tour.on('complete', () => {
    if (refs.onComplete) refs.onComplete();
  });

  tour.start();
};
