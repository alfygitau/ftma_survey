import React, { useEffect, useState } from "react";
import { getFSCByCounty } from "../../sdk/survey";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [countyDistribution, setCountyDistribution] = useState({});
  const [ageDistribution, setAgeDistribution] = useState({});
  const [valueChainDistribution, setValueChainDistribution] = useState({});
  const [educationLevelDistribution, setEducationLevelDistribution] = useState(
    {}
  );

  const fetchFscByParameters = async () => {
    try {
      const response = await getFSCByCounty();
      setCountyDistribution(response.data.message.countyDistribution);
      setAgeDistribution(response.data.message.ageGroupDistribution);
      setValueChainDistribution(response.data.message.valueChainDistribution);
      setEducationLevelDistribution(
        response.data.message.educationLevelDistribution
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchFscByParameters();
  }, []);

  const shortenLabel = (label) => {
    return label.length > 10 ? label.substring(0, 6) + "..." : label;
  };
  return (
    <div className="p-[20px] w-full h-full overflow-y-auto">
      <p className="text-[16px] font-bold mb-[20px]">Survey statistics</p>
      <div className="flex mb-[20px] justify-around">
        <div className="w-[49%] bg-white px-[20px] h-[600px] flex flex-col justify-center gap-[20px]">
          <p className="text-center">FSC Distribution by county</p>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart
              width={500}
              height={300}
              data={countyDistribution.details}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                style={{ fontSize: "14px" }}
                dataKey="county"
                tickFormatter={shortenLabel}
              />
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
        <div className="w-[49%] bg-white px-[20px] h-[600px] flex flex-col justify-center gap-[20px]">
          <p className="text-center">FSC Distribution by age</p>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart
              width={500}
              height={300}
              data={ageDistribution.details}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age_group" style={{ fontSize: "14px" }} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#00688B"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex mb-[20px] justify-around">
        <div className="w-[49%] bg-white px-[20px] h-[600px] flex flex-col justify-center gap-[20px]">
          <p className="text-center">FSC Distribution by value chains</p>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart
              width={500}
              height={300}
              data={valueChainDistribution.details}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="value_chain"
                style={{ fontSize: "14px" }}
                tickFormatter={shortenLabel}
              />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#355E3B"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="w-[49%] bg-white px-[20px] h-[600px] flex flex-col justify-center gap-[20px]">
          <p className="text-center">FSC Distribution by age</p>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart
              width={500}
              height={300}
              data={educationLevelDistribution.details}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="education_level" style={{ fontSize: "14px" }} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#320202"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
