import { Portfolio } from "../component/AddPortfolioSection";
import { BASE_URL } from "../constant/Constant";

export const listPortfolios = async () => {
  const res = await fetch(BASE_URL + "portfolio", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (res.status === 200) {
    const result: Portfolio[] = await res.json();
    return result;
  }
};
