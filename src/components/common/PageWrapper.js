const PageWrapper = (props) => {
    const style = `bg-white px-2 ${props.className}`;

    return (
        <div className="px-4 md:px-24 lg:px-32">
            <div className={style}>{props.children}</div>
        </div>
    );
};

export default PageWrapper;
