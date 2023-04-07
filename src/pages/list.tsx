import React from "react"
import Layout from "../components/Layout"
import ListHeader from "../components/ListHeader"
import ListSale from "../components/ListSale"
import styles from './styles.module.css'
import Link from "next/link"
import { api } from "../services/api"

const ListPage: React.FC = () => {
    const [sales, setSales] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [typeFilter, setTypeFilter] = React.useState(0);
    const [vendorFilter, setVendorFilter] = React.useState('');

    React.useEffect(() => {
        if (typeFilter === 0) {
            api.get(`/sale/${page}`).then(response => {
                setSales(response.data);
            })
            return;
        }
        api.get(`/sale/by-type/${typeFilter}`).then(response => {
            setSales(response.data);
        })
    }, [page, typeFilter]);

    const data = 
        vendorFilter.length > 0 ? sales.filter((sale) => 
            sale.vendor.toLowerCase().includes(vendorFilter.toLowerCase().trim())) : sales;

    return (
        <Layout title="List | Mz Teste">
            <div
                className={styles.container}
            >
                <h2>Here you are seeing your file data, filter and enjoy.</h2>
                <div>
                    <input type="text" placeholder="Search by vendor" className={styles['input-filter']} 
                        onChange={(e) => setVendorFilter(e.target.value)}
                    />
                    <select name="type" id="type"
                        className={styles['select-filter']}
                        onChange={(e) => setTypeFilter(Number(e.target.value))}
                    >
                        <option value="0">Filter by type</option>
                        <option value="1">Sale Producer</option>
                        <option value="2">Affiliate Selling</option>
                        <option value="3">Commission Paid</option>
                        <option value="4">Commission Received</option>
                    </select>
                </div>
                <ListHeader>
                    {
                        data.map((sale) => {
                            return (
                                <ListSale
                                    key={sale.id}
                                    id={sale.id}
                                    type={sale.type}
                                    data={sale.data}
                                    value={sale.value}
                                    product={sale.product}
                                    vendor={sale.vendor}
                                />
                            )
                        })
                    }
                </ListHeader>
                {
                    typeFilter === 0 ? (
                        <div className={styles.pagination}>
                            <a
                                onClick={() => page === 1 ? setPage(1) : setPage(page - 1)}
                            >&laquo;</a>
                            <a className={page === 1 ? styles.active : ''}
                                onClick={() => setPage(1)}
                            >1</a>
                            <a
                                className={page === 2 ? styles.active : ''}
                                onClick={() => setPage(2)}
                            >2</a>
                            <a
                                className={page === 3 ? styles.active : ''}
                                onClick={() => setPage(3)}
                            >3</a>
                            <a
                                className={page > 3 ? styles.active : ''}
                                onClick={() => setPage(page + 1)}
                            >&raquo;</a>
                        </div>
                    ) : null
                }
                <Link href="/">
                    <button
                        className={styles['button-submit']}
                    >
                        New upload
                    </button>
                </Link>
            </div>
        </Layout>
    )
}

export default ListPage