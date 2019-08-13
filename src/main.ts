import './styles/app.scss';
import components from './components';

const main = (): void => {
    console.log('start App!');

    // create new table
    new components.Table();

    // add resizable behavior
    new components.ResizableTable('mainTable');
};

main();
