import React, { useReducer, useState, useEffect } from 'react';
import TextInput from './TextInput';
import TickCircleIcon from '../icons/tickCircle';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { sendQuoteRequest, getOrders } from '../services/airtable';

function QuiteForm() {
  const [reservedDates, setReservedDates] = useState<Date[]>([]);
  const [formState, setFormState] = useState({
    type: 'input',
    loading: false,
  });

  useEffect(() => {
    getOrders()
      .then((dates) => setReservedDates(dates))
      .catch((err) => console.log(err));
  }, []);

  const TODAY = new Date();

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

  interface StateInterface {
    [key: string]: string | Date;
  }

  interface ActionInterface {
    value: string | Date;
    type: string;
  }

  const reducer = (state: StateInterface, action: ActionInterface) => {
    switch (action.type) {
      case FIELDS.CURRENT_ADDRESS.SLUG: {
        return {
          ...state,
          [FIELDS.CURRENT_ADDRESS.SLUG]: action.value,
        };
      }
      case FIELDS.NEW_ADDRESS.SLUG: {
        return {
          ...state,
          [FIELDS.NEW_ADDRESS.SLUG]: action.value,
        };
      }
      case FIELDS.DATE.SLUG: {
        return {
          ...state,
          [FIELDS.DATE.SLUG]: action.value,
        };
      }
      case FIELDS.SIZE.SLUG: {
        return {
          ...state,
          [FIELDS.SIZE.SLUG]: action.value,
        };
      }
      case FIELDS.INSTRUCTIONS.SLUG: {
        return {
          ...state,
          [FIELDS.INSTRUCTIONS.SLUG]: action.value,
        };
      }
      case FIELDS.NAME.SLUG: {
        return {
          ...state,
          [FIELDS.NAME.SLUG]: action.value,
        };
      }
      case FIELDS.EMAIL.SLUG: {
        return {
          ...state,
          [FIELDS.EMAIL.SLUG]: action.value,
        };
      }
      case FIELDS.PHONE.SLUG: {
        return {
          ...state,
          [FIELDS.PHONE.SLUG]: action.value,
        };
      }
      default:
        return state;
    }
  };

  const initialValues: StateInterface = {};
  Object.entries(FIELDS).forEach(([, { SLUG }]) => {
    initialValues[SLUG] =
      SLUG == FIELDS.DATE.SLUG ? TODAY : SLUG == FIELDS.SIZE.SLUG ? '1' : '';
  });

  const [formData, dispatch] = useReducer(reducer, initialValues);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFormState((prevState) => ({ ...prevState, lading: true }));
    const date = formData.date as Date;
    sendQuoteRequest({ ...formData, date: date.toISOString().split('T')[0] })
      .then(() => {
        setFormState((prevState) => ({ ...prevState, type: 'success' }));
        console.log('quote sent!');
      })
      .catch((error) => {
        setFormState((prevState) => ({ ...prevState, type: 'fail' }));
        console.log('Error! email has not been sent!', error);
      })
      .finally(() =>
        setFormState((prevState) => ({ ...prevState, lading: false }))
      );
  };

  if (formState.type === 'success') {
    return (
      <div>
        <p>
          All good <strong>{formData[FIELDS.NAME.SLUG] as string}!</strong>
        </p>
        <p>
          Thank you for considering our services for your upcoming house move!
        </p>
        <p>
          We will carefully consider your request and provide you personalised
          price based on the information you provided!
        </p>
        <p>
          The quote is going to be sent to your email:{' '}
          <strong>({formData[FIELDS.EMAIL.SLUG] as string})</strong>
        </p>
        <a href="/">
          <TickCircleIcon />
        </a>
      </div>
    );
  }

  if (formState.type === 'fail') {
    return (
      <div>
        <p>Ooops!</p>
        <p>Thank you for reaching out to us about your house move.</p>
        <p>
          Unfortunately, we were unable to receive your request. Please try
          again. Alternatively give us a call or send the request directly via
          our email.
        </p>
        <p>We apologize for the inconvenience!</p>
        <a href="/quote/">Try again!</a>
      </div>
    );
  }

  console.log('date: ', new Date(formData[FIELDS.DATE.SLUG]));

  const datePickStyle = `
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
`;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-2/4 bg-formBG/[0.6] p-4 rounded-sm"
    >
      <TextInput
        slug={FIELDS.CURRENT_ADDRESS.SLUG}
        label={FIELDS.CURRENT_ADDRESS.LABEL}
        placeholder={FIELDS.CURRENT_ADDRESS.PLACEHOLDER}
        value={formData[FIELDS.CURRENT_ADDRESS.SLUG] as string}
        updateValue={dispatch}
      />
      <TextInput
        slug={FIELDS.NEW_ADDRESS.SLUG}
        label={FIELDS.NEW_ADDRESS.LABEL}
        placeholder={FIELDS.NEW_ADDRESS.PLACEHOLDER}
        value={formData[FIELDS.NEW_ADDRESS.SLUG] as string}
        updateValue={dispatch}
      />
      <label htmlFor={FIELDS.DATE.SLUG} className="text-xl my-1">
        {FIELDS.DATE.LABEL}
      </label>
      <label htmlFor={FIELDS.SIZE.SLUG} className="text-xl my-1">
        {FIELDS.SIZE.LABEL}
      </label>
      <select
        name={FIELDS.SIZE.SLUG}
        id={FIELDS.SIZE.SLUG}
        onChange={(e) =>
          dispatch({ type: FIELDS.SIZE.SLUG, value: e.target.value })
        }
        className="bg-transparent border border-solid border-grey  p-2"
      >
        {[...new Array(9)].map((_, i) => (
          <option key={i + 1} value={i + 1}>{`${i + 1} Bedrooms`}</option>
        ))}
      </select>

      <label htmlFor={FIELDS.DATE.SLUG} className="text-xl my-1">
        {FIELDS.DATE.LABEL}
      </label>
      <style>{datePickStyle}</style>
      <DayPicker
        mode="single"
        required
        fromDate={TODAY}
        disabled={reservedDates}
        selected={new Date(formData[FIELDS.DATE.SLUG])}
        onDayClick={(date) => {
          dispatch({ type: FIELDS.DATE.SLUG, value: date });
        }}
      />
      <label htmlFor={FIELDS.INSTRUCTIONS.SLUG} className="text-xl my-1">
        {FIELDS.INSTRUCTIONS.LABEL}
      </label>
      <textarea
        id={FIELDS.INSTRUCTIONS.SLUG}
        name={FIELDS.INSTRUCTIONS.SLUG}
        rows={4}
        cols={43}
        placeholder={FIELDS.INSTRUCTIONS.PLACEHOLDER}
        onChange={(e) =>
          dispatch({ type: FIELDS.INSTRUCTIONS.SLUG, value: e.target.value })
        }
        className="bg-transparent placeholder-grey p-2 border border-solid border-grey"
      />
      <TextInput
        slug={FIELDS.NAME.SLUG}
        label={FIELDS.NAME.LABEL}
        value={formData[FIELDS.NAME.SLUG] as string}
        updateValue={dispatch}
      />
      <TextInput
        slug={FIELDS.EMAIL.SLUG}
        label={FIELDS.EMAIL.LABEL}
        value={formData[FIELDS.EMAIL.SLUG] as string}
        updateValue={dispatch}
      />
      <TextInput
        slug={FIELDS.PHONE.SLUG}
        label={FIELDS.PHONE.LABEL}
        value={formData[FIELDS.PHONE.SLUG] as string}
        updateValue={dispatch}
      />
      <button
        type="submit"
        disabled={formState.loading}
        className="bg-brown text-white my-2 p-3 w-3/4 text-2xl self-center rounded-sm"
      >
        Request a price
      </button>
    </form>
  );
}

export default QuiteForm;
