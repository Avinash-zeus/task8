import Cell from "./cell.js";
import Row from "./row.js";
import Column from './column.js'

export default class Grid {
    constructor(container, totalRows = 100000, totalCols = 500) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = "10px Arial";

        this.canvas.classList.add('myCanvas'); // give some css to this canvas tag whivh we are creating here, yahi canvas ele baar baar inject krenge onrender me

        this.canvas.style.top = this.container.getBoundingClientRect().top + 'px';
        this.canvas.style.left = this.container.getBoundingClientRect().left + 'px';

        this.cellWidth = 100;
        this.cellHeight = 25;

        this.columns = Array.from({ length: totalCols }, (_, i) => new Column(i, this.cellWidth));
        this.rows = Array.from({ length: totalRows }, (_, i) => new Row(i, this.cellHeight)); // these tow lines are just for col row size resize
        // this.columns = [];
        // for (let i = 0; i < totalCols; i++) {
        //     this.columns.push(new Column(i, this.cellWidth));
        // }

        const virtualWidth = totalCols * this.cellWidth;
        const virtualHeight = totalRows * this.cellHeight;

        // Dummy spacer to enable scrolling
        const spacer = document.createElement('div');
        spacer.style.width = virtualWidth + 'px';
        spacer.style.height = virtualHeight + 'px';

        this.container.appendChild(spacer);
        this.container.appendChild(this.canvas);

        let needsRender = false;
        this.container.addEventListener('scroll', () => {
            if (!needsRender) {
                needsRender = true;
                requestAnimationFrame(() => { // optimise performace
                    this.renderGrid();
                    needsRender = false;
                });
            }
        });
        this.resizeCanvas = this.resizeCanvas.bind(this);
        window.addEventListener('resize', this.resizeCanvas);
        // window.addEventListener('resize',()=> this.resizeCanvas); //????????????????????????????????????????????????????????????????????????????????????

        // Initial setup
        this.resizeCanvas();
    }

    //
    resizeCanvas() {
        this.canvas.width = this.container.clientWidth;  //visible-width
        this.canvas.height = this.container.clientHeight;
        // canvas is undefined here why???????????????????????????????????????????????

        this.renderGrid(); // Re-render after resize
    }

    renderGrid() {
        const scrollX = this.container.scrollLeft; // left towards right kitna scroll kra ha, starting me ye zero rhega
        const scrollY = this.container.scrollTop; // top se kitna scroll kra h neeche ke taraf / simply means top-left pixel of scroll-container

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // sbse pehle pura visible page part mita diya 
        this.ctx.font = '12px sans-serif';

        const startCol = Math.floor(scrollX / this.cellWidth);//pehla col ka number
        const endCol = startCol + Math.ceil(this.canvas.width / this.cellWidth);//last col ka number

        const startRow = Math.floor(scrollY / this.cellHeight);
        const endRow = startRow + Math.ceil(this.canvas.height / this.cellHeight);

        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                const x = col * this.cellWidth - scrollX;
                const y = row * this.cellHeight - scrollY;

                const _cell = new Cell(row,col);
                _cell.drawCell(this.ctx,x,y);
                // this.ctx.strokeStyle = '#ccc';
                // this.ctx.strokeRect(x, y, this.cellWidth, this.cellHeight);

                // this.ctx.fillStyle = '#000';
                // this.ctx.fillText(`${row},${col}`, x + 4, y + 16);
            }
        }
    }
}