const FIELDS = {
  CURRENT_ADDRESS: {
    LABEL: 'Current Address:',
    SLUG: 'current-address',
    PLACEHOLDER: 'Type current address or postcode...',
  },
  NEW_ADDRESS: {
    LABEL: 'New address:',
    SLUG: 'new-address',
    PLACEHOLDER: 'Type new address or postcode...',
  },
  DATE: { LABEL: 'Estimated moving date:', SLUG: 'date' },
  SIZE: { LABEL: 'Moving size:', SLUG: 'bedrooms' },
  INSTRUCTIONS: {
    LABEL: 'Special instructions:',
    SLUG: 'instructions',
    PLACEHOLDER:
      'Please list special requirements e.g. limited parking / storage / antique furniture etc.',
  },
  NAME: { LABEL: 'Your name:', SLUG: 'name' },
  EMAIL: { LABEL: 'Email:', SLUG: 'email' },
  PHONE: { LABEL: 'Phone Number:', SLUG: 'phone' },
};

const STATUS = {
  SUCCESS: 'success',
  FAIL: 'fail',
};

const STYLE = {
  CLASSNAME: {
    GLOBAL_STYLING:
      'font-raleway bg-savit bg-bottom bg-no-repeat bg-cover h-screen text-grey px-12 pt-14 max-sm:px-6',
    LINE: 'border-solid border-2 transition-transform duration-300 ease-in-out w-full',
    BURGER_MENU_LINK: 'text-3xl mx-2.5 hover:underline',
    MAIN_TAG: 'max-h-[80vh] overflow-y-auto',
    CONTACT: 'text-3xl font-semibold p-2 hover:underline',
    QUOTE_BUTTON:
      'rounded-md bg-brown text-center text-2xl text-white p-6 rounded-lg my-4',
    HOME_BUTTON:
      'flex justify-center text-white text-2xl bg-brown rounded-md w-40 p-2 my-4',
    FORM_SUBMIT_MESSAGE:
      'flex flex-col w-2/6 text-2xl bg-formBG/[0.6] p-4 rounded-sm max-lg:w-full max-sm:text-xl max-lg:items-center',
    FORM_BUTTON:
      'bg-brown text-white my-2 p-3 w-3/4 text-2xl self-center rounded-sm',
    FORM: 'flex flex-col lg:w-2/4 bg-formBG/[0.6] p-4 rounded-sm',
    LABEL: 'text-xl my-1 font-bold',
    SELECT: 'bg-transparent border border-solid border-grey  p-2',
    SKY_OVERLAY:
      'fixed w-full h-full bg-sky opacity-60 top-0 left-0 z-[-1] sm:hidden',
    TEXT: 'text-2xl my-6 max-sm:text-xl max-sm:text-center',
    TEXT_INPUT:
      'bg-transparent placeholder-grey border-solid border border-grey p-1',
    TITLE: 'my-2 text-5xl font-semibold max-sm:text-2xl max-sm:text-center',
    FLEX: {
      COLUMN: 'flex flex-col',
      ROW: 'flex flex-row',
    },
  },
  DATEPICKER_CSS: `
    .rdp-day_selected { 
      font-weight: bold; 
      background-color: #bf7e3a;
    }
    .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
      background-color: #bf7e3a;
    }
    .rdp-day_selected:hover{
      background-color: #bf7e3a;
    }
    .rdp-button:hover:not([disabled]) { 
      border-color: white;
      color: white;
      opacity: 0.7;
    }
  `,
};

const TODAY = new Date();

export default { FIELDS, TODAY, STATUS, STYLE };
