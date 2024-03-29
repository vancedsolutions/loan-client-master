"use client";
// @ts-ignore
import React, {
  FormEventHandler,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { MonitorReportForm } from "@/components/business-account-elements/monitor.report.form";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import PersonIcon from "@mui/icons-material/Person";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { ApiCalls } from "@/api/calls/calls";
import Cookies from "js-cookie";
// @ts-ignore
import { useRouter } from "next/navigation";
interface Option {
  label: string;
}
export const UsersList = () => {
  const router = useRouter();
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const options: any = {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiCalls.Users();
        setData(data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);
  console.log(data);
  return (
    <>
      <div className="flex w-[80%] ml-[10%] mt-10 justify-center content-center items-center flex-col gap-[16px]">
        <div className="flex flex-col w-full px-4 justify-start border-2 border-blue-600 rounded-2xl pt-8 pb-16 h-[85vh] overflow-hidden">
          <div>
            <div className="flex mb-8  items-center flex-wrap">
              <div className="flex mt-8">
                <div className="mr-3">
                  <button className="business-page-sort-btn ">
                    <AddRoadIcon />
                    Sort by A To Z <KeyboardArrowDownIcon />
                  </button>
                </div>
                <div>
                  <button className="business-page-sort-btn">
                    <CalendarMonthIcon />
                    Sort by Date
                    <KeyboardArrowDownIcon />
                  </button>
                </div>
              </div>
              <div className="flex ml-auto items-center mt-8">
                <div className="mr-2 ">
                  <input
                    type="text"
                    placeholder="Search by name"
                    className="business-page-searchname-input"
                  />
                </div>
                <div>
                  <button className="business-page-blue-btn">
                    Add Clients
                  </button>
                </div>
              </div>
            </div>
            <div className=" table-responsive h-[68vh] pr-1">
              <table className="w-full text-center border-separate border-spacing-y-7 business-page-table">
                <tr>
                  <th className="business-page-border-right">FIRST NAME</th>
                  <th className="business-page-border-right">LAST NAME</th>
                  <th className="business-page-border-right">EMAIL</th>
                  <th className="business-page-border-right">DATE</th>
                  <th className="business-page-border-right">FUNDING STATUS</th>
                  <th>VIEW PROFILE</th>
                </tr>
                {data &&
                  data.map((val: any) => (
                    <tr
                      onClick={() => {
                        Cookies.set("id", val._id);
                        router.replace("/step1/build-business-credit");
                        console.log(Cookies.set("id", val._id));
                      }}
                    >
                      <td className="business-page-showdata">
                        {val.firstName}
                      </td>
                      <td className="business-page-showdata">{val.lastName}</td>
                      <td className="business-page-showdata">
                        {val.user_id.email}
                      </td>
                      <td className="business-page-showdata">
                        {formatDate(val.dob)}
                      </td>
                      <td className="business-page-showdata">{val.status}</td>
                      <td className="business-page-showdata  business-page-viewprofile-section">
                        <div className="flex gap-[25px] flex-wrap">
                          <PersonIcon />
                          <ControlPointIcon />
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
          </div>

          {/* <div>
          <div className="flex flex-col w-[85%] mt-16 mx-auto">
            <div className="text-center ">RECENT NOTE</div>
            <div className="flex w-full flex-row flex-nowrap justify-center mt-10  gap-4 ">
              <div className="flex w-[33%] ">
                  <p>tt - Coaching call to help move forward. Stated that he already canceled his subscription and no longer part of the company. Advice to call us if help is needed.</p>
              </div>
              <div className="flex w-[33%] ">
                <p>tt - Coaching call to help move forward. Stated that he already canceled his subscription and no longer part of the company. Advice to call us if help is needed.</p>
              </div>
              <div className="flex w-[33%] ">
                  <p>tt - Coaching call to help move forward. Stated that he already canceled his subscription and no longer part of the company. Advice to call us if help is needed.</p>
              </div>
            </div>
          </div>
        </div> */}
        </div>
        <div>
          <div className="text-center">
            <div className="inline-block">
              <p className="text-xl font-bold " style={{ color: "#333333" }}>
                Recent Note
              </p>
              <div className="business-page-dashboard-border-bottom"></div>
            </div>
          </div>

          <div className="flex flex-row flex-wrap justify-center gap-20  mt-12">
            <div
              className="flex flex-col w-60 border-2 border-blue-400 rounded-2xl p-6 relative"
              style={{
                border: "none",
                backgroundColor: "#FDFDFD",
                borderRadius: "26px",
              }}
            >
              <img
                src={"/dashboard-img.png"}
                alt=""
                style={{
                  width: "40px",
                  position: "absolute",
                  top: "-24px",
                  left: "5px",
                  zIndex: "9",
                }}
              />
              <div className="business-page-left-top-box"></div>
              <div className="business-page-right-top-box"></div>
              <div className="business-page-left-bottom-box"></div>
              <div className="business-page-right-bottom-box"></div>
              <p
                className="text-xs text-justify mb-5"
                style={{ color: "#737373" }}
              >
                tt - Coaching call to help move forward. Stated that he already
                canceled his subscription and no longer part of the company.
                Advice to call us if help is needed.
              </p>
              <p
                className="text-xs pt-5 font-medium"
                style={{ borderTop: "1px solid #D8D8D8", color: "#737373" }}
              >
                Rochelle Gandamra
                <span
                  style={{
                    color: "#C0C0C0",
                    fontWeight: "400",
                    marginLeft: "10px",
                  }}
                >
                  AT 20.49 OCT25,2022
                </span> 
              </p>
            </div>
            <div
              className="flex flex-col w-60 border-2 border-blue-400 rounded-2xl p-6 relative"
              style={{
                border: "none",
                backgroundColor: "#FDFDFD",
                borderRadius: "26px",
              }}
            >
              <img
                src={"/dashboard-img.png"}
                alt=""
                style={{
                  width: "40px",
                  position: "absolute",
                  top: "-24px",
                  left: "5px",
                  zIndex: "9",
                }}
              />
              <div className="business-page-left-top-box"></div>
              <div className="business-page-right-top-box"></div>
              <div className="business-page-left-bottom-box"></div>
              <div className="business-page-right-bottom-box"></div>
              <p
                className="text-xs text-justify mb-5"
                style={{ color: "#737373" }}
              >
                tt - Coaching call to help move forward. Stated that he already
                canceled his subscription and no longer part of the company.
                Advice to call us if help is needed.
              </p>
              <p
                className="text-xs pt-5 font-medium"
                style={{ borderTop: "1px solid #D8D8D8", color: "#737373" }}
              >
                Rochelle Gandamra
                <span
                  style={{
                    color: "#C0C0C0",
                    fontWeight: "400",
                    marginLeft: "10px",
                  }}
                >
                  AT 20.49 OCT25,2022
                </span>
              </p>
            </div>
            <div
              className="flex flex-col w-60 border-2 border-blue-400 rounded-2xl p-6 relative"
              style={{
                border: "none",
                backgroundColor: "#FDFDFD",
                borderRadius: "26px",
              }}
            >
              <img
                src={"/dashboard-img.png"}
                alt=""
                style={{
                  width: "40px",
                  position: "absolute",
                  top: "-24px",
                  left: "5px",
                  zIndex: "9",
                }}
              />
              <div className="business-page-left-top-box"></div>
              <div className="business-page-right-top-box"></div>
              <div className="business-page-left-bottom-box"></div>
              <div className="business-page-right-bottom-box"></div>
              <p
                className="text-xs text-justify mb-5"
                style={{ color: "#737373" }}
              >
                tt - Coaching call to help move forward. Stated that he already
                canceled his subscription and no longer part of the company.
                Advice to call us if help is needed.
              </p>
              <p
                className="text-xs pt-5 font-medium"
                style={{ borderTop: "1px solid #D8D8D8", color: "#737373" }}
              >
                Rochelle Gandamra
                <span
                  style={{
                    color: "#C0C0C0",
                    fontWeight: "400",
                    marginLeft: "10px",
                  }}
                >
                  AT 20.49 OCT25,2022
                </span>
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button className="business-page-close-btn">Close</button>
          </div>
        </div>
      </div>
    </>
  );
};
