import './styles/app.scss';
import components from './components';

const main = (): void => {
    console.log('start App!');

    // create new table
    components.Table.init();

    // add resizable behavior
    components.ResizableTable.init('mainTable');
};

main();
