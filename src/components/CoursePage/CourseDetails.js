export default function CourseDetail({ icon, label, value }) {
  const icons = {
    user: "person-outline",
    clock: "time-outline",
    calendar: "calendar-outline",
    location: "location-outline",
    hourglass: "hourglass-outline",
    multi_users: "people-outline",
  };

  // Returns the icon name to use from backend config
  const getIconNameToUse = (name) =>
    icons[name] ? icons[name] : icons["calendar"];

  return <div>
    <div className="flex flex-row items-center text-icon-blue gap-1">
      <ion-icon name={getIconNameToUse(icon)}/>
      {label && <h2 className="font-semibold font-sans">{label}</h2>}
    </div>
    <div className="border rounded-md px-2 py-1 text-sm min-w-full">
      {value === "" || !value ? "N/A" : value}
    </div>
  </div>
}