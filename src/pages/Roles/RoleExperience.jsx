import React, { useEffect, useState } from "react";
import { getRolesSkillsAndExperience } from "../../sdk/survey";
import { toast } from "react-toastify";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { BarChart, Bar } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const RoleExperience = () => {
  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [vendorExperience, setVendorExperience] = useState([]);
  const fetchRoleAndExperienceData = async () => {
    try {
      const response = await getRolesSkillsAndExperience();
      setRoles(response.data.message.roleDistribution);
      let newSkills = response.data.message.skillsRequired.map((skill) => {
        return {
          ...skill,
          skill: skill.skill.trim() === "" ? "Others" : skill.skill,
        };
      });
      setSkills(newSkills);
      let vendorExperienceData = response?.data?.message?.vendorExperience;
      if (vendorExperienceData) {
        const vendorData = Object.keys(vendorExperienceData).map((key) => ({
          experience: key,
          yes: vendorExperienceData[key].yes,
          no: vendorExperienceData[key].no,
        }));
        console.log(vendorData);
        setVendorExperience(vendorData);
      } else {
        console.warn("vendorExperienceData is undefined.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchRoleAndExperienceData();
  }, []);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#0591B2",
    "#04966A",
    "#E53E3E",
  ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        className="text-[12px] font-bold"
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const LabelBar = () => (
    <div
      className=" flex-wrap w-[80%] mx-auto"
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      {skills.map((entry, index) => (
        <div
          key={`label-bar-${index}`}
          style={{ marginRight: "20px", display: "flex", alignItems: "center" }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: COLORS[index % COLORS.length],
              marginRight: "5px",
            }}
            key={`color-box-${index}`}
          />
          <span className="text-[12px]" key={`label-text-${index}`}>
            {entry.skill}
          </span>
        </div>
      ))}
    </div>
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #cccccc",
            padding: "5px",
          }}
        >
          <p>{`Skill: ${payload[0].payload.skill}`}</p>
          <p>{`Count: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const NewCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #cccccc",
            padding: "5px",
          }}
        >
          <p>{`Experience: ${label}`}</p>
          <p>{`Yes: ${payload[0].value}`}</p>
          <p>{`No: ${payload[1].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const camelCaseToCapitalized = (text) => {
    return text
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="p-[20px] w-full h-full overflow-y-auto">
      <p className="font-bold text-[16px] mb-[20px]">
        Roles, skills and experience data
      </p>
      <div className="w-full flex justify-around">
        <div className="h-[600px] bg-white p-[20px] mb-[20px] w-[28%] flex flex-col justify-center gap-[20px]">
          <p className="text-center">Skills distribution</p>
          <LabelBar />
          <ResponsiveContainer width="100%" height="80%">
            <PieChart width={400} height={400}>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={skills}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={140}
                fill="#8884d8"
                dataKey="count"
              >
                {skills.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="h-[600px] bg-white px-[20px] w-[70%] flex flex-col justify-center gap-[20px]">
          <p className="text-center">Roles distribution</p>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart
              width={500}
              height={300}
              data={roles}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="role" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="w-full flex justify-start">
        <div className="h-[600px] bg-white p-[20px] w-[100%] flex flex-col justify-center gap-[20px]">
          <p className="text-center">
            Do you have experience in dealing with vendors
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={vendorExperience}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="experience"
                tickFormatter={camelCaseToCapitalized}
              />
              <YAxis />
              <Tooltip content={<NewCustomTooltip />} />
              <Legend />
              <Bar dataKey="yes" fill="#82ca9d" />
              <Bar dataKey="no" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RoleExperience;
