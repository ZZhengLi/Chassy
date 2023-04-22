import React from "react";
import { useRouter } from "next/router";
import { MdOutlineArrowBack } from "react-icons/md";

export default function SignUp_OTP() {
  const router = useRouter();

  const handleChange = (e: {
    target: { maxLength: any; value: any; name: any };
  }) => {
    const { maxLength, value, name } = e.target;
    const [fieldName, fieldIndex] = name.split("-");

    let fieldIntIndex = parseInt(fieldIndex, 10);

    // Check if no of char in field == maxlength
    if (value.length >= maxLength) {
      // It should not be last input field
      if (fieldIntIndex < 6) {
        // Get the next input field using it's name
        const nextfield = document.querySelector(
          `input[name=field-${fieldIntIndex + 1}]`
        );

        // If found, focus the next field
        if (nextfield !== null) {
          (nextfield as HTMLElement).focus();
        }
      }
    }
  };

  return (
    <div className="bg-[#F9F5EC] h-screen">
      <div className="flex flex-row p-5">
        <MdOutlineArrowBack
          className="h-9 w-10 mt-8"
          onClick={() => router.back()}
        />
        <h1 className="text-3xl font-bold text-[#484542] ml-5 mt-8 font-prompt">
          ลงทะเบียน
        </h1>
      </div>

      <div className="pt-4 flex justify-center font-prompt">
        ส่ง OTP ไปยังเบอร์: xxxxxx2589
      </div>
      <div className="pt-4 pb-2 flex justify-center">
        <input
          className="m-2 border h-10 w-10 text-center form-control rounded"
          type="number"
          id="first"
          name="field-1"
          maxLength={1}
          onChange={handleChange}
        />
        <input
          className="m-2 border h-10 w-10 text-center form-control rounded"
          type="number"
          id="second"
          name="field-2"
          maxLength={1}
          onChange={handleChange}
        />
        <input
          className="m-2 border h-10 w-10 text-center form-control rounded"
          type="number"
          id="third"
          name="field-3"
          maxLength={1}
          onChange={handleChange}
        />
        <input
          className="m-2 border h-10 w-10 text-center form-control rounded"
          type="number"
          id="fourth"
          name="field-4"
          maxLength={1}
          onChange={handleChange}
        />
        <input
          className="m-2 border h-10 w-10 text-center form-control rounded"
          type="number"
          id="fifth"
          name="field-5"
          maxLength={1}
          onChange={handleChange}
        />
        <input
          className="m-2 border h-10 w-10 text-center form-control rounded"
          type="number"
          id="sixth"
          name="field-6"
          maxLength={1}
          onChange={handleChange}
        />
      </div>
      <div className=" pb-4 flex justify-center font-prompt">
        OTP หมดอายุภายใน 120 วิ
      </div>
      <div className="pt-4 pb-4 flex justify-center">
        <button
          className="bg-[#789BF3] h-12 hover:bg-[#789BF3] text-white font-bold font-prompt py-2 px-4 rounded items-center"
          onClick={() => {
            router.push("AddShop");
          }}
        >
          ขอ OTP ใหม่
        </button>
      </div>
    </div>
  );
}
