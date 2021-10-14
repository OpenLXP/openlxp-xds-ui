import DefaultLayout from "components/layouts/DefaultLayout";

export async function getServerSideProps({ query }) {

  console.log(query)

  return {
    props: {
      query
    }
  }

}


export default function Search({ query }) {
  console.log(query)
  return (
    <DefaultLayout>

    </DefaultLayout>
  );
}




