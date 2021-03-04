export default function Input(props) {
  return (
    <div className={`form-group ${props.className}`}>
      <label htmlFor={props.name}>{props.name}</label>
      <input
        type={props.type ? props.type : "text"}
        name={props.name}
        required={props.required}
        onChange={props.handleChange}
        value={props.value}
        disabled={props.disabled}
      />
    </div>
  );
}
