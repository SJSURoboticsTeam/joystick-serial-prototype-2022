import React from "react";
import{useState, useRef, useEffect} from "react";
import DriveController from "../../controllers/drive/controller";
import { DriveCommandDTO } from "../../util/command-dto";
import { DEFAULT_DRIVE_COMMANDS } from "../../util/constants";
import { driveStringFormat } from "../../util/command-formats";
import { MAX_TRANSLATE_ANGLE } from "../../util/constants";
import TextSliderInput from "../Forms/TextSliderInput";
import { Style } from "util";
export default function WheelAngle({commands}){
    var canvasWidth = 4000;
    var canvasHeight = 1100;
    var wheelWidth = 50;
    var wheelHeight = 150;
    var roverWidth = 400;
    var roverHeight = (roverWidth * Math.sqrt(3)) / 2
    var lPosX = 300 - wheelWidth/2;
    var lPosY = 600 - wheelHeight/2;
    var rPosX = 700 - wheelWidth/2;
    var rPosY = 600 - wheelHeight/2;
    var bPosX = 500 - wheelWidth/2;
    var bPosY = 600 + roverHeight - wheelHeight/2;

    const [right, setRight] = useState(0)
    const [left, setLeft] = useState(0)
    const [back, setBack] = useState(0)
    const [angleRover, setAngleRover] = useState(0)
    const [mode, setMode] = useState("Unlock")
    const canvasRef = useRef(null);

    function lineToAngle(x1, y1, length, angle) {

        angle *= Math.PI / 180;
    
        var x2 = x1 + length * Math.cos(angle),
            y2 = y1 + length * Math.sin(angle);
    
        return {x: x2, y: y2};
    }

    function drawWheel(context, posX, posY, angle, color) {
        context.save();
            context.translate(posX + wheelWidth/2, posY + wheelHeight/2);
            context.rotate(angle * (Math.PI/180));
            context.translate(-(posX + wheelWidth/2), -(posY + wheelHeight/2));

            context.lineWidth = 5
            context.strokeStyle = color;
            context.beginPath();
            context.roundRect(posX, posY, wheelWidth, wheelHeight, [30, 30, 0, 0]);
            context.stroke();
        context.restore();
        context.save();
            context.translate(posX + wheelWidth/2, posY + wheelHeight/2);
            context.rotate(angle * (Math.PI/180));
            context.translate(-(posX + wheelWidth/2), -(posY + wheelHeight/2));

            context.beginPath();
            context.moveTo(posX + wheelWidth/2,  posY + wheelHeight/2 + 50);
            context.lineTo(posX + wheelWidth/2,  posY + wheelHeight/2 - 50);
            context.stroke();
        context.restore();
        // display the perpendicualr line
        // if(color != 'green')
        // {
        context.save();
            context.translate(posX + wheelWidth/2, posY + wheelHeight/2);
            context.rotate(angle * (Math.PI/180));
            context.translate(-(posX + wheelWidth/2), -(posY + wheelHeight/2));

            context.beginPath();
            context.moveTo(posX + wheelWidth/2,  posY + wheelHeight/2);
            if(angle < 0)
            {
                context.lineTo(posX + wheelWidth/2 + 4000,  posY + wheelHeight/2);
            }
            else{
                context.lineTo(posX + wheelWidth/2 + 4000,  posY + wheelHeight/2);
            }
            context.stroke();
        context.restore();
        //}


        var pos = lineToAngle( posX + wheelWidth/2, posY + wheelHeight/2, 4000, angle)
        console.log('color: ', color, 'x:', pos.x.toFixed(2), 'y:', pos.y.toFixed(2));
        return {x : pos.x.toFixed(4), y : pos.y.toFixed(4)};
    }

    function findIntersection(lEnd, rEnd, context)
    {
        let a = {x : lPosX + wheelWidth/2, y : lPosY + wheelHeight/2};
        let b = {x : lEnd.x, y : lEnd.y};
        let c = {x : rPosX + wheelWidth/2, y : rPosY + wheelHeight/2};
        let d = {x : rEnd.x, y : rEnd.y};

        // console.log('a == ', 'x:', a.x, 'y:', a.y);
        // console.log('b == ', 'x:', b.x, 'y:', b.y);
        // console.log('c == ', 'x:', c.x, 'y:', c.y);
        // console.log('d == ', 'x:', d.x, 'y:', d.y);

        let m = (d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x);
        let n = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y);
        
        let u =  m / n;

        let x = a.x + u * (b.x - a.x);
        let y = a.y + u * (b.y - a.y);

        //console.log('intersection = x: ' , x.toFixed(4), ' y: ', y.toFixed(4));

        context.save();
            context.beginPath();
            context.arc(x, y, 5, 0, 2 *Math.PI);
            context.stroke();
        context.restore();
        return {x : x.toFixed(4), y : y.toFixed(4)};
    }

    function drawPath(context, posX, posY, angle, intersection, color){
        let radius = Math.sqrt(Math.pow(intersection.x - posX, 2) + Math.pow(intersection.y - posY, 2));
        let radian = angle * Math.PI/180;
        context.save();
            context.translate(intersection.x, intersection.y);
            context.lineWidth = 5;
            context.strokeStyle = color;
            if(left == right && right == back)
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
            else if(angle > 0 && color != 'green')
            {
                context.rotate(angle * (Math.PI/180));
                context.beginPath();
                //displays radius
                // context.arc(0, 0, 5, 0, 2 *Math.PI);
                // context.stroke();
                context.arc(0, 0, Math.abs(radius),Math.PI, (1.5 * Math.PI), 0);
                context.stroke();
            }
            else if(angle < 0 && color != 'green')
            {
                context.rotate(angle * (Math.PI/180));
                context.beginPath();
                //displays radius
                // context.arc(0, 0, 5, 0, 2 *Math.PI);
                // context.stroke();
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
        for(var j = 0; j <= cHeight; j += pad)
        {
            context.moveTo(0, j);
            context.lineTo(cWidth, j);
        }
        context.strokeStyle = 'black';
        context.stroke();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        var rEnd = drawWheel(context, rPosX, rPosY, right, 'red');
        var lEnd = drawWheel(context, lPosX, lPosY, left, 'blue');
        var bEnd = drawWheel(context, bPosX, bPosY, back, 'green');
        var i = findIntersection(lEnd, rEnd, context);
        drawGrid(context, canvasWidth, canvasHeight, 50);

        if(mode != 'Rotate')
        {
            drawPath(context, rPosX + wheelWidth/2, rPosY + wheelHeight/2, right, i, 'red');
            drawPath(context, lPosX + wheelWidth/2, lPosY + wheelHeight/2, left, i, 'blue');
            drawPath(context, bPosX + wheelWidth/2, bPosY + wheelHeight/2, back, i, 'green');
        }
    },[right, left, back]);

    function handleChange(e) {
        switch(mode)
        {
            case 'Unlock':
                unlockDrive(e.target.name, e.target.value);
                break;
            case 'Drive' :
                if(e.target.name == "angleRover")
                {
                    setAngleRover(e.target.value)
                    let temp = e.target.value
                    handleDrive(temp);
                }
                break;
            case 'Translate' :
                if(e.target.name == "angleRover")
                {
                    setAngleRover(e.target.value);
                    let temp = e.target.value
                    constDrive(temp, temp, temp);
                }
                break;
            case 'Rotate' :
                break;
        }
    }

    function unlockDrive(angleType, angleParameter)
    {
        switch(angleType){
            case 'Right': 
                setRight(angleParameter)
                break;
            case 'Left':
                setLeft(angleParameter)
                break;
            case 'Back':
                setBack(angleParameter)
                break;
            default :
                break;
        }
    }

    function handleDrive(angle)
    {
        var outer;
        var back;
        var absAngle = Math.abs(angle);
        outer = 0.392 + (0.744 * absAngle) + (-0.0187 * (absAngle ** 2)) + (1.84E-04 * (absAngle ** 3));
        back = -0.378 + (-1.79 * absAngle) + (0.0366 * (absAngle ** 2)) + (-3.24E-04 * (absAngle ** 3));
        if(angle > 0)
        {
            constDrive(angle, outer.toFixed(4), back.toFixed(4));
        }
        else if(angle < 0)
        {
            constDrive(-outer.toFixed(4), angle, -back.toFixed(4));
        }
        else
        {
            constDrive(0, 0, 0)
        }
    }

    function constDrive(a1, a2, a3)
    {
        setRight(a1);
        setLeft(a2);
        setBack(a3);
    }

    function handleMode(e) {
        constDrive(0, 0, 0);
        setAngleRover(0);
        switch(e.target.value){
            case '0':
                setMode("Unlock");
                break;
            case '1': 
                setMode("Drive");
                break;
            case '2':
                setMode("Translate");
                break;
            case '3':
                setMode("Rotate");
                constDrive(135, 45, 270);
                break;
        }
    }

    return(
        <div>
            <select className="mode-change"  onChange={(e) => {handleMode(e)}}>
                <option className='unlock' value={0}>Unlock</option>
                <option className='drive' value={1}>Drive</option>
                <option className='translate' value={2}>Translate</option>
                <option className='rotate' value={3}>Rotate</option>
            </select>
            <TextSliderInput
                name='Right'
                label='Right'
                min={-MAX_TRANSLATE_ANGLE}
                max={MAX_TRANSLATE_ANGLE}
                value={right}
                onChange={handleChange}
            />
            <TextSliderInput
                name='Left'
                label='Left'
                min={-MAX_TRANSLATE_ANGLE}
                max={MAX_TRANSLATE_ANGLE}
                value={left}
                onChange={handleChange}
            />
            <TextSliderInput
                name='Back'
                label='Back'
                min={-MAX_TRANSLATE_ANGLE}
                max={MAX_TRANSLATE_ANGLE}
                value={back}
                onChange={handleChange}
            />
            <TextSliderInput
                name='angleRover'
                label='angleRover'
                min={-MAX_TRANSLATE_ANGLE}
                max={MAX_TRANSLATE_ANGLE}
                value={angleRover}
                onChange={handleChange}
            />
            <canvas ref = {canvasRef} width = {canvasWidth} height = {canvasHeight}/>
        </div>
    );
}