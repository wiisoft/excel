class Table {
    public static init(): void {
        Table.initTableHead();
        Table.initTableBody();
    }

    /**
     * generate table head
     */
    protected static initTableHead(): void {
        const component = document.getElementsByTagName('thead')[0];

        const tmpl: Node = (document.getElementById('table-head') as HTMLTemplateElement).content.cloneNode(true);
        const tr = (tmpl as HTMLElement).querySelector('tr');
        tr.innerHTML = '<th></th>';

        const alphabet = new Array(26).fill(1).map((_, i): string => String.fromCharCode(65 + i));
        for (let i = 0; i < 10; i++) {
            tr.innerHTML += `<th>${alphabet[i]}</th>`;
        }
        component.appendChild(tmpl);
    }

    /**
     * generate table body
     */
    protected static initTableBody(): void {
        const component = document.getElementsByTagName('tbody')[0];

        for (let i = 1; i < 21; i++) {
            const tmpl: Node = (document.getElementById('table-tbody') as HTMLTemplateElement).content.cloneNode(true);

            const label: HTMLElement = (tmpl as HTMLElement).querySelector('tr td.vertical__index_label');
            label.innerText = i.toString();
            for (let j = 1; j < 11; j++) {
                const labelText: HTMLElement = (tmpl as HTMLElement).querySelector(`tr td.vertical__index_${j}`);
                labelText.innerText = 'random text';
            }

            component.appendChild(tmpl);
        }
    }
}

export default Table;
