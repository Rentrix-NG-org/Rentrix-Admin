import { Box } from "@mui/material";
import Table from "@src/shared/components/Table";
import TableHeader from "@src/shared/components/TableHeader";
import { useEffect, useState } from "react";
import { GetListings } from "../pages/property.service";
import { icons } from "@src/utils/icons";
import { useNavigate } from "react-router";
// import { PropertyService } from '../pages/property.service';

const PropertyTable = ({ search }: { search: string; filter: string[] }) => {
  const navigate = useNavigate();
  const [searchFilter, setSearchFilter] = useState<string[][]>([]);
  const [properties, setProperties] = useState<any>([]);
  // const { getAllProperties } = PropertyService()

  useEffect(() => {
    async function handleGetListings() {
      const response = await GetListings();

      if (response?.status === 200) {
        setProperties(response.data);
      }
    }

    handleGetListings();
  }, []);

  useEffect(() => {
    if (properties.length) {
      const arr = properties?.map((d: any) => Object.values(d));
      console.log(arr);
      const filtered = arr.filter((d: any) => {
        return d.some((item: any) =>
          item.toString().toLowerCase().includes(search.toLowerCase()),
        );
      });
      setSearchFilter(filtered);
    }
  }, [search, properties]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TableHeader onViewAll={() => {}} title="Property Management" />
      <Table
        onRowClick={() => {}}
        onSelect={() => {}}
        columns={[
          {
            header: "PROPERTY ID",
            label: "id",
            type: "text",
          },
          {
            header: "PROPERTY NAME",
            label: "title",
            type: "text",
          },
          {
            header: "OWNER",
            label: "owner",
            type: "text",
          },
          {
            header: "STATUS",
            label: "availabilityStatus",
            type: "select",
            options: ["LISTED", "UNDER REVIEW", "RENTED"],
          },
          {
            header: "ACTIONS",
            label: "actions",
            type: "action",
            component: [
              {
                component: (
                  <Box component="img" src={icons.eye} sx={{ width: 18 }} />
                ),
                onClick: (id?: string) => navigate(`${id}/view`),
              },
              {
                component: (
                  <Box component="img" src={icons.edit} sx={{ width: 18 }} />
                ),
                onClick: () => {},
              },
            ],
          },
        ]}
        data={searchFilter || []}
      />
    </Box>
  );
};

export default PropertyTable;
