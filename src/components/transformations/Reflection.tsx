import React from "react";

interface Props {
  reflectionAbout: string;
  setReflectionAbout: React.Dispatch<React.SetStateAction<string>>;
  setReflectChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Reflection: React.FC<Props> = ({
  reflectionAbout,
  setReflectionAbout,
  setReflectChecked,
}) => {
  const handleReflectionAboutChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReflectionAbout(event.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setReflectChecked(isChecked);
  };

  return (
    <div>
      <label className="inline-flex items-center m-2">
        <input
          type="checkbox"
          id="reflect-checkbox"
          className="form-checkbox h-5 w-5 text-indigo-600"
          onChange={handleCheckboxChange}
        />
        <span className="ml-2 text-gray-700">Reflect</span>
      </label>
      <hr />
      <div className="ml-9">
        About:
        <br />
        <label className="ml-2">
          <input
            type="radio"
            value="x-axis"
            checked={reflectionAbout === "x-axis"}
            onChange={handleReflectionAboutChange}
          />{" "}
          X-axis
        </label>
        <label className="ml-2">
          <input
            type="radio"
            value="y-axis"
            checked={reflectionAbout === "y-axis"}
            onChange={handleReflectionAboutChange}
          />{" "}
          Y-axis
        </label>
        <br />
        <label className="ml-2">
          <input
            type="radio"
            value="y=x"
            checked={reflectionAbout === "y=x"}
            onChange={handleReflectionAboutChange}
          />{" "}
          y = x
        </label>
        <label className="ml-4">
          <input
            type="radio"
            value="y=-x"
            checked={reflectionAbout === "y=-x"}
            onChange={handleReflectionAboutChange}
          />{" "}
          y = -x
        </label>
      </div>
      <hr className="border-t border-gray-300 my-4" />
    </div>
  );
};

export default Reflection;
