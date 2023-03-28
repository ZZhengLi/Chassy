import BottomNav from "./BottomNav";

const Setting = () => {
  return (
    <div className="bg-[#F9F5EC]">
      <div className="flex flex-row p-5">
        <h1 className="text-3xl font-bold text-[#484542] mx-5 pt-10 pb-2">
          ตั้งค่า
        </h1>
      </div>
      <BottomNav name="Setting" />
    </div>
  );
};

export default Setting;
