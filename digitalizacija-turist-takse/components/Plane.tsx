import React from "react"
import Image from 'next/image';

interface PlaneProps{
    iteration: string
}

const Plane = ({ iteration } : PlaneProps) => {
    return(
        <div className="plane bottom-0 right-0">
          <Image src={`/img/plane_frame_${iteration}.png`} alt="plane illustration" width={400} height={400} priority={true} />
        </div>
    )
}

export default Plane