export default function CourseImage({ image }) {
  return <img
    className="rounded-sm w-64 h-32"
    src={image}
    alt={"Course"}/>
}