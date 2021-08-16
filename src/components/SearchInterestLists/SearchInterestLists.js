import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import PageWrapper from "../common/PageWrapper";

const testData = [
  { title: "title 1", owner: "list owner" },
  { title: "title 2", owner: "list owner 2" },
  { title: "title 3", owner: "list owner 3" },
  { title: "title 4", owner: "list owner 4" },
  { title: "title 5", owner: "list owner 5" },
  { title: "title 6", owner: "list owner 6" },
  { title: "title 7", owner: "list owner 7" },
  { title: "title 8", owner: "list owner 8" },
  { title: "title 9", owner: "list owner 9" },
  { title: "title 10", owner: "list owner 10" },
  { title: "title 11", owner: "list owner 11" },
  { title: "title 12", owner: "list owner 12" },
  { title: "title 13", owner: "list owner 13" },
  { title: "title 14", owner: "list owner 14" },
  { title: "title 15", owner: "list owner 15" },
  { title: "title 16", owner: "list owner 16" },
  { title: "title 17", owner: "list owner 17" },
  { title: "title 18", owner: "list owner 18" },
  { title: "title 19", owner: "list owner 19" },
  { title: "title 20", owner: "list owner 20" },
  { title: "title 21", owner: "list owner 21" },
  { title: "title 22", owner: "list owner 22" },
];

export default function SearchInterestLists() {
  const [origionalInterestLists, setOriginalInterestLists] = useState([]);
  const [interestLists, setInterestLists] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const { configuration } = useSelector((state) => state.configuration);

  // chunks array into sub chunks
  const chunkArray = (arr) => {
    let chunked = [];

    // copy the array
    let arrayCopy = [...arr];

    // while there is more to chunck.... just keep chunking
    while (arrayCopy.length > 0) {
      chunked.push(
        arrayCopy.splice(0, configuration?.search_results_per_page || 10)
      );
    }

    // the array of array's chuncked to have at most the desired size
    return chunked;
  };

  const filterArray = (origionalArr) => {
    const array = [...origionalArr];

    return array.filter(
      ({ title, owner }) => title.includes(search) || owner.includes(search)
    );
  };

  // On initial load
  // set the origional data
  // On cleanup
  // set the interest list
  useEffect(() => {
    // check if user is logged in

    // make api call to the

    // set the origional list set

    setOriginalInterestLists(testData);
    return () => {
      setInterestLists(chunkArray(testData));
    };
  }, [origionalInterestLists]);

  useEffect( () => {
    // filter through the array
    const filteredArray = filterArray(origionalInterestLists);
    // chunk the array into parts
    const chunked = chunkArray(filteredArray);
    // set the new interest list
    setInterestLists(chunked);
  }, [search]);

  return (
    <PageWrapper>
      <input
        type="text"
        className="shadow rounded-md w-full my-2 border-2 px-2"
        placeholder="search"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <div className="flex flex-row justify-end gap-5 my-2 pb-2">
        <div
          className={`${
            page < 1 && "invisible"
          } bg-base-blue text-white px-2 rounded-md select-none cursor-pointer`}
          onClick={() => {
            setPage(page - 1);
          }}>
          prev
        </div>
        <div className="select-none">{page + 1}</div>
        <div
          className={`${
            page === interestLists.length - 1 && "invisible"
          } bg-base-blue text-white px-2 rounded-md select-none cursor-pointer`}
          onClick={() => {
            setPage(page + 1);
          }}>
          next
        </div>
      </div>
      <div className="flex flex-col divide-y">
        {interestLists[page]?.map((list) => {
          return (
            <div className="flex flex-row justify-between items-center">
              <div>
                <div className="tracking-widest">{list.title}</div>
                <div className="tracking-widest">{list.owner}</div>
              </div>
              <div className="flex flex-row items-center bg-base-blue bg-opacity-10 text-base-blue px-2 rounded-md h-6 hover:bg-base-blue hover:bg-opacity-100 hover:text-white cursor-pointer transition-colors duration-300">
                Subscribe
              </div>
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
}
