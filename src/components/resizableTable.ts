class ResizableTable {
    public table: HTMLElement;

    protected constructor(elementId: string) {
        this.table = document.getElementById(elementId);

        const tableHead = this.table.getElementsByTagName('thead')[0];
        const tableBody = this.table.getElementsByTagName('tbody')[0];

        this.resizeColumn(tableHead);
        this.resizeRow(tableBody);
    }

    public static init(elementId: string): ResizableTable {
        return new ResizableTable(elementId);
    }

    /**
     * resize row
     * @param element
     */
    protected resizeRow(element: HTMLElementTagNameMap['tbody']): void {
        const rows = [...element.getElementsByTagName('tr')];
        const tableWidth = this.table.offsetWidth;

        rows.forEach((row: HTMLElement): void => {
            const div = ResizableTable.createDiv({
                bottom: '0',
                left: '0',
                height: '5px',
                position: 'absolute',
                cursor: 'row-resize',
                userSelect: 'none',
                width: `${tableWidth}px`,
            });

            // add div resize handler only for first element
            row.appendChild(div);
            row.style.position = 'relative';

            ResizableTable.resizeRowBehavior(div);
        });
    }

    /**
     * resize column
     * @param element
     */
    protected resizeColumn(element: HTMLElementTagNameMap['thead']): void {
        const row = element.getElementsByTagName('tr')[0];
        const columns = row ? row.children : undefined;

        if (!columns) return;

        this.table.style.overflow = 'hidden';
        const tableHeight = this.table.offsetHeight;

        for (let i = 0; i < columns.length; i++) {
            // add div block for each column
            const div = ResizableTable.createDiv({
                top: '0',
                right: '0',
                width: '5px',
                position: 'absolute',
                cursor: 'col-resize',
                userSelect: 'none',
                height: `${tableHeight}px`,
            });

            // add div resize handler
            columns[i].appendChild(div);
            (columns[i] as HTMLElement).style.position = 'relative';
            ResizableTable.resizeColumnBehavior(div);
        }
    }

    /**
     * create div with absolute position on right side  column
     * @param style
     * @return HTMLElementTagNameMap
     */
    protected static createDiv(style: { [key: string]: string }): HTMLElementTagNameMap['div'] {
        const div = document.createElement('div');

        const keys = Object.keys(style);
        const values = Object.values(style);
        for (let i = 0; i < keys.length; i += 1) {
            div.style.setProperty(keys[i], values[i]);
        }

        return div;
    }

    /**
     *  add listeners to table row
     * @param element
     */
    protected static resizeRowBehavior(element: HTMLElement): void {
        const onMouseMove = (event?: MouseEvent): void => {
            const tr = element.parentElement;

            tr.style.height = `${event.clientY}px`;
        };

        const onMouseup = (): void => {
            document.documentElement.removeEventListener('mousemove', onMouseMove, false);
            document.documentElement.removeEventListener('mouseup', onMouseup, false);
        };
        const onMouseDown = (): void => {
            document.documentElement.addEventListener('mousemove', onMouseMove, false);
            document.documentElement.addEventListener('mouseup', onMouseup, false);
        };

        element.addEventListener('mousedown', onMouseDown, false);

        element.addEventListener('mouseover', (e): void => {
            (e.target as HTMLElement).style.borderBottom = '2px solid #0000ff';
        });
    }

    /**
     * add listeners to table column
     * @param element
     */
    private static resizeColumnBehavior(element: HTMLElement): void {
        let elementPageX: number;
        let currentColumn: HTMLElement | null;
        let nextColumn: Element | null;
        let currentColumnWidth: number;
        let nextColumnWidth: number;

        element.addEventListener('mousedown', (e): void => {
            currentColumn = (e.target as HTMLElement).parentElement;
            nextColumn = currentColumn.nextElementSibling;
            elementPageX = e.pageX;

            const padding: number = ResizableTable.paddingDiff(currentColumn);

            currentColumnWidth = currentColumn.offsetWidth - padding;
            if (nextColumn) nextColumnWidth = (nextColumn as HTMLElement).offsetWidth - padding;
        });

        element.addEventListener('mouseover', (e): void => {
            (e.target as HTMLElement).style.borderRight = '2px solid #0000ff';
        });

        element.addEventListener('mouseout', (e): void => {
            (e.target as HTMLElement).style.borderRight = '';
        });

        document.addEventListener('mousemove', (e): void => {
            if (currentColumn) {
                const diffX = e.pageX - elementPageX;
                if (nextColumn) (nextColumn as HTMLElement).style.width = `${nextColumnWidth - (diffX)}px`;
                currentColumn.style.width = `${currentColumnWidth + diffX}px`;
            }
        });

        document.addEventListener('mouseup', (): void => {
            currentColumn = undefined;
            nextColumn = undefined;
            elementPageX = undefined;
            nextColumnWidth = undefined;
            currentColumnWidth = undefined;
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
        return (window.getComputedStyle(elm, null).getPropertyValue(css));
    }
}

export default ResizableTable;
