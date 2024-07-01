import "./Button.scss"

const Button = ({ onClick, theme = "filled", type = "submit", color = "default", children }) => {
    const handleClick = (e) => {
        if (type === 'button') {
            e.preventDefault();
            onClick(e);
        }
    }


    return (
        <button onClick={handleClick} className={`button button--${theme} button--${color}`} type={type}>
            {children}
        </button>
    )
}

export default Button;