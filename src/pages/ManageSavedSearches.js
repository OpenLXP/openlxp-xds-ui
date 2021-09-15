import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Title } from "../components/common/text/text";
import PageWrapper from "../components/common/PageWrapper";
import SavedSearchCard from "../components/SavedSearchesPage/SavedSearchCard";
import axios from "axios";

export default function ManageSavedSearches() {
  const { user } = useSelector((state) => state.user);
  const [searches, setSearches] = useState([]);

  const getSavedSearches = () => {
    const url = process.env.REACT_APP_BACKEND_HOST + "/api/saved-filters/owned";
    const headers = {
      Authorization: "Token " + user?.token,
    };
    axios
      .get(url, { headers: headers })
      .then((resp) => {
        console.log(resp);
        // sort the lists by name
        let data = resp.data;
        data = data.sort((a, b) => {
          if (a.name < b.name) return -1;
        });
        setSearches(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSavedSearches();
  }, []);

  return (
    <PageWrapper>
      <div className="py-8">
        <Title title="Your Saved Searches" />
        <div className='flex flex-col gap-4 mt-2'>
          {searches?.map((search) => {
            return (
              <SavedSearchCard
                savedSearch={search}
                getSavedSearches={getSavedSearches}
                userToken={user.token}
              />
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
