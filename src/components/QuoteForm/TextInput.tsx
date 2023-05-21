import configs from '../../configs';

const {
  STYLE: { CLASSNAME },
} = configs;

interface UpdateValue {
  type: string;
  value: string;
}

export interface InputProps {
  slug: string;
  label: string;
  placeholder?: string;
  value: string;
  updateValue: (obj: UpdateValue) => void;
}

function TextInput({
  slug,
  label,
  placeholder,
  value,
  updateValue,
}: InputProps) {
  return (
    <>
      <label htmlFor={slug} className={CLASSNAME.LABEL}>
        {label}
      </label>
      <input
        type="text"
        id={slug}
        name={slug}
        placeholder={placeholder}
        required
        value={value}
        onChange={(e) => updateValue({ type: slug, value: e.target.value })}
        className={CLASSNAME.TEXT_INPUT}
      />
    </>
  );
}

export default TextInput;
