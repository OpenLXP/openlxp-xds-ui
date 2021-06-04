// import { render, act, screen, fireEvent } from "@testing-library/react";
// import { unmountComponentAtNode } from "react-dom";
// import store from "../../store/store";
// import { MemoryRouter, StaticRouter } from "react-router-dom";
// import { Provider } from 'react-redux';

// import CourseInformation from "./CourseInformation";
// import axios from "axios";

// let container = null;
// let state = null;
// let courseObj = null;
// // const useSelectorMock = jest.spyOn(redux, 'useSelector');

// beforeEach(() => {
//     container = document.createElement("div");
//     document.body.appendChild(container);
//     courseObj = {
//         Course: {
//             CourseTitle: "Title1",
//             CourseFullDescription: "Random Course Description",
//             DepartmentName: "Department1"
//         },
//         meta: {
//             id: 51
//         }
//     }
//     state = {
//         configuration: {
//             id: 1,
//             search_sort_options: [
//                 {
//                     display_name: "Course Date",
//                     field_name: "Lifecycle.CourseDate",
//                     active: true,
//                     xds_ui_configuration: 1
//                 }
//             ],
//             course_highlights: [
//                 {
//                     display_name: "Start Date",
//                     field_name: "GeneralInformation.StartDate",
//                     active: true,
//                     xds_ui_configuration: 1,
//                     highlight_icon: "clock"
//                 }
//             ],
//             created: "2021-05-20T01:24:29.082370Z",
//             modified: "2021-05-20T13:10:35.608284Z",
//             search_results_per_page: 10,
//             course_img_fallback: "/media/images/elearning_KpJuxw0.jpeg"
//         },
//         status: 'succeeded',
//         error: null
//     }
//     // useSelectorMock.mockClear();
// });

// afterEach(() => {
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
// });

// jest.mock("axios");

// describe("CourseInformation", () => {
//     test("should render related course when given data", async () => {
//         const data = {
//             hits: [
//                 {
//                     Course: {
//                         CourseTitle: "Title1",
//                         CourseProviderName: "Provider1",
//                         DepartmentName: "Department1",
//                     },
//                     Technical_Information: {
//                         Thumbnail: "Test",
//                     },
//                     meta: {
//                         index: "test-index",
//                         id: "1",
//                         score: 1,
//                         doc_type: "_doc"
//                     }
//                 },
//             ],
//         };

//         const resp = { data: data };
//         axios.get.mockResolvedValueOnce(resp);

//         await act(async () => {
//             render(
//                 <Provider store={store}>
//                     <StaticRouter initialEntries={["/search/?keyword=business"]} location={{pathname:"/CourseInformation", state:data}}>
//                         <CourseInformation />
//                     </StaticRouter>
//                 </Provider>
//             );
//         });
//         screen.getByText("Related");
//         screen.getByText("Title1");
//         screen.getByText("Provider1");
//         screen.getByText("Department1");
//     });

//     it("should render course when given data", async () => {
//         const data = {
//             hits: [
//                 {
//                     Course: {
//                         CourseProviderName: "TEST",
//                         DepartmentName: "TEST",
//                         EducationalContext: " ",
//                         CourseCode: "Random_code",
//                         CourseTitle: "Test Course 1",
//                         CourseDescription: "Test Description",
//                         CourseAudience: "Test_audience",
//                         CourseSectionDeliveryMode: "Online"
//                     },
//                     Lifecycle: {
//                         Provider: "Test_Provider",
//                         Maintainer: "Test_maintainer",
//                         OtherRole: "Test"
//                     },
//                     meta: {
//                         index: "test-index",
//                         id: "1",
//                         score: 1,
//                         doc_type: "_doc"
//                     }
//                 },
//                 {
//                     Course: {
//                         CourseProviderName: "TEST",
//                         DepartmentName: "TEST",
//                         EducationalContext: " ",
//                         CourseCode: "Random_code",
//                         CourseTitle: "Test Course 1",
//                         CourseDescription: "Test Description",
//                         CourseAudience: "Test_audience",
//                         CourseSectionDeliveryMode: "Online"
//                     },
//                     Lifecycle: {
//                         Provider: "Test_Provider",
//                         Maintainer: "Test_maintainer",
//                         OtherRole: "Test"
//                     },
//                     meta: {
//                         index: "test-index",
//                         id: "2",
//                         score: 1,
//                         doc_type: "_doc"
//                     }
//                 },
//                 {
//                     Course: {
//                         CourseProviderName: "TEST",
//                         DepartmentName: "TEST",
//                         EducationalContext: " ",
//                         CourseCode: "Random_code",
//                         CourseTitle: "Test Course 1",
//                         CourseDescription: "Test Description",
//                         CourseAudience: "Test_audience",
//                         CourseSectionDeliveryMode: "Online"
//                     },
//                     Lifecycle: {
//                         Provider: "Test_Provider",
//                         Maintainer: "Test_maintainer",
//                         OtherRole: "Test"
//                     },
//                     meta: {
//                         index: "test-index",
//                         id: "3",
//                         score: 1,
//                         doc_type: "_doc"
//                     }
//                 },
//             ],
//             total: 3,
//             aggregations: {}
//         };
//         const resp = { data: data };
//         // useSelectorMock.mockReturnValue(state);
//         axios.get.mockResolvedValueOnce(resp);

//         await act(async () => {
//             render(
//                 <Provider store={store}>
//                     <MemoryRouter initialEntries={[{pathname: "/course/3", state: {courseData: data} }]}>
//                         <CourseInformation />
//                     </MemoryRouter>
//                 </Provider>

//                 , container);
//         });

//         //screen.debug();

//     });
// });
