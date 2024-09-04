import React, { useEffect, useState } from "react";
import { getTrainings } from "../../sdk/survey";
import { toast } from "react-toastify";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";

const Training = () => {
  const [trainings, setTrainings] = useState([]);
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const onPageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const fetchTrainings = async () => {
    try {
      const response = await getTrainings(currentPage, pageSize);
      setTrainings(response.data.message.data);
      setTotalCount(response.data.message.total_count);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, [currentPage, pageSize]);

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };
  return (
    <div className="p-[20px] w-full h-full overflow-y-auto">
      <div className="flex my-[20px] items-center justify-between">
        <p className="text-[14px]">Trainings</p>
        <p
          onClick={() => navigate("/dashboard/training-needs")}
          className="text-[14px] text-[#00ff] cursor-pointer underline"
        >
          Training needs assessment
        </p>
      </div>
      <div class="w-full">
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                Name
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                Ward
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                Value Chain
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                Training
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                Value Acquired
              </th>
            </tr>
          </thead>
          <tbody>
            {trainings.length > 0 &&
              trainings.map((item) => (
                <tr>
                  <td class="px-6 py-4 border border-gray-300">
                    {item?.first_name} {item?.last_name}
                  </td>
                  <td class="px-6 py-4 border border-gray-300">
                    {item?.ward_title}
                  </td>
                  <td class="px-6 py-4 border border-gray-300">
                    {item?.value_chain}
                  </td>
                  <td class="px-6 py-4 border border-gray-300">
                    {item?.training_title}
                  </td>
                  <td class="px-6 py-4 border border-gray-300">
                    {item?.value_obtained}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="w-full flex items-center my-[10px] justify-center">
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            total={totalCount}
            onChange={onPageChange}
            current={currentPage}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default Training;
