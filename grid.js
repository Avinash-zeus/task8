import Cell from "./cell.js";
import Row from "./row.js";
import Column from './column.js';

export default class Grid {
    constructor(container, totalRows = 100000, totalCols = 500) {
        this.container = container;
        this.totalRows = totalRows;
        this.totalCols = totalCols;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = "10px Arial";

        this.canvas.classList.add('myCanvas'); // give some css to this canvas tag whivh we are creating here, yahi canvas ele baar baar inject krenge onrender me

        this.canvas.style.top = this.container.getBoundingClientRect().top + 'px';
        this.canvas.style.left = this.container.getBoundingClientRect().left + 'px';

        this.columns = Array.from({ length: totalCols }, (_, i) => new Column(i, 100));
        this.rows = Array.from({ length: totalRows }, (_, i) => new Row(i, 25)); // these tow lines are just for col row size resize
        // this.columns = [];
        // for (let i = 0; i < totalCols; i++) {
        //     this.columns.push(new Column(i, 100));
        // }

        const virtualWidth = totalCols * this.columns[0].width;
        const virtualHeight = totalRows * this.rows[0].height;

        // Dummy spacer to enable scrolling
        const spacer = document.createElement('div');
        spacer.style.width = virtualWidth + 'px';
        spacer.style.height = virtualHeight + 'px';

        this.container.appendChild(spacer);
        this.container.appendChild(this.canvas);

        this.resizeCanvas = this.resizeCanvas.bind(this);

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

        let startCol = 0, sumX = 0;
        for (const col of this.columns) {
            if (sumX + col.width > scrollX) break;      // const startCol = Math.floor(scrollX / 100); 
            sumX += col.width;
            startCol++;
        }
        console.log()
        const endCol = Math.min(startCol + 20, this.totalCols);    //at most 20col on screen possible

        let startRow = 0, sumY = 0;
        for (const row of this.rows) {
            if (sumY + row.height > scrollY) break;
            sumY += row.height;
            startRow++;
        }
        const endRow = Math.min(startRow + 40, this.totalRows);

        let y = sumY - scrollY;
        for (let i = startRow; i < endRow; i++) {
            let x = sumX - scrollX;
            for (let j = startCol; j < endCol; j++) {
                const cell = new Cell(this.rows[i], this.columns[j], `${i}, ${j}`);
                cell.drawCell(this.ctx, x, y, this.columns[j].width, this.rows[i].height);
                x += this.columns[j].width;
            }
            y += this.rows[i].height;
        }
    }
}