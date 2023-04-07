import React from "react";
import styles from "./listSale.module.css";
import { format } from "date-fns";

interface ListSaleProps {
    id: number;
    type: number;
    data: Date | string;
    value: number;
    product: string;
    vendor: string;
}

const ListSale: React.FC<ListSaleProps> = ({ id, type, data, value, product, vendor }) => {
    console.log()
    const formattedDate = (date: Date | string) => format(new Date(data), "dd/MM/yyyy");

    const typeTransactions = {
        "1": "Sale Producer",
        "2": "Affiliate Selling",
        "3": "Commission Paid",
        "4": "Commission Received",
    };

    return (
        <tr
            className={styles["listSale"]}
        >
            <td 
                className={styles["listSale-id"]}
            >{id}</td>
            <td
                style={
                    type === 1 || type === 2 || type === 4 ? { backgroundColor: "#00FF00" } 
                    : type === 3 ? { backgroundColor: "#FF0000" }
                    : null
                }
            >
                {typeTransactions[type]}
            </td>
            <td className={styles["listSale-data"]}>{formattedDate(data)}</td>
            <td>
                {type === 1 || type === 2 || type === 4 ? "+ " : "- "}
                {value.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                })}
            </td>
            <td>{product}</td>
            <td>{vendor}</td>
        </tr>
    );
};

export default ListSale;
