import { Box, Typography, useTheme } from "@mui/material";
import LogTable from "@src/shared/components/LogTable";
import UserNav from "../../components/UserNav";
import { UserService } from "../../services/user.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import dayjs from "dayjs";
import RepCard from "../../components/RepCard";
import { icons } from "@src/utils/icons";
import { useNavigate } from "react-router";
import { types } from "@src/modules/logs/types/log.types";
import TabNavigation from "../../components/TabNavigation";

const RepDetails = () => {
  const { getUserRep } = UserService();
  // const activityTypes = useMemo(() => types, []);

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
    bookInspections: [
      {
        id: "",
        start: {
          hour: "",
          minute: "",
        },
        end: {
          hour: "",
          minute: "",
        },
        selected: false,
        status: "",
        userId: "",
        date: "",
        listingId: "",
      },
    ],
    listings: [
      {
        id: "",
        name: "",
        owner: { firstName: "", lastName: "" },
        status: "",
      },
    ],
  });
  const [tabSelected, setTabSelected] = useState("Activity Logs");
  const [properties, setProperties] = useState([
    {
      propertyId: "",
      propertyName: "",
      owner: "",
      status: "",
    },
  ]);
  const [inspection, setInspection] = useState([
    {
      tenantId: "",
      propertyId: "",
      scheduledViewingTime: "",
      status: "",
    },
  ]);
  const [activityLogs, setActivityLogs] = useState([
    {
      date: "",
      time: "",
      activityType: "",
      details: "",
    },
  ]);

  const [logs, setLogs] = useState([]);

  const activity_columns: {
    label: string;
    header: string;
    type: "text" | "custom";
  }[] = [
    { header: "Date", label: "date", type: "text" },
    { header: "Time", label: "time", type: "text" },
    { header: "Activity Type", label: "activityType", type: "text" },
    { header: "Details", label: "details", type: "text" },
  ];
  const properties_column: {
    label: string;
    header: string;
    type: "text" | "custom";
  }[] = [
    { header: "Property ID", label: "propertyId", type: "text" },
    { header: "Property Name", label: "propertyName", type: "text" },
    { header: "Owner", label: "owner", type: "text" },
    { header: "Status", label: "status", type: "custom" },
  ];
  const inspection_column: {
    label: string;
    header: string;
    type: "text" | "custom";
  }[] = [
    { header: "Tenant ID", label: "tenantId", type: "text" },
    { header: "Property ID", label: "propertyId", type: "text" },
    {
      header: "Scheduled viewing Date/Time",
      label: "scheduledViewingDateTime",
      type: "text",
    },
    { header: "Status", label: "status", type: "custom" },
  ];
  const selectedColumn =
    tabSelected === "Activity Logs"
      ? activity_columns
      : tabSelected === "Properties"
        ? properties_column
        : tabSelected === "Inspection"
          ? inspection_column
          : [];

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
    if (tabSelected === "Activity Logs") {
      setLogs(activityLogs);
    } else if (tabSelected === "Properties") {
      setLogs(properties);
    } else if (tabSelected === "Inspection") {
      setLogs(inspection);
    }
  }, [tabSelected, activityLogs, properties, inspection]);

  useEffect(() => {
    if (rep.logs.length) {
      const formattedLogs = rep.logs.map((log: any) => {
        return {
          date: dayjs(Number(log.createdAt)).format("DD MMM YYYY"),
          time: dayjs(Number(log.createdAt)).format("HH:mm"),
          activityType: types[log.activityType],
          details: log.description || "None",
        };
      });
      setActivityLogs(formattedLogs);
    }

    if (rep.listings.length) {
      const formattedProperties = rep.listings.map((property: any) => {
        return {
          propertyId: property.id,
          propertyName: property.title,
          owner: `${property.owner.firstName} ${property.owner.lastName}`,
          status:
            property.status.charAt(0).toUpperCase() +
            property.status.slice(1).toLowerCase(),
        };
      });
      setProperties(formattedProperties);
    }

    if (rep.bookInspections) {
      const formattedInspections = rep.bookInspections.map((inspection) => {
        const startTime = dayjs()
          .hour(Number(inspection.start.hour))
          .minute(Number(inspection.start.minute))
          .format("HH:mm A");
        return {
          tenantId: inspection.userId,
          propertyId: inspection.listingId,
          scheduledViewingTime: `${inspection.date} ${startTime}`,
          status: inspection.status,
        };
      });

      setInspection(formattedInspections);
    }
  }, [rep]);

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

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
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
        <Options />
      </Box>

      <Box sx={{ display: "flex", gap: "32px" }}>
        <Typography sx={{ fontWeight: 700 }}>LAST SESSION DURATION</Typography>
        <Typography>2 hours 15 minutes</Typography>
      </Box>

      <TabNavigation
        tabs={["Activity Logs", "Properties", "Inspection"]}
        setTabSelected={setTabSelected}
        tabSelected={tabSelected}
      />

      <LogTable columns={selectedColumn} data={logs} />
    </Box>
  );
};
export default RepDetails;

const Options = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const buttons: {
    title: string;
    route?: string;
    icon?: string;
  }[] = [
    { title: "Change Role", route: "change-role", icon: icons.useradd },
    {
      title: "Change Location",
      route: "change-location",
      icon: icons.location,
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: 300,
        mr: 20,
      }}
    >
      {buttons.map(({ title, route, icon }) => (
        <Box
          sx={{
            height: "60px",
            width: "100%",
            border: "none",
            borderRadius: "100px",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            backgroundColor: theme.palette.grey[200],
            justifyContent: "center",
            cursor: "pointer",
            gap: "8px",
          }}
          onClick={() => {
            navigate(route);
          }}
          component="button"
        >
          <Box component="img" src={icon} sx={{ width: 18, height: 18 }} />

          <Typography
            sx={{
              fontWeight: 600,
              color: theme.palette.grey[800],
            }}
          >
            {title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
