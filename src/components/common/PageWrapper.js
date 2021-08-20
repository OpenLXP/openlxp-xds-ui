const PageWrapper = (props) => {
    const style = `px-2 relative ${props.className}`;

    return (
        <div className="px-4 md:px-24 lg:px-32 xl:px-56 bg-transparent">
            <div className={style}>{props.children}</div>
        </div>
    );
};

export default PageWrapper;
