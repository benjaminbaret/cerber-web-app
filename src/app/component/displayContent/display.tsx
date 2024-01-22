"use client";
const displayContent: (tableauContenu: string[][]) => React.ReactNode = (tableauContenu) => {
    const check = () => {
        const inputElement = document.getElementById('selectAll') as HTMLInputElement;
        if (inputElement) {
            inputElement.checked = false;
        }
    };
    

    return (
        <tbody>
            {tableauContenu.map((ligne, indexLigne) => (
                <tr className="relative">
                    <td className=" text-center className='w-1/7'">
                        <input type="checkbox" onChange={check} id={"select"+indexLigne} name={"select"+indexLigne}/>
                    </td>
                    <td id={"Status" + indexLigne} className="pb-3 pt-3 flex items-center justify-center text-center w-1/7">
                        {ligne[0] === "0" ? (
                            < CircleIcon fontSize="small" className="h-6" style={{ color: 'green' }} />
                        ) : (
                            < CircleIcon fontSize="small" className="h-6" style={{ color: 'red' }} />
                        )}
                    </td>
                    <td className="text-center className='w-1/7'">
                        {ligne[1]}
                    </td>
                    <td className="text-center className='w-1/7'">
                        {ligne[2]}
                    </td>
                    <td className="text-center className='w-1/7'">
                        {ligne[3]}
                    </td>
                    <td className="text-center className='w-1/7">
                        {ligne[4]}
                    </td>
                    <td className="text-center className='w-1/7'">
                        {ligne[5]}
                    </td>
                    <style jsx>{`
                        tr::after {
                            content: "";
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            height: 1px;
                            background-color: #e2e8f0;
                            opacity: 0.28;
                        }
                    `}</style>
                </tr>
            ))}
        </tbody>
    );
};
export default displayContent;
