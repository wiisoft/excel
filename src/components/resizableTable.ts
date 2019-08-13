class ResizableTable {

    public table: HTMLElement;

    constructor(element: string) {
        this.table = document.getElementById(element);

        this.horizontalResize()
    }

    protected horizontalResize(): void {
        const row = this.table.getElementsByTagName('tr')[0];
        const columns = row ? row.children : undefined;

        if (!columns) return;

        this.table.style.overflow = 'hidden';
        const tableHeight = this.table.offsetHeight;

        for (let i = 0; i < columns.length; i++) {
            const div = ResizableTable.createDiv(tableHeight);

            // add div resize handler
            columns[i].appendChild(div);
            (columns[i] as HTMLElement).style.position = 'relative';
            this.setListeners(div);
        }

    }

    /**
     * create div with absolute position on right side  column
     * @param height
     */
    protected static createDiv(height: number): HTMLElementTagNameMap['div'] {
        const div = document.createElement('div');
        div.style.top = '0';
        div.style.right = '0';
        div.style.width = '5px';
        div.style.position = 'absolute';
        div.style.cursor = 'col-resize';
        div.style.userSelect = 'none';
        div.style.height = `${height}px`;
        return div;
    }


    /**
     * add listeners to table row
     * @param div
     */
    protected setListeners(div: HTMLElement): void {
        let pageX: number, curCol: HTMLElement | null, nxtCol: Element | null, curColWidth: number, nxtColWidth: number;

        div.addEventListener('mousedown', function (e) {
            curCol = (e.target as HTMLElement).parentElement;
            nxtCol = curCol.nextElementSibling;
            pageX = e.pageX;

            const padding: number = ResizableTable.paddingDiff(curCol);

            curColWidth = curCol.offsetWidth - padding;
            if (nxtCol)
                nxtColWidth = (nxtCol as HTMLElement).offsetWidth - padding;
        });

        div.addEventListener('mouseover', function (e) {
            (e.target as HTMLElement).style.borderRight = '7px solid #0000ff';
        });

        div.addEventListener('mouseout', function (e) {
            (e.target as HTMLElement).style.borderRight = '';
        });

        document.addEventListener('mousemove', function (e) {
            if (curCol) {
                const diffX = e.pageX - pageX;

                if (nxtCol)
                    (nxtCol as HTMLElement).style.width = (nxtColWidth - (diffX)) + 'px';

                curCol.style.width = (curColWidth + diffX) + 'px';
            }
        });

        document.addEventListener('mouseup', function (e) {
            curCol = undefined;
            nxtCol = undefined;
            pageX = undefined;
            nxtColWidth = undefined;
            curColWidth = undefined
        });
    }

    /**
     * calculate padding difference
     * @param col
     * @return number
     */
    protected static paddingDiff(col: HTMLElement): number {
        const colStyle = ResizableTable.getStyleVal(col, 'box-sizing');
        if (colStyle === 'border-box') {
            return 0;
        }

        const paddingLeft = ResizableTable.getStyleVal(col, 'padding-left');
        const paddingRight = ResizableTable.getStyleVal(col, 'padding-right');

        // get padding add result to number
        return (~~paddingLeft + ~~paddingRight);

    }

    /**
     * get style property val
     * @param elm
     * @param css
     * @return string
     */
    protected static getStyleVal(elm: HTMLElement, css: string): string {
        return (window.getComputedStyle(elm, null).getPropertyValue(css))
    }
}

export default ResizableTable;

