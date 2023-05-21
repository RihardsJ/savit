const FIELDS = {
  CURRENT_ADDRESS: {
    LABEL: 'Current Address:',
    SLUG: 'current-address',
    PLACEHOLDER: 'Start typing the address or postcode...',
  },
  NEW_ADDRESS: {
    LABEL: 'New address:',
    SLUG: 'new-address',
    PLACEHOLDER: 'Start typing the address or postcode...',
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
  SUCCSESS: 'success',
  FAIL: 'fail',
};

const STYLE = {
  CLASSNAME: {
    FORM_BUTTON:
      'bg-brown text-white my-2 p-3 w-3/4 text-2xl self-center rounded-sm',
    FORM: 'flex flex-col w-1/4 bg-formBG/[0.6] p-4 rounded-sm',
    LABEL: 'text-xl my-1',
    SELECT: 'bg-transparent border border-solid border-grey  p-2',
    TEXT_INPUT:
      'bg-transparent placeholder-grey border-solid border border-grey p-1',
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
