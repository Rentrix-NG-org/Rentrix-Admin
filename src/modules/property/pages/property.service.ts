import axios from "@src/core/axios";
import { INewListing } from "./AddNewListing/type";

export const GetListings = async () => {
    try {
        const response = await axios.get(`admin/listings`)
        return response;
    } catch (error) { }
}
export const GetListingsDetails = async (listingId: string) => {
  try {
    const response = await axios.get(`admin/listings/${listingId}`);
    return response;
  } catch (error) {}
};
export const EditListingDetails = async (listingId: string, data: INewListing) => {
  try {
    const response = await axios.patch(`admin/listings/${listingId}`, data);
    return response;
  } catch (error) {}
};
