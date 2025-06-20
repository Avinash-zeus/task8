export default class Row {
    constructor(rowNo) {
        this.rowNo = rowNo;
        this.ctx = null;
    }

    setctx(ctx) {
        this.ctx = ctx;
    }
}