export default function ToolBar({setPaneNum, setPanelLayout}){
    function handleLayout(e)
    {
        setPanelLayout(e.target.className);
        setPaneNum(parseInt(e.target.value))
    }

    return(
        <div className="tool-bar">
            <div className="panel-layout">
                <h2 className="panel-layout-header">
                    Panel Layout
                </h2>
                <div className="panel-layout-buttons" >
                    <button className="p1" value={1} onClick={(e) => handleLayout(e)}></button>
                    <button className="p2-l1" value={2} onClick={(e) => handleLayout(e)}></button>
                    <button className="p2-l2" value={2} onClick={(e) => handleLayout(e)}></button>
                    <button className="p3-l1" value={3} onClick={(e) => handleLayout(e)}></button>
                    <button className="p3-l2" value={3} onClick={(e) => handleLayout(e)}></button>
                    <button className="p3-l3" value={3} onClick={(e) => handleLayout(e)}></button>
                    <button className="p3-l4" value={3} onClick={(e) => handleLayout(e)}></button>
                    <button className="p4" value={4} onClick={(e) => handleLayout(e)}></button>
                </div>
            </div>
        </div>
    )
}