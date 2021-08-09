import classes from "../CourseInformation.module.css";
import { useSelector } from "react-redux";
import ExpPreviewPanel from "./../../SearchResultsPage/ExpPreviewPanel/ExpPreviewPanel";


const CourseImage = (props) => {
  // const img = props.img;
  // if (!img) {
  //   return (
  //     <div
  //       data-testid="image"
  //       className={
  //         "w-64 h-32 bg-gradient-to-br from-base-blue to-dark-blue rounded-md"
  //       }
  //     />
  //   );
  // }
  // return <img className="rounded-sm" src={img} alt={"Course"} />;

  const exp = props.coursesInfo.data;
  const { configuration } = useSelector((state) => state.configuration);
  const backendHost = process.env.REACT_APP_BACKEND_HOST;

  if (exp.Technical_Information && exp.Technical_Information.Thumbnail) {
  return (
    <ExpPreviewPanel
      expObj={exp}
      imgLink={exp.Technical_Information.Thumbnail}
    />
  );
  } else {
    if (configuration && configuration.course_img_fallback) {
      return (
        <ExpPreviewPanel
          expObj={exp}
          imgLink={backendHost + configuration.course_img_fallback}
        />
      );
    } else {
      return (
        <ExpPreviewPanel 
          expObj={exp} 
          />
      );
    }
  }
};

export default CourseImage;
