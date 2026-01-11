import { getAllEPBuilding } from '../../api/EP/ep.api';

export default function EnergyPerformance() {
    return (
        <div>
            <button
                className="h-[50px] w-[100px] bg-amber-200"
                onClick={async () => {
                    const data = await getAllEPBuilding();
                    console.log(data);
                }}
            >
                Get EP
            </button>
        </div>
    );
}
