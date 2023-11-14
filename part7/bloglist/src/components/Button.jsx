const Button = ({ onClick, text, id }) => (
  <button onClick={onClick} id={id}>
    {text}
  </button>
);

export default Button;
