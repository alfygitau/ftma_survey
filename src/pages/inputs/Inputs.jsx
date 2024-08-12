import React, { useEffect, useState } from "react";
import { getInputsInformation } from "../../sdk/survey";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Inputs = () => {
  const [farmInputs, setFarmInputs] = useState([]);
  const [allInputs, setAllInputs] = useState([]);
  const fetchInputsAnalysisData = async () => {
    try {
      const response = await getInputsInformation();
      const inputCount = {};
      response.data.message.inputsDistribution.forEach((entry) => {
        const inputs = entry.inputs_deals_with
          .split(",")
          .map((input) => input.trim().toLowerCase())
          .filter((input) => input !== "");

        inputs.forEach((input) => {
          if (inputCount[input]) {
            inputCount[input] += entry.count;
          } else {
            inputCount[input] = entry.count;
          }
        });
      });
      const sortedInputs = Object.entries(inputCount)
        .map(([input, count]) => ({ input, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      const allSortedInputs = Object.entries(inputCount)
        .map(([input, count]) => ({ input, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 100);

      setFarmInputs(sortedInputs);
      setAllInputs(allSortedInputs);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchInputsAnalysisData();
  }, []);
  return (
    <div className="p-[20px] w-full h-full overflow-y-auto">
      <p className="font-bold text-[16px] mb-[20px]">
        Whats kind of inputs do FSC's deal with?
      </p>
      <div>
        <div className="h-[600px] bg-white px-[20px] mb-[20px] w-[100%] flex flex-col justify-center gap-[20px]">
          <p className="text-center">Major farm inputs distribution</p>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart
              width={500}
              height={300}
              data={farmInputs}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="input" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="font-bold text-[16px] mb-[20px]">
            All inputs used by FSC's
          </p>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left px-4 py-2 border border-gray-200">
                  What kind of inputs do you deal with?
                </th>
                <th className="text-left px-4 py-2 border border-gray-200">
                  Count
                </th>
              </tr>
            </thead>
            <tbody>
              {allInputs.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 border border-gray-200">
                    {item.input || "N/A"}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {item.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inputs;
