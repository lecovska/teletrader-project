import React from "react";
import "./currency.css";
import {Link} from "react-router-dom";

const CurrencyTable =(props)=>{
    return(
        <div>
<table>
    <thead key="thead">
    <tr className="tableHead">
        <th>Name</th>
        <th>Last</th>
        <th>Change</th>
        <th>Change Percent</th>
        <th>High</th>
        <th>Low</th>
    </tr>
    </thead>
    <tbody key="tbody">
{props.data.map(e=>(
    <tr>
       <td className="currencySymbol" ><Link to={`/details/${e.symbol}`}>{e.symbol}</Link></td>
       <td >{e.LastPrice}</td>
       <td >{e.DailyChange}</td>
       <td >{e.DailyChangePecent}</td>
       <td >{e.DailyHigh}</td>
       <td >{e.DailyLow}</td>

    </tr>
))}
</tbody>
</table>
        </div>
    )
}

export default CurrencyTable;