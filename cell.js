export default class Cell {
    constructor(rowNo, colNo, ctx, data = "Hello") {
        this.rowNo = rowNo;
        this.colNo = colNo;
        this.ctx = ctx;
        this.data = data;

        this.ctx.strokeRect(colNo * 100, rowNo * 50, 100, 50);
        this.ctx.fillText(`Row: ${rowNo}, Col: ${colNo}`, colNo * 100 + 20, rowNo * 50 + 20);

    }

    editData(val) {
        this.data = val;
    }
}