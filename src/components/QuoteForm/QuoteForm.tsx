import React, { useReducer, useState, useEffect } from 'react';
import DatePicker from './DatePicker';
import TextInput from './TextInput';
import TickCircleIcon from '../../icons/tickCircle';

import configs from '../../configs';

import { sendQuoteRequest, getOrders } from '../../services/airtable';

const {
  FIELDS,
  TODAY,
  STYLE: { CLASSNAME },
  STATUS: { SUCCESS, FAIL },
} = configs;

function QuoteForm() {
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

  interface StateInterface {
    [key: string]: string | Date;
  }

  interface ReducerActionInterface {
    value: string | Date;
    type: string;
  }

  const reducer = (state: StateInterface, action: ReducerActionInterface) => {
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
        throw Error('Unknown action: ' + action.type);
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
        setFormState((prevState) => ({ ...prevState, type: SUCCESS }));
        console.log('quote sent!');
      })
      .catch((error) => {
        setFormState((prevState) => ({ ...prevState, type: FAIL }));
        console.log('Error! email has not been sent!', error);
      })
      .finally(() =>
        setFormState((prevState) => ({ ...prevState, lading: false }))
      );
  };

  if (formState.type === SUCCESS) {
    return (
      <div className={CLASSNAME.FORM_SUBMIT_MESSAGE}>
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
        <a href="/" className={`${CLASSNAME.HOME_BUTTON}`}>
          <TickCircleIcon />
        </a>
      </div>
    );
  }

  if (formState.type === FAIL) {
    return (
      <div className={CLASSNAME.FORM_SUBMIT_MESSAGE}>
        <p>Ooops!</p>
        <p>Thank you for reaching out to us about your house move.</p>
        <p>
          Unfortunately, we were unable to receive your request. Please try
          again. Alternatively give us a call or send the request directly via
          our email.
        </p>
        <p>We apologize for the inconvenience!</p>
        <a href="/quote/" className={CLASSNAME.QUOTE_BUTTON}>
          Try again!
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={CLASSNAME.FORM}>
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
      <DatePicker
        selectedDate={new Date(formData[FIELDS.DATE.SLUG])}
        reservedDates={reservedDates}
        changeDate={(date: Date) => {
          dispatch({ type: FIELDS.DATE.SLUG, value: date });
        }}
      />
      <label htmlFor={FIELDS.SIZE.SLUG} className={CLASSNAME.LABEL}>
        {FIELDS.SIZE.LABEL}
      </label>
      <select
        name={FIELDS.SIZE.SLUG}
        id={FIELDS.SIZE.SLUG}
        className={CLASSNAME.SELECT}
        onChange={(e) =>
          dispatch({ type: FIELDS.SIZE.SLUG, value: e.target.value })
        }
      >
        {[...new Array(9)].map((_, i) => (
          <option key={i + 1} value={i + 1}>{`${i + 1} Bedrooms`}</option>
        ))}
      </select>
      <label htmlFor={FIELDS.INSTRUCTIONS.SLUG} className={CLASSNAME.LABEL}>
        {FIELDS.INSTRUCTIONS.LABEL}
      </label>
      <textarea
        id={FIELDS.INSTRUCTIONS.SLUG}
        name={FIELDS.INSTRUCTIONS.SLUG}
        rows={4}
        cols={43}
        className={CLASSNAME.TEXT_INPUT}
        placeholder={FIELDS.INSTRUCTIONS.PLACEHOLDER}
        onChange={(e) =>
          dispatch({ type: FIELDS.INSTRUCTIONS.SLUG, value: e.target.value })
        }
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
        className={CLASSNAME.FORM_BUTTON}
      >
        Request a price
      </button>
    </form>
  );
}

export default QuoteForm;
