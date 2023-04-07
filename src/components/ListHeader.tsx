import React from "react";
import styles from "./listHeader.module.css";

interface ListHeaderProps {
    children: React.ReactNode;
}

const ListHeader: React.FC = ({ children }) => {
    return (
    <table className={styles.table}>
        <thead>
            <tr>
                <th
                    className={styles["header-id"]}
                >Id</th>
                <th>Type</th>
                <th
                    className={styles["header-data"]}
                >Data</th>
                <th>Value</th>
                <th>Product</th>
                <th>Vendor</th>
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </table>
    );
};

export default ListHeader;