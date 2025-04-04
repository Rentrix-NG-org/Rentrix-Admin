import axios from "@src/core/axios";
import { INewListing } from "./AddNewListing/type";

export const GetListings = async () => {
  try {
    const response = await axios.get(`admin/listings`);
    return response;
  } catch (error) {}
};
export const GetListingsDetails = async (listingId: string) => {
  try {
    const response = await axios.get(`admin/listings/${listingId}`);
    return response;
  } catch (error) {}
};
export const EditListingDetails = async (
  listingId: string,
  data: INewListing,
) => {
  try {
    const response = await axios.patch(`admin/listings/${listingId}`, data);
    return response;
  } catch (error) {}
};
export const UpdateListingStatus = async (
  listingId: string,
  status: "LISTED" | "RENTED" | "UNDER_REVIEW" | "AVAILABLE",
) => {
  if (!listingId) {
    return {
      success: false,
      message: "ListingId missing",
      data: null,
    };
  }
  try {
    const response = await axios.patch(`/admin/listings/${listingId}`, {
      status,
    });

    return {
      success: response.status === 200,
      message: "Fetched",
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update listing status",
      data: error || null,
    };
  }
};

export const ApproveListing = async (listingId: string) => {
  if (!listingId) {
    return {
      success: false,
      message: "ListingId missing",
      data: null,
    };
  }

  try {
    const response = await axios.patch(`/admin/listings/${listingId}/approve`);

    return {
      success: response.status === 200,
      message: "Listing approved successfully",
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to approve listing",
      data: error || null,
    };
  }
};
