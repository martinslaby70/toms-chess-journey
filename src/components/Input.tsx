type InputProps = {
  onChange: (val: string) => void;
  value: string;
  label: string;
};

export const Input = (props: InputProps) => {
  return (
    <div className="form__group field">
      <input
        type="input"
        className="form__field"
        placeholder="Name"
        onChange={(e) => props.onChange(e.target.value || "")}
        value={props.value || ""}
      />
      <label className="form__label">{props.label}</label>
    </div>
  );
};
