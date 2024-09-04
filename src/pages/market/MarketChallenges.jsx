import React, { useEffect, useState } from "react";
import { getChallengesInformation } from "../../sdk/survey";
import { toast } from "react-toastify";

const MarketChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const fetchChallenges = async () => {
    try {
      const response = await getChallengesInformation();
      setChallenges(response.data.message.inputsAccessChallenges);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);
  return (
    <div className="p-[20px] w-full h-full overflow-y-auto">
      <div className="flex my-[20px] items-center justify-between">
        <p className="text-[14px]">Market access challenges</p>
      </div>
      <div className="w-full">
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                Market Access Challenges
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            {challenges?.length > 0 &&
              challenges?.map((challenge) => (
                <tr>
                  <td class="px-6 py-4 border border-gray-300">
                    {challenge?.inputs_access_challenges.length > 0
                      ? challenge.inputs_access_challenges
                      : "Price fluctuations"}
                  </td>
                  <td class="px-6 py-4 border border-gray-300">
                    {challenge?.count}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketChallenges;
