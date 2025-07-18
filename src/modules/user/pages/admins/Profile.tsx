import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UserNav from "../../../user/components/UserNav";
import { ImageEdit } from "../../../user/pages/[userId]/edit/UserEdit";
// import { images } from "@src/utils/images";
import CustomButton from "../../../property/pages/AddNewListing/components/Button";
import moment from "moment";
import { UserService } from "../../services/user.service";
import axios from "@src/core/axios";
import { icons } from "@src/utils/icons";

interface Admin {
    firstName: string;
    lastName: string;
    photoUrl: string;
    roles: string[];
    phoneNumber: string;
    dateOfBirth: string;
    account: { email: "", status: "", logs: [] },
    locations: [],
}

const UserProfile = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { getUserAdmin } = UserService();
    const [approving, setApproving] = useState(false);
    const [user, setUser] = useState<Admin | null>(null);
    const [_, setImage] = useState<File | null>(null);
    const theme = useTheme();
    const date = new Date(user?.dateOfBirth);
    const formattedDob = moment(date).format("DD MMM YYYY");

    useEffect(() => {
        async function fetchUser() {
            const response = await getUserAdmin(params?.userId || "");
            if (response.success) {
                console.log(response.data);
                setUser(response.data);
            }
        }
        fetchUser();
    }, [params]);

    const handleApproveRequest = async () => {
        try {
            setApproving(true);
            const response = await axios.patch("/admin/password-request", {
                userId: params.userId,
                approved: true,
            })
            if(response.status === 200) {
                navigate(-1);
            }
        }
        catch (error) {
            console.error("Error approving request:", error);
        } finally {
            setApproving(false);
        }
    };


    return (
        <Box mt="60px" px="20px">
            <UserNav routes={["Profile", "View Details"]} />
            <Box width="fit-content" mt="25px">
                <Box display="flex" justifyContent="center">
                    <ImageEdit
                        value={user?.photoUrl || icons.avatar}
                        onImage={(__, file) => {
                            setImage(file);
                        }}
                    />
                </Box>
                <Box
                    width="fit-content"
                    my="32px"
                    display="flex"
                    flexDirection="column"
                    gap="8px"
                >
                    <Typography
                        fontSize="16px"
                        fontWeight={700}
                        color={"#202224"}
                        textAlign="center"
                    >
                        {user?.firstName} {user?.lastName}
                    </Typography>
                    <Typography
                        fontSize="16px"
                        fontWeight={600}
                        color={"#202224"}
                        textAlign="center"
                    >
                        Role:{" "}
                        <span
                            style={{
                                display: "inline",
                                color: theme.palette.secondary.main,
                                textTransform: "capitalize",
                            }}
                        >
                            {user?.roles ? user?.roles?.join(", ") : "N/A"}
                        </span>
                    </Typography>
                    <Typography
                        fontSize="16px"
                        fontWeight={600}
                        color={"#202224"}
                        textAlign="center"
                    >
                        Email: <span style={{ display: "inline" }}>{user?.account.email}</span>
                    </Typography>
                    <Typography
                        fontSize="16px"
                        fontWeight={600}
                        color={"#202224"}
                        textAlign="center"
                    >
                        Phone number:{" "}
                        <span style={{ display: "inline" }}>
                            {user?.phoneNumber
                                ? user?.phoneNumber
                                : "No phone number"}
                        </span>
                    </Typography>
                    <Typography
                        fontSize="16px"
                        fontWeight={600}
                        color={"#202224"}
                        textAlign="center"
                    >
                        Date of birth:{" "}
                        <span style={{ display: "inline" }}>{formattedDob}</span>
                    </Typography>
                    <Typography
                        fontSize="16px"
                        fontWeight={600}
                        color={"#202224"}
                        textAlign="center"
                    >
                        Location:{" "}
                        <span style={{ display: "inline" }}>
                            {user?.locations.length ? user.locations.join(", ") : "No Location"}
                        </span>
                    </Typography>
                    <Typography
                        fontSize="16px"
                        fontWeight={600}
                        color={"#202224"}
                        textAlign="center"
                    >
                        Status:{" "}
                        <span
                            style={{
                                display: "inline",
                                color: "#099137",
                                textTransform: "capitalize",
                            }}
                        >
                            {user?.account.status}
                        </span>
                    </Typography>
                </Box>
            </Box>
            <CustomButton
                onClick={handleApproveRequest}
                variant="contained"
                buttonStyles={{
                    height: { xs: "48px", sm: "48px" },
                    width: "287px",
                    fontSize: "16px",
                    color: theme.palette.common.white,
                    background: theme.palette.secondary.main,
                    "&:hover": {
                        background: theme.palette.secondary.light,
                        borderColor: "transparent",
                        color: theme.palette.common.white,
                    },
                }}
                disabled={approving}
            >
                {approving ? "Approving..." : "Approve Request"}
            </CustomButton>
        </Box>
    );
};

export default UserProfile;
