import * as React from 'react';

import { SearchBox, ISearchBoxStyles } from '@fluentui/react/lib/SearchBox';
import {
  DetailsList, IModalProps, ITextFieldStyleProps, ITextFieldStyles, DialogType, DetailsListLayoutMode, SelectionMode, IColumn, Link,
  PrimaryButton, TextField, DefaultButton,ITextField
} from '@fluentui/react/lib';
import { FontIcon } from '@fluentui/react/lib/Icon';
import {Dialog, DialogFooter, initializeIcons, IIconProps, mergeStyleSets,IContextualMenuProps  } from '@fluentui/react';
import { ActionButton,IconButton } from '@fluentui/react/lib/Button';

initializeIcons();

const searchBoxStyles: Partial<ISearchBoxStyles> = {
  root: {
    width: 200,
    float: 'right',
    '::after': {
      'border': '2px solid #A5A4A2',
    },
  }
};


const addIcon: IIconProps = { iconName: 'Add', style: { fontSize: 16, height: 16, width: 16 } };

const moreIcon: IIconProps = { iconName: 'More', style: { fontSize: 16, height: 16, width: 16 } };


const classNames = mergeStyleSets({
  IconImg: {
    fontSize: 16,
    height: 16,
    width: 16,
  },
  searchBoxStyles:searchBoxStyles,
  saveStyle: {
    'background': '#F2C811',
    'border-radius': '2px',
    padding: '6px 20px',
    border: 'none',
    'margin-left':'8px'
  },
  cancelStyle: {
    'background': '#fff',
    'border-radius': '2px',
    padding: '6px 20px',
    border: '1px solid #8A8886',
    color: '#323130'
  },
  share: {
    'margin-right': '10px',
    color:'#000'
  },
  header: {
    background: '#ffffff',
    padding: '28px',
    'border-radius': '2px',
    'background-clip': 'padding-box',
    'box-shadow': '0 1.6px 3.6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%)',
    'margin-bottom':'2px'
  },
  fontSize: {
    'font-size': '14px',
    'line-height': '20px',
  }
});

const modelProps:IModalProps = {
  isBlocking: true,
  topOffsetFixed: true,
  styles: {
    main: {
      'max-width': '450px',
      '@media(min-width: 480px)': {
        'max-width': 450
      }
    }
  },
};
export interface IDetailsListCompactExampleItem {
  key: number;
  name: any;
  added: string;
  owner: string;
  type: string;
  more?: any;
  link?: any;
}

export interface IFilter {
  name?: string;
  added?: string;
  link?: string;
  owner?: string;
  type?: string;
}

interface IerrorMessage {
  link?: string|undefined;
  name?:string|undefined
}
interface IDetailsListCompactExampleState {
  items: IDetailsListCompactExampleItem[];
  columns: IColumn[];
  isModalOpen?: boolean;
  modalAction: string;
  error: IerrorMessage;
  actionKey: any;

}

export class DetailsListCompactExample extends React.Component<{}, IDetailsListCompactExampleState> {
  private _allItems: any[];
  private _columns: IColumn[];
  private inputName: React.RefObject<ITextField>
  private inputLink: React.RefObject<ITextField>;
  constructor(props: {}) {
    super(props);

    this._allItems = [
      {
        key: 1,
        name:  'XYZ',
        added: 'Mohit',
        owner: 'Mohit',
        type: 'Admin',
        link: 'google.com',
        more: <div>
          <Link href='#' onClick={(ev?: React.SyntheticEvent<any>) => { console.log(ev)}}><FontIcon aria-label="Compass" className={[classNames.IconImg, classNames.share].join(' ')} iconName="Share"/></Link>
          <IconButton iconProps={moreIcon} menuProps={this._menuItems(0)} />
          </div>,

      },
      {
        key: 2,
        name: 'ABC',
        added: 'Deepika',
        owner: 'a',
        type: 'blogger',
        link: 'yahoo.com',
        more: <div>
          <Link href='#' onClick={(ev?: React.SyntheticEvent<any>) => { console.log(ev)}}><FontIcon aria-label="Compass" className={[classNames.IconImg, classNames.share].join(' ')} iconName="Share"/></Link>
          <IconButton iconProps={moreIcon} menuProps={this._menuItems(1)} />
          </div>,

      }
    ];


    this._columns = [
      { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true, isSorted: true,sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      onColumnClick: this._onColumnClick,
      data: 'string',
      isPadded: true,},
      { key: 'column2', name: '', fieldName: 'more', minWidth: 100, maxWidth: 200, },
      { key: 'column4', name: 'Added', fieldName: 'added', minWidth: 100, maxWidth: 200, isResizable: true, isSorted: true,sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      onColumnClick: this._onColumnClick,
      data: 'string',
      isPadded: true,},
      { key: 'column5', name: 'Owner', fieldName: 'owner', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column6', name: 'Type', fieldName: 'type', minWidth: 100, maxWidth: 200, isResizable: true },
    ];

    this.state = {
      items: this._allItems,
      columns: this._columns,
      isModalOpen: false,
      modalAction: 'A',
      error: {},
      actionKey:''
    };
    this.inputName = React.createRef<ITextField>();
    this.inputLink = React.createRef<ITextField>();
  }
  private _menuItems=(id:string|number)=>{
    const menuProps: IContextualMenuProps = {
      items: [  
        {
          key: 'edit',
          text: 'Edit',
          onClick: () => { this._openModal('E',id)}
        },
        {
          key: 'share',
          text: 'Share',
          onClick: () => { this._openModal('S',id)}
        },
        {
          key: 'delete',
          text: 'Delete',
          onClick: () => { this._openModal('D',id)}
        }
      ],
    };
    return menuProps;
  }
  public render(): JSX.Element {
    const { items,columns } = this.state;
    return (
      <div>
        <div className={ classNames.header }> 
              <ActionButton className={classNames.fontSize} iconProps={addIcon} allowDisabledFocus  onClick={() => { this._openModal('A','add') }}>
                      New item
                </ActionButton>
                <SearchBox
                  styles={searchBoxStyles}
                  placeholder="Search"
                  onEscape={ev => {
                    console.log('Custom onEscape Called');
                  }}
                  onClear={ev => {
                    console.log('Custom onClear Called');
                  }}
                  onChange={(_, newValue) => this._onFilter(newValue)}
                  onSearch={newValue => console.log('SearchBox onSearch fired: ' + newValue)}
              />
        </div>
        <DetailsList
          compact={true}
          items={items}
          onRenderItemColumn={this._renderItemColumn}
          columns={columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
          selectionMode={SelectionMode.none}
          selectionPreservedOnEmptyClick={true}
        />
        { this._dialog()}
      </div>
    );
  }
  private _renderItemColumn(item: any, index: any, column: any) {
    console.log(item,column)
    const fieldContent = item[column.fieldName as keyof IColumn] as string;
    if (column.name === 'Name') {
      return <Link href={ item['link']}>{fieldContent}</Link>;
    }
    return <span>{fieldContent}</span>;
  }

  private _onFilter = (text: string | undefined): void => {
    console.log('newValue-', text);
    this.setState({
      items: text ? this._filterPlainArray(
                        this._allItems,
                          {
                          name:text
                          }
      )
        : this._allItems,
    });
  };

  private _dialog = () => {
   
    const dialogContentProps = {
      type: DialogType.normal,
      title: this.state.modalAction === 'A' ? 'Add a resource' :
        this.state.modalAction === 'D' ? 'Are you sure you want to delete this resource?' : 'Share',
      closeButtonAriaLabel: 'Close',
    };
    return (
      <Dialog hidden={!this.state.isModalOpen}
        onDismiss={this._hideModal} modalProps={modelProps}
        dialogContentProps={dialogContentProps}>
        {
        this.state.modalAction === 'A' || this.state.modalAction === 'E' ? (
            <>
              <TextField label="Name" value={ this.state.modalAction === 'E'? this.state.items[this.state.actionKey].name:'' } componentRef={this.inputName}  styles={this._getStyles} required placeholder='Add descriptive name'  errorMessage ={this.state.error.name} />
              <TextField label="Link" value={ this.state.modalAction === 'E'? this.state.items[this.state.actionKey].link:'' } componentRef={ this.inputLink} styles={this._getStyles} placeholder='Add URL' errorMessage ={this.state.error.link}/>
              <DialogFooter>
                <PrimaryButton text="Save" onClick={ this._submitHandler} />
                <DefaultButton text="Cancel" onClick={ this._hideModal }/>
              </DialogFooter>
          </>
          ) :  this.state.modalAction === 'D' ? (<div>
                  When you delete a resource, the link will be removed.
                  <DialogFooter>
                    <DefaultButton text="No,cancel"  onClick={ this._hideModal }/>
                    <PrimaryButton text="Yes,delete" onClick={ this._deleteHandler}  />
                  </DialogFooter>
              </div>):'<div>Share...</div>'
        }
      </Dialog>
    );
  }

  private _deleteHandler=()=> {
    console.log('deleted.',this.state.actionKey)
  }

  private checkInputV = (value: string|undefined): string | undefined => {
    if (value !== undefined && (value.trim() ==='' || value.length > 1024)  ) {
      return "Please enter valid name";
    }
    return undefined;
  }
  private checkInputLink = (value: string|undefined): string | undefined => {
   let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (value !== undefined && value.trim() !=='' && !regex.test(value)) {
        return "Please enter valid URL";
    }
    return undefined;
  }
  
  private _submitHandler=()=> {

    const name = this.checkInputV(this.inputName.current?.value);
    const link = this.checkInputLink(this.inputLink.current?.value);

    console.log(name,link)
    if (name === undefined && link === undefined) {
      alert('submitted');
      this.setState({
        isModalOpen: false,
        error: {
          link: undefined,
          name: undefined
        }
      })
    } else {
      
      this.setState({
        error: {
          link: link,
          name: name
        },
      });
     }
    
  }
  private _getStyles(props: ITextFieldStyleProps): Partial<ITextFieldStyles> {
    return {
      fieldGroup: [
        { width: 400 },
      ],
    };
  }
  private _filterPlainArray(items: IDetailsListCompactExampleItem[], filters: IFilter) {
    type SearchKey = keyof IFilter; 
    const filterKeys = Object.keys(filters);
    return items.filter(item => {
        // filters using the (OR) operator
        return filterKeys.some(key => {
      
          if (!filters[key as SearchKey]) return true;
          //return filters[key as SearchKey] === item[key as SearchKey];
          const SearchKey = filters[key as SearchKey];
          return item[key as SearchKey].includes(SearchKey!);
        });
    });
  }
  
  _hideModal=()=> {
    this.setState({
      isModalOpen:false
    })
  }

  _openModal = (action: string, key: any) => {
  console.log('---',key)
    this.setState({
      isModalOpen: true,
      modalAction: action,
      actionKey: key,
      error: {}
    })
  }
  
  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
      const { columns, items } = this.state;
      const newColumns: IColumn[] = columns.slice();
      const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
      newColumns.forEach((newCol: IColumn) => {
        if (newCol === currColumn) {
          currColumn.isSortedDescending = !currColumn.isSortedDescending;
          currColumn.isSorted = true;
        } else {
          newCol.isSorted = false;
          newCol.isSortedDescending = true;
        }
      });
      const newItems = this._copyAndSort(items, currColumn.fieldName!, currColumn.isSortedDescending);
      this.setState({
        columns: newColumns,
        items: newItems,
      });
  }

  private _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
    const key = columnKey as keyof T;
    return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
  }
}
