import React, { useEffect, useState } from "react";

const MoneyMade= () => {
    const [totalMoney, setTotalMoney] = useState([]);

    useEffect(() => {
        const calculateTotal = async () => {
            try{
                const orderResponce = await fetch("/order_data.json");
                const orders = await orderResponce.json();
                const priceResponce = await fetch("/pricing_data.json");
                const prices = await priceResponce.json();
               


                let total = 0;

                orders.forEach((order) => {
                    const {items} = order;
                    items.forEach((item) => {
                        const { type,size } = item;
                        total += prices[type][size];
                    })
                })

                setTotalMoney(total);

            } catch (error){
                console.error('Error while fatching data' , error);
            }
        }
        calculateTotal();
    },[]);

    return(
        <>
        <div style={{height:'70px', width:'500px', background:'gray', borderRadius:'15px', display:'flex', justifyContent:'center', alignItems:'center' ,marginTop:'30px' }}>
            <h2>Total Money made in 2023: ${totalMoney}</h2>
        </div>
        </>
    )
}

export default MoneyMade;