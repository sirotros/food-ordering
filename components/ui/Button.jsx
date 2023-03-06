const Button = ({ size, children }) => {
  const renderClasses = `btn-primary ${size} `;
  return <div className={renderClasses}>{children}</div>;
};
export default Button;
