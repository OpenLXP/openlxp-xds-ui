import PageWrapper from "./PageWrapper";

export default function ErrorPage({ children }) {
  return (
    <PageWrapper className="bg-body-gray">
      <div className="flex flex-col justify-center my-56 items-center">
        <div className="text-4xl">
          <ion-icon name="alert-circle-outline" />
        </div>
        {children}
      </div>
    </PageWrapper>
  );
}
