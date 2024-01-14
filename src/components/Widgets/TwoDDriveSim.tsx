import{useRef, useEffect} from "react";

export default function TwoDDriveSim({rover, dimension, reload}){
    const canvasWidth = dimension.width;
    const canvasHeight = dimension.height;
    const wheelWidth = 25;
    const wheelHeight = 75;
    const roverWidth = 200;
    const roverHeight = (roverWidth * Math.sqrt(3)) / 2
    const roverPosX = canvasWidth/2
    const roverPosY = canvasHeight - roverHeight - wheelHeight - 25;
    const lPosX = roverPosX - roverWidth/2;
    const lPosY = roverPosY;
    const rPosX = roverPosX + roverWidth/2;
    const rPosY = roverPosY;
    const bPosX = roverPosX;
    const bPosY = roverPosY + roverHeight;

    const canvasRef = useRef(null);

    function lineToAngle(x1, y1, length, angle) {

        angle *= Math.PI / 180;
    
        const x2 = x1 + length * Math.cos(angle),
              y2 = y1 + length * Math.sin(angle);
    
        return {x: x2, y: y2};
    }

    function drawWheel(context, posX, posY, angle, color) {
        context.save(); //Draws the wheel
            context.translate(posX + wheelWidth/2, posY + wheelHeight/2);
            context.rotate(angle * (Math.PI/180));
            context.translate(-(posX + wheelWidth/2), -(posY + wheelHeight/2));

            context.lineWidth = 5
            context.strokeStyle = color;
            context.beginPath();
            context.roundRect(posX, posY, wheelWidth, wheelHeight, [30, 30, 0, 0]);
            context.stroke();
        context.restore();
        context.save(); //Draw the y-axis origin line
            context.translate(posX + wheelWidth/2, posY + wheelHeight/2);
            context.rotate(angle * (Math.PI/180));
            context.translate(-(posX + wheelWidth/2), -(posY + wheelHeight/2));
            context.strokeStyle = '#D1C7B5';
            context.beginPath();
            context.moveTo(posX + wheelWidth/2,  posY + wheelHeight/2 + 25);
            context.lineTo(posX + wheelWidth/2,  posY + wheelHeight/2 - 25);
            context.stroke();
        context.restore();
        context.save(); //Draw the x-axis orgin line
            context.translate(posX + wheelWidth/2, posY + wheelHeight/2);
            context.rotate(angle * (Math.PI/180));
            context.translate(-(posX + wheelWidth/2), -(posY + wheelHeight/2));
            context.strokeStyle = '#D1C7B5';
            context.beginPath();
            context.moveTo(posX + wheelWidth/2,  posY + wheelHeight/2);
            if(angle < 0)
            {
                context.moveTo(posX + wheelWidth/2 + 25,  posY + wheelHeight/2);
                context.lineTo(posX + wheelWidth/2 - 25,  posY + wheelHeight/2);
            }
            else{
                context.moveTo(posX + wheelWidth/2 - 25,  posY + wheelHeight/2);
                context.lineTo(posX + wheelWidth/2 + 25,  posY + wheelHeight/2);
            }
            context.stroke();
        context.restore();


        const pos = lineToAngle( posX + wheelWidth/2, posY + wheelHeight/2, 4000, angle)
        return {x : pos.x.toFixed(4), y : pos.y.toFixed(4)};
    }

    function findIntersection(lEnd, rEnd,)
    {
        const a = {x : lPosX + wheelWidth/2, y : lPosY + wheelHeight/2};
        const b = {x : lEnd.x, y : lEnd.y};
        const c = {x : rPosX + wheelWidth/2, y : rPosY + wheelHeight/2};
        const d = {x : rEnd.x, y : rEnd.y};

        const m = (d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x);
        const n = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y);
        
        const u =  m / n;

        const x = a.x + u * (b.x - a.x);
        const y = a.y + u * (b.y - a.y);

        return {x : x.toFixed(4), y : y.toFixed(4)};
    }

    function drawPath(context, wheel, posX, posY, angle, intersection, color){
        const radius = Math.sqrt(Math.pow(intersection.x - posX, 2) + Math.pow(intersection.y - posY, 2));
        const radian = angle * Math.PI/180;
        context.save();
            context.translate(intersection.x, intersection.y);
            context.lineWidth = 5;
            context.strokeStyle = color;
            if(rover.left == rover.right && rover.right == rover.back)
            {
                context.translate(-intersection.x, -intersection.y);
                context.translate(posX, posY)
                context.rotate(angle * Math.PI/180)
                context.translate(-posX, -posY)

                context.beginPath();
                context.moveTo(posX, posY)
                context.lineTo(posX, -1000);
                context.stroke();
            }
            else if(angle > 0 && wheel != 'back')
            {
                context.rotate(angle * (Math.PI/180));
                context.beginPath();
                context.arc(0, 0, Math.abs(radius),Math.PI, (1.5 * Math.PI), 0);
                context.stroke();
            }
            else if(angle < 0 && wheel != 'back')
            {
                context.rotate(angle * (Math.PI/180));
                context.beginPath();
                context.arc(0, 0, Math.abs(radius),0, (1.5 * Math.PI), 1);
                context.stroke()
            }
        context.restore();
    }

    function drawGrid(context, cWidth, cHeight, pad)
    {
        for(let i = 0; i <= cWidth; i += pad)
        {
            context.moveTo(i, 0);
            context.lineTo(i, cHeight)
        }
        for(let j = 0; j <= cHeight; j += pad)
        {
            context.moveTo(0, j);
            context.lineTo(cWidth, j);
        }
        context.strokeStyle = '#877D77';
        context.stroke();
    }

    useEffect(() => {
        let reloadSim = reload;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.fillStyle = '#3A3A42';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        const rEnd = drawWheel(context, rPosX, rPosY, rover.right, '#B62500');
        const lEnd = drawWheel(context, lPosX, lPosY, rover.left, '#3B8280');
        const bEnd = drawWheel(context, bPosX, bPosY, rover.back, '#C89F18');
        const i = findIntersection(lEnd, rEnd);
        drawGrid(context, canvasWidth, canvasHeight, 25);

        if(rover.mode != 'Rotate' && rover.mode != 'Unlock')
        {
            drawPath(context,'right', rPosX + wheelWidth/2, rPosY + wheelHeight/2, rover.right, i, '#B62500');
            drawPath(context, 'left', lPosX + wheelWidth/2, lPosY + wheelHeight/2, rover.left, i, '#3B8280');
            drawPath(context, 'back', bPosX + wheelWidth/2, bPosY + wheelHeight/2, rover.back, i, '#C89F18');
        }
    },[rover.right, rover.left, rover.back, dimension.width, dimension.height, reload]);

    return(
        <div className="TwoDriveSim">
            <canvas ref = {canvasRef} width = {canvasWidth} height = {canvasHeight}/>
        </div>
    );
}