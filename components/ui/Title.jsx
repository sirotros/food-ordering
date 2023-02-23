const Title = ({ children, className }) => {
    return (
        <div className={`font-dancing font-bold ${className}`}>
            {children}
        </div>
    );
}
export default Title