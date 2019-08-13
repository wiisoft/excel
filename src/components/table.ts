class Table {

    constructor() {
        this.initTableHead();
        this.initTableBody();
    }
    /**
     * generate table head
     */
    protected initTableHead(): void {
        const component = document.getElementsByTagName('thead')[0];

        const tmpl: any = (document.getElementById('table-head') as HTMLTemplateElement).content.cloneNode(true);
        const tr = tmpl.querySelector('tr');
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
    protected initTableBody(): void {
        const component = document.getElementsByTagName('tbody')[0];

        for (let i = 1; i < 21; i++) {
            const tmpl: any = (document.getElementById('table-tbody') as HTMLTemplateElement).content.cloneNode(true);

            tmpl.querySelector('tr td.vertical__index_label').innerText = i;
            for (let j = 1; j < 11; j++) {
                tmpl.querySelector(`tr td.vertical__index_${j}`).innerText = 'random text';
            }

            component.appendChild(tmpl);
        }
    }
}

export default Table;
