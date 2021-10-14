export default function TitleInput({ titleValue, onChange }) {
  return (
    <div className="font-semibold text-2xl flex justify-start items-center">
      <label htmlFor="queryName">Editing:</label>
      <input
        name="name"
        className="font-semibold text-2xl bg-transparent focus:ring-2 ring-light-blue rounded-md outline-none pl-2"
        type="text"
        value={ titleValue }
        placeholder='Custom Search Name'
        onChange={onChange}
      />
    </div>
  );
}
