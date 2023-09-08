import { Metric } from "@tremor/react";
import CryptoStore from "./CryptoStore";

function App() {
    return (
        <div>
            <div className="flex justify-center items-center h-40 w-full mb-10 bg-gradient-to-r from-teal-400 to-yellow-200">
                <Metric className=" mb-5">Crypto Storefront</Metric>
            </div>
            <CryptoStore />
        </div>
    );
}

export default App;
