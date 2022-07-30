import React from "react";
import Header from "../../Components/Header/Header";
import "./details.css";
import CurrencyTable from "../../Components/CurrencyTable/CurrencyTable";
import { useRouteMatch } from "react-router-dom";


const DetailsPage = (props)=>{

    const match = useRouteMatch();

    return(
        <div>
            <Header/>
            {/* <CurrencyTable /> */}
<h1>{match.params.symbol}</h1>
        </div>
    )
}

export default DetailsPage;