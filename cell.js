export default class Cell {
    constructor(row, col, data = "Hello") {
        this.row = row;
        this.col = col;
        this.data = data;
    }

    drawCell(ctx, x, y, width = 100, height = 25) {
        ctx.strokeStyle = '#ccc';
        ctx.strokeRect(x, y, width, height);

        ctx.fillStyle = '#000';
        ctx.fillText(this.data, x + 4, y + 16);
    }

    editData(val) {
        this.data = val;
    }
}