import { Box } from "@mui/material";
import PaginationControl from "@src/modules/user/components/PaginationControl";
import Transaction from "@src/modules/user/components/Transaction";
import UserNav from "@src/modules/user/components/UserNav";
import { UserService } from "@src/modules/user/services/user.service";
import { TransactionType } from "@src/modules/user/types/user.types";
import { icons } from "@src/utils/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const TransactionHistories = () => {
  const params = useParams();
  const { getUserTransactions } = UserService();
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [paginatedData, setPaginatedData] = useState<TransactionType[]>([]);

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
      <PaginationControl data={transactions} onPage={(page) => setPage(page)} />
    </Box>
  );
};
export default TransactionHistories;
