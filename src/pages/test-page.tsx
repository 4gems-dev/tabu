import useSWR from 'swr'

interface StockData {
    symbol: string;
    currentPrice: number;
}

interface StockData2 {
    symbol: string;
    name: string;
}

export default function TestPage() {
    const { data, error, isLoading } = useSWR('/api/stock/prices', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    return (
        <div>
            <h1>Stock Data</h1>
            <ul>
                {data.data.map((stock: StockData) => (
                    <li key={stock.symbol}>
                        <strong>{stock.symbol}</strong>: {stock.currentPrice}
                    </li>
                ))}
            </ul>
            <AnotherPage />
        </div>
    );
}

export function AnotherPage() {
    const { data, error, isLoading } = useSWR('/api/stock/names', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    return (
        <div>
            <h1>Names data</h1>
            <ul>
                {data.data.map((stock: StockData2) => (
                    <li key={stock.symbol}>
                        <strong>{stock.symbol}</strong>: {stock.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());