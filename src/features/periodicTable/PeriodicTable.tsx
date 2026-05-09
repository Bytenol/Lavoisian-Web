import { useEffect, useState } from "react";
import Atom, { iAtom } from "../../chemistry/Atom";

interface iMouse {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    isActive: "open" | "close" | "pending";
}

const hydrogen = new Atom("H", "Hydrogen", 1, 1.008, 1, 1);


const PeriodicTable = () => {

    const canvasId = "periodicTableCanvas";
    const [elements, setElements] = useState<Atom[]>([hydrogen]);
    const [mouse, setMouse] = useState<iMouse>({ x1: 0, y1: 0, x2: 0, y2: 0, isActive: "close" });
    const groupIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];
    const periodIds = ["1", "2", "3", "4", "5", "6"];

    useEffect(() => {
        animate();
    }, []);


    const update = (dt: number) => {

    }


    const render = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const tileSize = Math.min(100, ~~(ctx.canvas.width / 5));
        const textSize = tileSize * 0.5;

        ctx.strokeStyle = ctx.fillStyle = "#ccc";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `${textSize * 0.6}px Arial bold`;
        
        let mx = 0, my = 0;

        if(mouse.isActive === "pending") {
            mx = mouse.x2 - mouse.x1;
            my = mouse.y2 - mouse.y1;
            console.log(mx, my);
            setMouse({ x1: 0, y1: 0, x2: 0, y2: 0, isActive: "close" });
        }

        groupIds.forEach((ids, index) => {
            const px = (index + 1) * tileSize + mx;
            const py = my;
            ctx.strokeRect(px, py, tileSize, tileSize * 0.5);
            ctx.fillText(ids, px + tileSize * 0.5, py + tileSize * 0.25);
        });

        periodIds.forEach((ids, index) => {
            const py = (index + 1) * tileSize + my;
            const px = mx;
            ctx.strokeRect(px, py, tileSize * 0.5, tileSize);
            ctx.fillText(ids, px + tileSize * 0.25, py + tileSize * 0.5);
        });

        elements.forEach((element) => {
            const px = element.wxpos * tileSize;
            const py = element.wypos * tileSize;
            const midx = px + tileSize * 0.5;
            const midy = py + tileSize * 0.5;

            ctx.fillStyle = "#f6eded";
            ctx.font = `${textSize}px Arial bold`;
            ctx.fillText(element.symbol, midx, midy);

            const ntextSize = textSize * 0.3;
            ctx.font = `${ntextSize}px Arial bold`;
            ctx.fillText(element.name, midx, py + tileSize - ntextSize);

            ctx.fillText(element.atomic_number.toString(), px + ntextSize, py + ntextSize);

            const amass = element.atomic_mass.toString().substring(0, 5);
            ctx.fillText(amass, px + tileSize - (ntextSize * 2), py + ntextSize);

            ctx.fillStyle = "green";
            ctx.fillRect(px, py + tileSize, tileSize, 2);
        })
    }


    const animate = () => {

        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        const computedStyle = window.getComputedStyle(canvas);
        const width = parseInt(computedStyle.getPropertyValue("width"));
        const height = parseInt(computedStyle.getPropertyValue("height"));
        canvas.width = width;
        canvas.height = height;

        const loop = () => {
            const dt = 1/60;
            update(dt);
            render(ctx);
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }


    const handleMouseDown = (e: React.MouseEvent) => {
        console.log(mouse);
        setMouse({ x1: e.clientX, y1: e.clientY, x2: 0, y2: 0, isActive: "open" });
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if(!mouse.isActive) return;
        const oldMouse = {...mouse};
        oldMouse.x2 = e.clientX;
        oldMouse.y2 = e.clientY;
        setMouse({ ...oldMouse });
    }

    const handleMouseUp = (e: React.MouseEvent) => {
        setMouse({ x1: 0, y1: 0, x2: 0, y2: 0, isActive: "pending" });
        
    }

    return (
        <canvas id={canvasId} 
            style={{width:"100%", height: "100%"}}
            onMouseDown={(e) => { handleMouseDown(e) }}
            onMouseMove={(e) => { handleMouseMove(e) }}
            onMouseUp={(e) => { handleMouseUp(e) }}
        ></canvas>
    )

}


export default PeriodicTable;