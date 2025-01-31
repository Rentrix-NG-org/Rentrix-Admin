import { Box } from "@mui/material";
import PaginationControl from "@src/modules/user/components/PaginationControl";
import UserNav from "@src/modules/user/components/UserNav";
import { UserService } from "@src/modules/user/services/user.service";
import LogTable from "@src/shared/components/LogTable";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ActivityLogs = () => {
  const params = useParams();
  const { getAllLogs } = UserService();
  const [logs, setLogs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<any[]>([]);

  const columns = [
    { header: "Date", label: "date" },
    { header: "Time", label: "time" },
    { header: "Activity Type", label: "activityType" },
    { header: "Details", label: "details" },
  ];

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await getAllLogs(params?.userId || "");
      if (response.success) {
        const parsed = (
          response.data as {
            createdAt: string;
            activityType: string;
            description: string;
          }[]
        ).map((log) => {
          return {
            date: dayjs(Number(log.createdAt)).format("DD MMM YYYY"),
            time: dayjs(Number(log.createdAt)).format("HH:mm"),
            activityType: log.activityType,
            details: log.description,
          };
        });
        setLogs(parsed);
      }
    };

    fetchLogs();
  }, []);

  useEffect(() => {
    const limit = 8;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedResults = logs.slice(start, end);
    setPaginatedData(paginatedResults);
  }, [logs, page]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "42.82px",
        px: "20px",
        gap: "25px",
      }}
    >
      {" "}
      <UserNav
        routes={["User Management", "User Details", "View All Activity Logs"]}
      />
      <Box>
        <LogTable columns={columns} data={paginatedData} />
      </Box>
      <PaginationControl data={logs} onPage={(page) => setPage(page)} />
    </Box>
  );
};
export default ActivityLogs;
