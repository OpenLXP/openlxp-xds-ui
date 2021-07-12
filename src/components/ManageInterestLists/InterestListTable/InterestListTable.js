const InterestListTable = (props) => {
  const courses = props.courses;

  if (courses) {
    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden  sm:rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Provider
                    </th>
                    
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Unsubscribe</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, personIdx) => (
                    <tr
                      key={course.email}
                      className={
                        personIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {course.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.provider}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          onClick={()=>props.handleRemovingCourse(course.id)}
                          className="text-red-600 hover:bg-red-100 px-2 py-2 rounded-md transition duration-200 ease-in-out "
                        >
                          Remove
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null
};
export default InterestListTable;
