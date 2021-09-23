import * as React from 'react';
import {
    ShimmeredDetailsList,SelectionMode,IColumn,Link
} from '@fluentui/react/lib';

import { IDetailsListCompactExampleItem, IFilter } from './datalist';

import { useSetInterval,useSetTimeout } from '@fluentui/react-hooks';


type AppProps = {
    items: IDetailsListCompactExampleItem[],
    columns: any[],
    actionKey: any;
};
const INTERVAL_DELAY: number = 1000;

const epochs = [
['year', 31536000],
['month', 2592000],
['day', 86400],
['hour', 3600],
['minute', 60],
['second', 1]
]; 
interface IShimmerState {
    lastIntervalId: number;
    visibleCount: number;
  }

export const ShimmeredDetailsListData = (props: AppProps) => {
    const { current: state } = React.useRef<IShimmerState>({
        lastIntervalId: 0,
        visibleCount: 0,
      });
      React.useEffect(() => {
        onLoadData(true);
      }, [props.items]);

    const [items, setItems] = React.useState<(IDetailsListCompactExampleItem | null|undefined)[] | undefined>(undefined);
    //const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);  
        
  const { setInterval, clearInterval } = useSetInterval();
    const { setTimeout  } = useSetTimeout();
    const [count, setCount] = React.useState(0);

    const onLoadData = React.useCallback(
      (checked: boolean): void => {
        // is delete
        if (items && props.items && items.length > props.items.length) {
          const deleteRecords = items.map((r, i) => {
            if (r?.key === props.actionKey) {
              return null;
            }
            return r;
          });
          setItems(deleteRecords);
          setTimeout(() => {
            const newReacord = deleteRecords.filter((i)=>i!==null)
            setItems(newReacord);
          }, INTERVAL_DELAY);
        }
        // is edit;
        if (items && props.items && items.length === props.items.length) {
          console.log('fff--->', items.length, items);
          const editRecords = items.map((r) => {
            if (r?.key === props.actionKey) {
              return null;
            }
            return r;
          });
          
          setItems(editRecords); 
          const editReacordIndex = editRecords.findIndex((element) => element === null);
          editRecords[editReacordIndex] = props.items[props.actionKey];
          setItems(editRecords);
        }
         // is add;
         if (items && props.items && items.length < props.items.length) {
          const newRowAdded = Number(props.items.length- items.length);    
          const newitems = [
            ...new Array(newRowAdded).fill(null),
            ...items
          ]
          setItems(newitems);  
          const addReacordIndex = newitems.findIndex((element) => element === null);
          newitems[addReacordIndex] = props.items[0];
          setTimeout(() => {
            setItems(newitems);
          }, INTERVAL_DELAY);
        }
        // called in list mode only
        const loadMoreItems = (): void => {
          console.log('New item####->', items);
          state.visibleCount = Math.min(props.items.length, state.visibleCount + 1);
          const data = props.items.map((current, index) => (index < state.visibleCount ? current : null));
          setTimeout (() => {
            setItems(data);
          }, INTERVAL_DELAY);
        };
        state.visibleCount = count;
        setCount(state.visibleCount);
        if (checked &&  props.actionKey==='list') {
          loadMoreItems();
          state.lastIntervalId = setInterval(loadMoreItems, props.actionKey==='list' ? INTERVAL_DELAY:0);
        }
        
      },
      [clearInterval, setInterval,setTimeout,state,count,props.items],
  );
  if (items && !items.some(el => el === null)) {
    clearInterval(state.lastIntervalId);
  }
  console.log('render....',items);
  return (
      <ShimmeredDetailsList
          setKey="items"
          items={items ||[]}
          columns={props.columns}
          selectionMode={SelectionMode.none}
          onRenderItemColumn={_renderItemColumn}
          enableShimmer={!items}
      />
  );
};

const _renderItemColumn=(item: any, index: any, column: any) =>{

    const fieldContent = item[column.fieldName as keyof IColumn] as string;

    if (column.name === 'Name') {
      const link = item['link'] && item['link'].trim() !== '' ? item['link'] : '#'
     // const text = fieldContent.slice(0, 110) + (fieldContent.length > 110 ? "..." : "");
      return <Link href={link}>{fieldContent}</Link>;
    }
    if (column.name === 'Added') {
       return <div className='date-time'>{timeAgo(Number(fieldContent))}</div>
     }
    if (column.name === '') {
      return <div>{fieldContent}</div>;
    }
    return <div>{fieldContent}</div>;
}
const timeAgo = (datetimestamp:number) => {
    const timeAgoInSeconds = Math.floor((new Date().valueOf() - datetimestamp) / 1000);
    if (timeAgoInSeconds === 0) {
      return 'Just now';
    }
    const i = getDuration(timeAgoInSeconds);
    const interval = i && i.interval ? i.interval : undefined;
    const epoch = i && i.epoch ? i.epoch : undefined;
    const suffix = interval === 1 ? '' : 's';
    return `${interval} ${epoch}${suffix} ago`;
};
  
const getDuration = (timeAgoInSeconds: any) => {
  
    for (let [name, seconds] of epochs) {
        const interval = Math.floor(timeAgoInSeconds / Number(seconds));
        if (interval >= 1) {
            return {
                interval: interval,
                epoch: name
            };
        }
    }
  };