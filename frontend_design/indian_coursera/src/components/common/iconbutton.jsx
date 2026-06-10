function Iconbutton({
  text,
  onClick,
  children,
  disabled,
  type,
  outline = false,
  customclasses="",
}) {
  return (
    <button
    disabled={disabled}
    onClick={onClick}
    type={type || "button"}
    className={customclasses}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : <span>{text}</span>}
    </button>
  );
}
export default Iconbutton;
