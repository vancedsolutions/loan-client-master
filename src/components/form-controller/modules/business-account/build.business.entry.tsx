"use client";
// @ts-ignore
import React, { useState } from "react";
import { MonitorReportForm } from "@/components/business-account-elements/monitor.report.form";
import { CheckBox, LineAxis } from "@mui/icons-material";
import { SubHeader } from "@/components/business-account-elements/sub.header";
import { ArrowLineText } from "@/components/business-account-elements/arrow.line.text";
import { VideoCard } from "@/components/cards/video-card";
import { ImportantInformation } from "@/components/business-account-elements/important.imformation";
import { Button, Input } from "@mui/material";
import { GeneralCard } from "@/components/cards/general.cad";
import { GotoWebsiteCard } from "@/components/cards/goto.website.card";
import { SubFormFooter } from "@/components/business-account-elements/sub.form.footer";
import { EditableContentRecord } from "@/components/business-account-elements/edaitable.content.record";
import { BlogCardLeft } from "@/components/cards/blog.card";
import { GotoWebsiteThreeCard } from "@/components/cards/goto.website.three.card";
import { SelectCard } from "@/components/cards/select.card";
import dayjs from "dayjs";
import { ApiCalls } from "@/api/calls/calls";
import { Calls } from "@/api/calls/type";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Spinner } from "@material-tailwind/react";

const headerContent = {
  step: "STPE1",
  title: "Fundability Foundation",
  subTitle: "BUSINESS ENTITY TYPE",
};

const videoConten = {
  title: "Watch Video Transcript:",
  videoUrl: "/business-account/address.png",
  content: "CHOOSE YOUR BUSINESS STRUCTURE",
};

const records = {
  title: "Your Details:",
  method: "Edit All",
  invidualRecords: [
    {
      title: "Entity Type:",
      icon: "",
      contents: [
        {
          recordName: "Corporation(S Or C)",
          iconName: "arrow",
        },
      ],
    },
    {
      title: "Industry:",
      icon: "",
      contents: [
        {
          recordName: "11210",
          iconName: "arrow",
        },
      ],
    },
    {
      title: "Date Incorporated",
      icon: "",
      contents: [
        {
          recordName: "9/18/2018",
          iconName: "date",
        },
      ],
    },
  ],
};

const contentSelect = {
  title:
    "Please indicate your response(Yes or No) for both of the following questionsbefore proceeding.",
  contents1:
    "Is the business address and ownership information accurate on your official documents? ",
  contents2:
    "Are the business address and ownership information accurate on your official documents? ",
};

const contentBlogCardLeft = {
  picture: "/business-account/estho.png",
  title: "FILE A BUSINESS ENTITY",
  content:
    "It’s important that you have a strong business foundation and it all starts with filing your business entity with your Secretary of State. Each state has a different filing and fee structure. Like a birth certificate is to an individual a business entity is the birth of a business.",
};

const informationResuorce = {
  title: "RESOURCES",
  content:
    "There is a lot that goes into a name! There is a lot that goes into a name! There is a lot that goes into a name! There is a lot that goes into a name!There is a lot that goes into a name!There is a lot that goes into a name!",
  color: "blue",
};

const footerContent = {
  content: "Return To Business Credit Builder",
  previous: true,
  next: true,
  url: "/step1/build-business-ein",
  preUrl: "/step1/build-business-address",
};

export const BuildBusinessEntry = () => {
  const [selectedValue, setSelectedValue] = useState<any>("");
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [bsPolicyOne, setbsPolicyOne] = useState<any>("");
  const [bsPolicyTwo, setbsPolicyTwo] = useState<any>("");
  const options = ["Option 1", "Option 2", "Option 3"]; // Example array of options
  const buildBusinessEntry = "buildBusinessEntry";
  const handleDateChange = (newValue: any) => {
    setSelectedDate(newValue); // Update the state with the selected date
    console.log("Selected date:", newValue); // Log the selected date
  };
  const handleChange = (event: any, index: any) => {
    debugger;
    const { value } = event.target;
    setSelectedValue((prevSelectedValues: any) => {
      const updatedSelectedValues = [...prevSelectedValues];
      updatedSelectedValues[index] = value;
      return updatedSelectedValues;
    });
    console.log("Selected value for index", index, value);
  };
  const handlePolicyOne = (event: string) => {
    if (event === "1") {
      setbsPolicyOne(true);
    } else {
      setbsPolicyOne(false);
    }
  };
  const handlePolicyTwo = (event: string) => {
    if (event === "1") {
      setbsPolicyTwo(true);
    } else {
      setbsPolicyTwo(false);
    }
  };
  const { mutateAsync, isPending } = useMutation<
    Calls.IResponse.Business,
    Error,
    Calls.IRequest.ModulesBusinessEntity
  >({
    mutationFn: async (variables) =>
      await ApiCalls.Module.businessEntry(variables),
    onSuccess: (r) => {
      toast.success(r.message);
    },
  });
  const handleOnSave = async (e: any) => {
    e.preventDefault();
    const data = await mutateAsync({
      entityType: selectedValue[0],
      industry: selectedValue[1],
      dateIncorporated: selectedDate,
      policyOne: bsPolicyOne,
      policyTwo: bsPolicyTwo,
    });
    return data;
  };
  return (
    <>
      <div className="flex flex-row w-[80%] ml-[10%] mt-10 justify-center border-2 border-blue-400 p-6 rounded-2xl">
        <div className="flex flex-col w-[76%] justify-start mt-6">
          <SubHeader content={headerContent} />
          <div className="flex flex-col w-full px-2 justify-center items-center content-center mt-6">
            <ArrowLineText
              type="flex flex-col w-[80%] text-center text-gray-700"
              content="DO YOU HAVE A BUSINESS ENTRY?"
            />
            {/* Vidio card */}
            <VideoCard videoContent={videoConten} />

            {/* edit your details */}
            <div className="flex flex-col w-[85%]">
              <EditableContentRecord
                records={records}
                selectedValue={selectedValue}
                options={options}
                handleChange={handleChange}
                buildBusinessEntry={buildBusinessEntry}
                handleDateChange={handleDateChange}
                selectedDate={selectedDate}
              />
            </div>
            {/* import Select Card */}
            <div className="flex flex-col w-[85%] mt-8">
              <SelectCard
                content={contentSelect}
                handleInput={handlePolicyOne}
                name={"business_entry"}
                bsEntry={bsPolicyOne}
                handleInputCard={handlePolicyTwo}
                bsCard={bsPolicyTwo}
              />
            </div>
            {/* save buttong */}
            <div className="flex w-52 mt-4">
              <Button
                placeholder="save the address"
                color="success"
                onClick={handleOnSave}
              >
                {isPending ? <Spinner /> : "SAVE"}
              </Button>
            </div>
            {/* Bolg section */}
            <div className="flex w-[80%] my-12">
              <BlogCardLeft content={contentBlogCardLeft} />
            </div>

            {/* general card */}
            <div className="flex flex-row w-[85%] mt-12">
              <div className="flex w-[50%] justify-center">
                <GeneralCard
                  icon="/business-account/search.svg"
                  content="Search secretary of state records"
                />
              </div>
              <div className="flex w-[50%] justify-center">
                <GeneralCard
                  icon="/business-account/Card.svg"
                  content="View Finance restricted industries"
                />
              </div>
            </div>

            {/* Resuouces importante */}
            <div className="flex w-full my-2">
              <ImportantInformation information={informationResuorce} />
            </div>

            {/* Website cards */}
            <div className="flex flex-row w-full mt-12">
              <div className="flex w-[50%] justify-center">
                <GotoWebsiteCard
                  content="Varies"
                  icon="/business-account/NorthOne.svg"
                />
              </div>
              <div className="flex w-[50%] justify-center">
                <GotoWebsiteCard
                  content="Varies"
                  icon="/business-account/MyCorporation.svg"
                />
              </div>
            </div>

            {/* footer  */}
            <SubFormFooter content={footerContent} />
          </div>
        </div>
        <div className="flex w-[24%]">
          <MonitorReportForm />
        </div>
      </div>
    </>
  );
};
