/**
 * @param { function } onClick - Handles what happens on click
 * @param { string } title title - Title of the button
 */

const Button = (props) => {
    const style = `py-1 px-3 text-center shadow-sm text-white bg-base-blue rounded-md cursor-pointer whitespace-nowrap text-base font-medium hover:bg-dark-blue hover:bg-opacity-90 transition-colors duration-300 ease-in-out ${props.className}`;
    return (
        <div className={style} onClick={props.onClick}>
            {props.title}
        </div>
    );
};

export default Button;
