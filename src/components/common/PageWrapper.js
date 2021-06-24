const PageWrapper = (props) => {
    return (
        <div className="px-4 md:px-24 lg:px-32">
            <div className="bg-white px-2">{props.children}</div>
        </div>
    );
};

export default PageWrapper;


