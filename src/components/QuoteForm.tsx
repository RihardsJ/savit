import React, { useReducer } from 'react';
import TextInput from './TextInput';
import { sendQuoteRequest } from '../services/airtable';

function QuiteForm() {
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
    [key: string]: string;
  }

  interface ActionInterface {
    value: string;
    type: string;
  }

  interface InitialValuesInterface {
    [key: string]: string;
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

  const initialValues: InitialValuesInterface = {};
  const CURRENT_DATE = new Date().toISOString().split('T')[0];

  Object.entries(FIELDS).forEach(([, value]) => {
    initialValues[value.SLUG] =
      value.SLUG == FIELDS.DATE.SLUG
        ? CURRENT_DATE
        : value.SLUG == FIELDS.SIZE.SLUG
        ? '1'
        : '';
  });

  const [formData, dispatch] = useReducer(reducer, initialValues);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    sendQuoteRequest(formData)
      .then(() => console.log('quote sent!'))
      .catch((error) => console.log('Error! email has not been sent!', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        slug={FIELDS.CURRENT_ADDRESS.SLUG}
        label={FIELDS.CURRENT_ADDRESS.LABEL}
        placeholder={FIELDS.CURRENT_ADDRESS.PLACEHOLDER}
        value={formData[FIELDS.CURRENT_ADDRESS.SLUG]}
        updateValue={dispatch}
      />
      <TextInput
        slug={FIELDS.NEW_ADDRESS.SLUG}
        label={FIELDS.NEW_ADDRESS.LABEL}
        placeholder={FIELDS.NEW_ADDRESS.PLACEHOLDER}
        value={formData[FIELDS.NEW_ADDRESS.SLUG]}
        updateValue={dispatch}
      />
      <label htmlFor={FIELDS.DATE.SLUG}>{FIELDS.DATE.LABEL}</label>
      <input
        type="date"
        id={FIELDS.DATE.SLUG}
        name={FIELDS.DATE.SLUG}
        defaultValue={CURRENT_DATE}
        min={CURRENT_DATE}
        onChange={(e) =>
          dispatch({ type: FIELDS.DATE.SLUG, value: e.target.value })
        }
      />
      <label htmlFor={FIELDS.SIZE.SLUG}>{FIELDS.SIZE.LABEL}</label>
      <select
        name={FIELDS.SIZE.SLUG}
        id={FIELDS.SIZE.SLUG}
        onChange={(e) =>
          dispatch({ type: FIELDS.SIZE.SLUG, value: e.target.value })
        }
      >
        {[...new Array(9)].map((_, i) => (
          <option key={i + 1} value={i + 1}>{`${i + 1} Bedrooms`}</option>
        ))}
      </select>
      <label htmlFor={FIELDS.INSTRUCTIONS.SLUG}>
        {FIELDS.INSTRUCTIONS.SLUG}
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
      />
      <TextInput
        slug={FIELDS.NAME.SLUG}
        label={FIELDS.NAME.LABEL}
        value={formData[FIELDS.NAME.SLUG]}
        updateValue={dispatch}
      />
      <TextInput
        slug={FIELDS.EMAIL.SLUG}
        label={FIELDS.EMAIL.LABEL}
        value={formData[FIELDS.EMAIL.SLUG]}
        updateValue={dispatch}
      />
      <TextInput
        slug={FIELDS.PHONE.SLUG}
        label={FIELDS.PHONE.LABEL}
        value={formData[FIELDS.PHONE.SLUG]}
        updateValue={dispatch}
      />
      <button type="submit">Request a price</button>
    </form>
  );
}

export default QuiteForm;
