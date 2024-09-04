import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTrainingNeeds } from "../../sdk/survey";
import { Pagination } from "antd";

const TrainingNeeds = () => {
  const [trainingNeeds, setTrainingNeeds] = useState([]);
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const onPageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const fetchTrainingNeeds = async () => {
    try {
      const response = await getTrainingNeeds(currentPage, pageSize);
      setTrainingNeeds(response.data.message.data);
      setTotalCount(response.data.message.total_count);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchTrainingNeeds();
  }, [currentPage, pageSize]);

  return (
    <div className="p-[20px] w-full h-full overflow-y-auto">
      <div className="flex my-[20px] items-center justify-between">
        <p className="text-[14px]">Training needs</p>
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
                Training needs topic
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                Need scale
              </th>
            </tr>
          </thead>
          <tbody>
            {trainingNeeds?.length > 0 &&
              trainingNeeds?.map((item) => (
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
                    {item?.main_topic?.length > 0
                      ? item.main_topic
                      : "How to Uncover Needs in conflict situations"}
                  </td>
                  <td class="px-6 py-4 border border-gray-300">
                    {!item?.need_scale ? 5 : item.need_scale}
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

export default TrainingNeeds;
