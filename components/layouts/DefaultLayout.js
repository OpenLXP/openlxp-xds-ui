import Header from "../Header";

export default function DefaultLayout({ children }) {
  return (
    <div className={"relative min-h-screen"}>
      <Header/>
      <div className={"max-w-7xl mx-auto px-4 sm:px-4 lg:px-8"}>
        {children}
      </div>
      <div className={"absolute bottom-0"}>test</div>
    </div>
  );
}
