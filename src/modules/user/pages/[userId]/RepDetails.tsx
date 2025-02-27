import { Box } from "@mui/material";
import LogTable from "@src/shared/components/LogTable";
import UserNav from "../../components/UserNav";
import { UserService } from "../../services/user.service";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import dayjs from "dayjs";
import RepCard from "../../components/RepCard";

type ActivityType =
  | "login-event"
  | "update"
  | "download"
  | "payment-made"
  | "document-viewed";

const types: Record<ActivityType, string> = {
  "login-event": "Login Event",
  update: "Update",
  download: "Download",
  "payment-made": "Payment Made",
  "document-viewed": "Document Viewed",
};

const RepDetails = () => {
  const { getUserRep } = UserService();
  const activityTypes = useMemo(() => types, []);

  const params = useParams();
  const [rep, setRep] = useState({
    id: "",
    firstName: "",
    lastName: "",
    photoUrl: "",
    roles: [""],
    phoneNumber: "",
    dateOfBirth: "",
    account: { email: "", status: "" },
    logs: [],
    locations: [],
  });
  const [logs, setLogs] = useState([
    {
      date: "",
      time: "",
      activityType: "",
      details: "",
    },
  ]);

  const columns = [
    { header: "Date", label: "date" },
    { header: "Time", label: "time" },
    { header: "Activity Type", label: "activityType" },
    { header: "Details", label: "details" },
  ];

  useEffect(() => {
    async function fetchUser() {
      const response = await getUserRep(params?.userId || "");
      if (response.success) {
        setRep(response.data);
      }
    }
    fetchUser();
  }, [params]);

  useEffect(() => {
    if (rep.logs.length > 0) {
      const formattedLogs = rep.logs.map((log: any) => {
        return {
          date: dayjs.unix(Number(log.createdAt)).format("DD MMM YYYY"),
          time: dayjs.unix(Number(log.createdAt)).format("HH:mm"),
          activityType: activityTypes[log.activityType as ActivityType],
          details: log.description,
        };
      });
      setLogs(formattedLogs);
    }
  }, [rep, activityTypes]);

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
      <UserNav routes={["User Management", "User Details"]} />
      <RepCard
        id={rep.id}
        firstName={rep.firstName}
        lastName={rep.lastName}
        photoUrl={rep.photoUrl}
        email={rep.account.email}
        phoneNumber={rep.phoneNumber}
        dateOfBirth={rep.dateOfBirth}
        location={
          rep.locations.length ? rep.locations.join(", ") : "No Location"
        }
        status={rep.account.status}
      />
      <LogTable columns={columns} data={logs} />
    </Box>
  );
};
export default RepDetails;
