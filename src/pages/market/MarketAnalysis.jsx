import React, { useEffect, useState } from "react";
import { getMarketInformation } from "../../sdk/survey";
import { toast } from "react-toastify";

const MarketAnalysis = () => {
  const [marketInfo, setMarketInfo] = useState([]);
  const fetchMarketAnalysisData = async () => {
    try {
      const response = await getMarketInformation();
      setMarketInfo(response.data.message.marketInformationDistribution);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchMarketAnalysisData();
  }, []);

  return (
    <div className="p-[20px] w-full h-full overflow-y-auto">
      <p className="font-semibold text-[16px] mb-[20px]">
        How FSC's access market information
      </p>
      <div className="w-full bg-white">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left px-4 py-2 border border-gray-200">
                How do the FSCs access market information?
              </th>
              <th className="text-left px-4 py-2 border border-gray-200">
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            {marketInfo.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 border border-gray-200">
                  {item.information_reception_method || "Others"}
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
  );
};

export default MarketAnalysis;
