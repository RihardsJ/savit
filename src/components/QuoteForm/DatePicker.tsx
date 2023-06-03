import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import configs from '../../configs';

const {
  FIELDS,
  TODAY,
  STYLE: { DATEPICKER_CSS, CLASSNAME },
} = configs;

interface DatePickerProps {
  selectedDate: Date;
  reservedDates: Date[];
  changeDate: (date: Date) => void;
}

function DatePicker({
  selectedDate,
  reservedDates,
  changeDate,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleDatePick(date: Date) {
    changeDate(date);
    setIsOpen(false);
  }

  return (
    <>
      <label htmlFor={FIELDS.DATE.SLUG} className={CLASSNAME.LABEL}>
        {FIELDS.DATE.LABEL}
      </label>
      <style>{DATEPICKER_CSS}</style>
      <button
        id="date-picker"
        className={`${CLASSNAME.TEXT_INPUT} cursor-pointer`}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((currentState) => !currentState);
        }}
      >
        {`${selectedDate.toDateString()}  🗓️`}
      </button>
      <Tooltip
        anchorSelect="#date-picker"
        clickable
        openOnClick={true}
        isOpen={isOpen}
      >
        <DayPicker
          mode="single"
          required
          fromDate={TODAY}
          disabled={reservedDates}
          selected={selectedDate}
          onDayClick={handleDatePick}
        />
      </Tooltip>
    </>
  );
}

export default DatePicker;
