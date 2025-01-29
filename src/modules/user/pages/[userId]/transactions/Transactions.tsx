import { Box, Typography, useTheme } from "@mui/material";
import Transaction from "@src/modules/user/components/Transaction";
import UserNav from "@src/modules/user/components/UserNav";
import { UserService } from "@src/modules/user/services/user.service";
import { TransactionType } from "@src/modules/user/types/user.types";
import { icons } from "@src/utils/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const TransactionHistories = () => {
  const theme = useTheme();
  const params = useParams();

  const { getUserTransactions } = UserService();
  const [page, setPage] = useState(1);

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [paginatedData, setPaginatedData] = useState<TransactionType[]>([]);

  function handlePage(op: string) {
    if (op === "+" && page * 8 < transactions.length) {
      setPage(page + 1);
    } else if (op === "-") {
      setPage(page === 1 ? 1 : page - 1);
    }
  }
  useEffect(() => {
    async function fetchTransactions() {
      const response = await getUserTransactions(params?.userId || "");
      if (response.success) {
        console.log(response.data, "is tr");
        setTransactions(response.data as TransactionType[]);
      }
    }
    fetchTransactions();
  }, []);

  useEffect(() => {
    const limit = 8;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedResults = transactions.slice(start, end);
    setPaginatedData(paginatedResults);
  }, [transactions, page]);

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
        routes={[
          "User Management",
          "User Details",
          "View All Transaction Histories",
        ]}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {paginatedData.map(({ description, createdAt, status, amount }) => (
          <Transaction
            description={description}
            date={createdAt}
            amount={Number(amount)}
            currencyIcon={icons.naira}
            status={status as unknown as "successful"}
            profileImg=""
          />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20.3px",
          mt: "46.97px",
        }}
      >
        <Box
          onClick={() => handlePage("-")}
          sx={{ border: "none", background: "none", width: 33.6 }}
          component="button"
        >
          <Box component="img" src={icons.arrowleft} sx={{}} />
        </Box>
        <Box
          sx={{
            width: 32,
            height: 32,
            background: theme.palette.primary.main,
            display: "flex",
            justifyContent: "center",
            borderRadius: "50%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: theme.palette.common.white, fontWeight: 600 }}
          >
            {page}
          </Typography>
        </Box>
        <Box
          onClick={() => handlePage("+")}
          sx={{ border: "none", background: "none", width: 33.6 }}
          component="button"
        >
          <Box component="img" src={icons.arrowright} sx={{}} />
        </Box>
      </Box>
    </Box>
  );
};
export default TransactionHistories;
