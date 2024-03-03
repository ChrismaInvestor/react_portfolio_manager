import React from "react";
import { listPortfolios } from "../api/ListPortfolios";

export default function usePortfolioOptions(){
    const [portfolioOptions, setPortfolioOptions] = React.useState<string[]>([]);

    React.useEffect(() => {
        listPortfolios().then((portfolios) => {
          const tmp = portfolios?.map(function (portfolio) {
            return portfolio.name;
          });
          tmp && setPortfolioOptions(tmp);
        });
      }, []);

    return [portfolioOptions];

}