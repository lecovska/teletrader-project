import React, { useState } from "react";
import "./homePage.css";
import Header from "../../Components/Header/Header"
import CurrencyTable from "../../Components/CurrencyTable/CurrencyTable";

let channelId = [];
const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
const HomePage = () => {

    
    const [data, setData] = useState([]);



    wss.onmessage = (msg) => {
        if (msg.data[0] === "{") {
            channelId.push(JSON.parse(msg.data));
            console.log(JSON.parse(msg.data))
        } else {
            let dataParsed = JSON.parse(msg.data);
            if (dataParsed[1] !== "hb") {
                console.log(JSON.parse(msg.data))
                let t = [...data];
                let channel = channelId.find(e => e.chanId == dataParsed[0]);
                if (channel) {
                    let channelUpdate = t.find(e => e.channel == dataParsed[0])
                    if (!channelUpdate) {
                        t.push({
                            channel: dataParsed[0],
                            symbol: channel.pair,
                            LastPrice: dataParsed[1][6],
                            DailyChange: dataParsed[1][4],
                            DailyChangePecent: dataParsed[1][5],
                            DailyHigh: dataParsed[1][8],
                            DailyLow: dataParsed[1][9]
                        })

                    } else {
                        channelUpdate.LastPrice = dataParsed[1][6];
                        channelUpdate.DailyChange = dataParsed[1][4];
                        channelUpdate.DailyChangePecent = dataParsed[1][5];
                        channelUpdate.DailyHigh = dataParsed[1][8];
                        channelUpdate.DailyLow = dataParsed[1][9]
                    }



                    setData([...t]);

                }
            }


        }

    }

    let req = {
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tBTCUSD'
    };




    wss.onerror = (err) => {
        console.log(err);
    }

    let firstFivePairs = [];
    wss.onopen = () => {

        fetch("/v1/symbols")
            .then(res => res.json())
            .then(x => {

                firstFivePairs = x.slice(0, 5);
                console.log(firstFivePairs);


                for (let i = 0; i < firstFivePairs.length; i++) {
                    req.symbol = firstFivePairs[i].toUpperCase();
                    wss.send(JSON.stringify(req));
                }

                // API keys setup here (See "Authenticated Channels")
                // wss.send(req);
            }


            )
    }



    // const data = [{
    //     symbol: "BTCUSD",
    //     LastPrice: "20000",
    //     DailyChange: "400",
    //     DailyChangePecent: "0,2%",
    //     DailyHigh: "21000",
    //     DailyLow: "19000"
    // }];

    return (
        <div>
            <Header />
            <CurrencyTable data={data} />
        </div>
    )
}

export default HomePage;
