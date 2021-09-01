export default function CreateButton({ isUpdating, onClick }) {
  return (
    <div
      className={`flex gap-1 justify-center items-centercursor-pointer px-2 py-1 rounded-md transition-colors duration-150 ease-in ${
        isUpdating
          ? "bg-gray-200 text-gray-600 border-gray-300 border-2 cursor-not-allowed"
          : "bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 border-green-200 border-2 cursor-pointer"
      }`}
      onClick={onClick}>
      <div
        className={`flex justify-center items-center ${
          isUpdating ? "animate-spin" : null
        }`}>
        <ion-icon
          name={isUpdating ? "refresh-outline" : `cloud-upload-outline`}
        />
      </div>
      Create
    </div>
  );
}
