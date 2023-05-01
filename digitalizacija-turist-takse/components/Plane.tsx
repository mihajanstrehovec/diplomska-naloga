import React from "react"

interface PlaneProps{
    iteration: string
}

const Plane = ({ iteration } : PlaneProps) => {
    return(
        <div className="plane bottom-0 right-0">
          <img src={`/img/plane_frame_${iteration}.png`}></img>
        </div>
    )
}

export default Plane