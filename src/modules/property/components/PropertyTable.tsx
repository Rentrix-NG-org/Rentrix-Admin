import { Box } from '@mui/material';
import Table from '@src/shared/components/Table';
import TableHeader from '@src/shared/components/TableHeader';
import React, { useEffect, useState } from 'react'
import Action from './Action';
import { GetListings } from '../pages/property.service';
import { icons } from '@src/utils/icons';
import { useNavigate } from 'react-router';
// import { PropertyService } from '../pages/property.service';

const PropertyTable = ({
  search,
  filter,
}: { search: string; filter: string[] }) => {
  const navigate = useNavigate()
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
              item.toString().toLowerCase().includes(search.toLowerCase())
            );
          });
          setSearchFilter(filtered);
       }
      }, [search, properties]);
      const data = [
        {
          propertyId: "PTR0987",
          propertyName: "Tropical Island",
          owner: "Jane Doe",
          status: "LISTED",
        },
        {
          propertyId: "PTR4321",
          propertyName: "2 bedroom",
          owner: "Jane Smith",
          status: "UNDER REVIEW",
        },
        {
          propertyId: "PTR1234",
          propertyName: "Duplex",
          owner: "James Bond",
          status: "RENTED",
        },
  ];
  // console.log(properties)
  const viewProperty = (id: string) => {
    navigate(`${id}/view`)
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TableHeader title="Property Management" />
      <Table
        onSelect={(title, selected) => {}}
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
                onClick: () => {}
              },
            ],
          },
        ]}
        data={searchFilter || []}
      />
    </Box>
  );
}

export default PropertyTable
