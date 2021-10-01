import { GetUserProductsQuery } from "../generated/graphql";

type ReviewList = GetUserProductsQuery["getUserProducts"][0]["reviews"];

export const getReviewPreviewList = (reviews: ReviewList) => {
    if (reviews.length > 3) {
        return reviews.slice(0, 3);
    } else {
        return reviews;
    }
};
