import { isArray } from '../utils/utils';

const Table = ({
  items = [],
  thead = [],
  classes = {},
  selectedKey = '',
  selectedValue = '',
  onRowClick = () => {},
}: {
  items: any;
  thead: any;
  classes: any;
  selectedKey?: string | null;
  selectedValue?: string | null;
  onRowClick?: (item: any) => void;
}) => {
  const highlight = (item: any) => {
    if (selectedKey && selectedKey in item) {
      return item[selectedKey] === selectedValue ? 'table-active' : '';
    }

    return '';
  };
  return (
    <div>
      <table className={classes.table}>
        <thead className={classes.thead}>
          <tr>
            {thead.map((label: string) => (
              <th key={label} className="text-capitalize">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={classes.tbody}>
          {isArray(items) &&
            items.map((item: any, index: number) => (
              <tr
                key={index}
                onClick={() => onRowClick(item)}
                className={highlight(item)}
              >
                {isArray(thead) && thead.map((label) => <td>{item[label]}</td>)}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
