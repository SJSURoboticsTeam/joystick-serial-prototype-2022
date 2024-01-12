import React from "react";
import{useState, useRef, useEffect} from "react";
import DriveController from "../../controllers/drive/controller";
import { DriveCommandDTO } from "../../util/command-dto";
import { DEFAULT_DRIVE_COMMANDS } from "../../util/constants";
import { driveStringFormat } from "../../util/command-formats";
import { MAX_TRANSLATE_ANGLE } from "../../util/constants";
import TextSliderInput from "../Forms/TextSliderInput";
import { Style } from "util";


export default function TwoDDriveSim({rover, dimension, reload}){
    var canvasWidth = dimension.width;
    var canvasHeight = dimension.height;
    var wheelWidth = 25;
    var wheelHeight = 75;
    var roverWidth = 200;
    var roverHeight = (roverWidth * Math.sqrt(3)) / 2
    var roverPosX = canvasWidth/2
    var roverPosY = canvasHeight - roverHeight - wheelHeight - 25;
    var lPosX = roverPosX - roverWidth/2;
    var lPosY = roverPosY;
    var rPosX = roverPosX + roverWidth/2;
    var rPosY = roverPosY;
    var bPosX = roverPosX;
    var bPosY = roverPosY + roverHeight;

    const canvasRef = useRef(null);

    function lineToAngle(x1, y1, length, angle) {

        angle *= Math.PI / 180;
    
        var x2 = x1 + length * Math.cos(angle),
            y2 = y1 + length * Math.sin(angle);
    
        return {x: x2, y: y2};
    }

    function drawWheel(context, wheel, posX, posY, angle, color) {
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
        //display parallel line
        context.save();
            context.translate(posX + wheelWidth/2, posY + wheelHeight/2);
            context.rotate(angle * (Math.PI/180));
            context.translate(-(posX + wheelWidth/2), -(posY + wheelHeight/2));
            context.strokeStyle = '#D1C7B5';
            context.beginPath();
            context.moveTo(posX + wheelWidth/2,  posY + wheelHeight/2 + 25);
            context.lineTo(posX + wheelWidth/2,  posY + wheelHeight/2 - 25);
            context.stroke();
        context.restore();
        //display the perpendicualr line
        // if(wheel != 'back')
        // {
        context.save();
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
        //}


        var pos = lineToAngle( posX + wheelWidth/2, posY + wheelHeight/2, 4000, angle)
        //console.log('color: ', color, 'x:', pos.x.toFixed(2), 'y:', pos.y.toFixed(2));
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
        //draw turning radius position dot
        // context.save();
        //     context.beginPath();
        //     context.arc(x, y, 5, 0, 2 *Math.PI);
        //     context.stroke();
        // context.restore();
        return {x : x.toFixed(4), y : y.toFixed(4)};
    }

    function drawPath(context, wheel, posX, posY, angle, intersection, color){
        let radius = Math.sqrt(Math.pow(intersection.x - posX, 2) + Math.pow(intersection.y - posY, 2));
        let radian = angle * Math.PI/180;
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
                //displays radius
                // context.arc(0, 0, 5, 0, 2 *Math.PI);
                // context.stroke();
                context.arc(0, 0, Math.abs(radius),Math.PI, (1.5 * Math.PI), 0);
                context.stroke();
            }
            else if(angle < 0 && wheel != 'back')
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
        context.strokeStyle = '#D1C7B5';
        context.stroke();
    }

    useEffect(() => {
        var reloadSim = reload;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.fillStyle = '#3A3A42';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        var rEnd = drawWheel(context,'right', rPosX, rPosY, rover.right, '#B62500');
        var lEnd = drawWheel(context, 'left', lPosX, lPosY, rover.left, '#3B8280');
        var bEnd = drawWheel(context, 'back', bPosX, bPosY, rover.back, '#C89F18');
        var i = findIntersection(lEnd, rEnd, context);
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