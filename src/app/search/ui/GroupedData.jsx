import React from 'react'
import box_empty from "/public/images/image1.svg";
import Image from 'next/image';


export const GroupedData = ({ currentGroupedData, total }) => {

    return (
        <div className="grid grid-cols-2 gap-2 w-full">

            <div className="flex flex-row items-center gap-2 col-span-2">
                <p className="text-base font-semibold">Total en stock: {total}</p>
            </div>

            {
                // (currentGroupedData.length > 0 && total > 0)
                // && (
                currentGroupedData.map((item, i) => (
                    <div key={i} className="border p-2 rounded-md">
                        <p className="text-base font-semibold">COD:
                            <span className="text-base font-normal">{item.itemCode}</span>
                        </p>
                        <p className="text-base font-semibold">Cantidad:
                            <span className="text-base font-normal">{item.onHand}</span>
                        </p>
                    </div>
                ))
                // )


            }

            {/* {hasSearched && (
                <div className="col-span-2 items-center">
                    <p className="text-center text-orange-400">No se encontró stock en el almacen para ese producto.</p>
                    <Image
                        src={box_empty}
                        width={500}
                        height={500}
                        alt="imagen-vacía"
                        className="h-62 mt-10 m-auto pointer-events-none opacity-30 "
                    />
                </div>
            )} */}

        </div>
    )
}
