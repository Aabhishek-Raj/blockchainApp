import { ChangeEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { money } from "../assets";
import { CustomButton, FormField } from "../components";
import { checkIfImage } from "../utils";

import { useStateContext } from "../context";

export type FormDataType = {
  name: string;
  title: string;
  description: string;
  target: Number;
  deadline: Number;
  image: string;
};

const CreateCampaign = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { createCampaign } = useStateContext();

  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (
    fieldName: string,
    e: ChangeEvent<HTMLInputElement>
) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    checkIfImage(form.image, async (exist: boolean) => {
      if (exist) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Provide valid image url");
        setForm({ ...form, image: "" });
      }
    });
  };

  const content = (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && "Loader..."}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-serif font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("name", e)
            }
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("title", e)
            }
          />
        </div>
        <FormField
          labelName="Story *"
          placeholder="Write a your story"
          isTextArea
          value={form.description}
          handleChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFormFieldChange("description", e)
          }
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="_money_"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-serif font-bold text-[24px] text-white ml-[20px] ">
            You will get 100% of the raised amount
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("target", e)
            }
          />
          <FormField
            labelName="End Date*"
            placeholder="End date"
            inputType="date"
            value={form.deadline}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("deadline", e)
            }
          />
        </div>
        <FormField
          labelName="Campaign image*"
          placeholder="Place image url of ur campaign"
          inputType="url"
          value={form.image}
          handleChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFormFieldChange("image", e)
          }
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );

  return content;
};

export default CreateCampaign;
