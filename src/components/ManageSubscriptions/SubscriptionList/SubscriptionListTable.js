import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function SubscriptionListTable({ id, token }) {
  const [courses, setCourses] = useState([]);
  const history = useHistory();

  const viewCourse = (id) => {
    history.push(`/course/${id}`);
  };

  // on mount
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_INTEREST_LISTS_ALL}${id}`, {
        headers: { Authorization: "token " + token },
      })
      .then((response) => {
        setCourses(response.data.experiences);
      });
  }, []);

  return (
    <table className="min-w-full overflow-hidden rounded-md">
      <thead className="bg-gray-100">
        <tr className="text-left">
          <th className="tracking-wider pl-2 pr-6 py-2 ">Course Title</th>
          <th className="tracking-wider pl-2 pr-6 py-2">Provider</th>
          <th className="relative pl-2 pr-6 py-2">
            <span className="sr-only">view</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {courses?.map(({ Course, meta }, index) => {
          const { CourseTitle, CourseProviderName } = { ...Course };
          return (
            <tr className={`${index % 2 === 0 ? null : "bg-gray-50"} w-full`}>
              <td className="pl-2 pr-6 line-clamp-2" title={CourseTitle}>
                {CourseTitle}
              </td>
              <td className="px-2">{CourseProviderName}</td>

              <td className="text-green-600">
                <div className="flex justify-center">
                  <div
                    data-testid="courseRemove"
                    onClick={() => {
                      viewCourse(meta.metadata_key_hash);
                    }}
                    className={`cursor-pointer px-2 py-1 rounded-md text-center hover:bg-green-100 my-2 max-w-max`}>
                    View
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
