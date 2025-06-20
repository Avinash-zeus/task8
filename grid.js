import Cell from "./cell.js";

export default class Grid {
    constructor(container, totalRows = 100000, totalCols = 500) {
        this.container=container;
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('myCanvas'); // give some css to this canvas tag whivh we are creating here, yahi canvas ele baar baar inject krenge onrender me
        this.canvas.width = 1200;
        this.canvas.height = 800;
        this.ctx = canvas.getContext("2d");
        this.ctx.font = "10px Arial";



        

        // document.body.appendChild(canvas);

       
        // for (let i = 1; i <= this.totalRows; i++) {
        //     for (let j = 1; j <= this.totalCols; j++) {
        //         // new Cell(i, j, this.ctx);
        //         this.ctx.strokeRect(j * 100, i * 50, 100, 50);
        //         this.ctx.fillText(`Row: ${i}, Col: ${j}`, j * 100 + 20, i * 50 + 20);
        //     }
        // }

        // canvas.addEventListener("click", function (event) {
        //     console.log("Mouse clicked at", event.offsetX, event.offsetY);
        //     console.log(`Mouse clicked at row = ${event.offsetX / 80}, column = ${event.offsetY / 50}`);
        // });

    }
}