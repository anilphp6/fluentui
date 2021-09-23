import * as React from 'react';

import { SearchBox, ISearchBoxStyles } from '@fluentui/react/lib/SearchBox';
import {
  IModalProps, ITextFieldStyleProps, ITextFieldStyles, DialogType, IButton, IColumn,
  PrimaryButton, TextField, DefaultButton,ITextField
} from '@fluentui/react/lib';
import { FontIcon } from '@fluentui/react/lib/Icon';
import {Dialog, DialogFooter, initializeIcons, IIconProps, mergeStyleSets,IContextualMenuProps  } from '@fluentui/react';
import { ActionButton,IconButton } from '@fluentui/react/lib/Button';
import { ShimmeredDetailsListData } from './list'

initializeIcons();
const searchBoxStyles: Partial<ISearchBoxStyles> = {
  root: {
    width: 256,
    'margin-top':'5px',
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
  searchBoxStyles: searchBoxStyles,
  saveStyle: {
    'background': '#F2C811',
    'border-radius': '2px',
    padding: '6px 20px',
    border: 'none',
    'margin-left': '8px'
  },
  cancelStyle: {
    'background': '#fff',
    'border-radius': '2px',
    padding: '6px 20px',
    border: '1px solid #8A8886',
    color: '#323130'
  },
  share: {
    'padding': '5px',
    color: '#000'
  },
  header: {
    background: '#ffffff',
    'border-radius': '2px',
    'background-clip': 'padding-box',
    'box-shadow': 'none',
    'margin-bottom': '2px',
    'padding': '11px 12px 11px 12px',
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
  columns: any[];
  isModalOpen?: boolean;
  modalAction: string;
  error: IerrorMessage;
  actionKey: any;

}

export class DetailsListCompactExample extends React.Component<{}, IDetailsListCompactExampleState> {
  private _allItems: any[];
  private _columns: any[];
  private inputName: React.RefObject<ITextField>
  private inputLink: React.RefObject<ITextField>;
  private buttonRef: React.RefObject<IButton>;
  constructor(props: {}) {
    super(props);

    this._allItems = [
      {
        key: 0,
        name:  'Business report FY19',
        added: 1614277800000,
        owner: 'Tim debor',
        type: 'Link',
        link: '',
        more: <div>
          <ActionButton title={'Share'}  className={'hoverEffect shareButton'}
            onClick={(ev?: React.SyntheticEvent<any>) => { console.log(ev) }}>
            <FontIcon aria-label="share" className={[classNames.IconImg, classNames.share].join(' ')} iconName="Share" />
          </ActionButton >
            <IconButton iconProps={moreIcon} menuProps={this._menuItems(0)} title={'More'} className={'hoverEffect'}/>
          </div>,

      },
      {
        key: 1,
        name:  'Power Bi business report FY21',
        added: 1614277800000,
        owner: 'Tim debor',
        type: 'Link',
        link: '',
        more: <div>
          <ActionButton title={'Share'}  className={'hoverEffect shareButton'}
            onClick={(ev?: React.SyntheticEvent<any>) => { console.log(ev) }}>
            <FontIcon aria-label="share" className={[classNames.IconImg, classNames.share].join(' ')} iconName="Share" />
          </ActionButton >
            <IconButton iconProps={moreIcon} menuProps={this._menuItems(1)} title={'More'} className={'hoverEffect'}/>
          </div>,

      },
    ];


    this._columns = [
      {
        key: 'column1', name: 'Name', fieldName: 'name', isResizable: true, 
        isSorted: true,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        iconClassName:'a',
        isPadded: true,
        className:'field-name1'
      },
      { key: 'column2', name: '', fieldName: 'more', className:'field-name2' },
      {
        key: 'column4', name: 'Added', fieldName: 'added',
        isResizable: true, isSorted: true,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        className:'field-added',
        onColumnClick: this._onColumnClick,
        data: 'string',
          isPadded: true,
      },
      { key: 'column5', name: 'Owner', fieldName: 'owner', className:'field-owner'},
      { key: 'column6', name: 'Type', fieldName: 'type',className:'field-type' },
    ];

    this.state = {
      items: this._allItems,
      columns: this._columns,
      isModalOpen: false,
      modalAction: 'A',
      error: {},
      actionKey: 'list',
    };
    this.inputName = React.createRef<ITextField>();
    this.inputLink = React.createRef<ITextField>();
    this.buttonRef = React.createRef<IButton>();
  }
  private _menuItems=(id:string|number)=>{
    const menuProps: IContextualMenuProps = {
      items: [  
        {
          key: 'edit',
          text: 'Edit',
          title:'Edit',
          onClick: () => { this._openModal('E',id)}
        },
        {
          key: 'share',
          text: 'Share',
          title: 'Share',
          onClick: () => { this._openModal('S',id)}
        },
        {
          key: 'delete',
          text: 'Delete',
          title: 'Delete',
          onClick: () => { this._openModal('D',id)}
        }
      ],
    };
    return menuProps;
  }
  public render(): JSX.Element {
    
    return (
      <div className={'resource-list-items'}>
        <div className={ classNames.header }> 
          <ActionButton className={classNames.fontSize} iconProps={addIcon} allowDisabledFocus componentRef={this.buttonRef}
            onClick={() => { this._openModal('A', 'add') }}>
                      New item
                </ActionButton>
                <SearchBox
                  styles={searchBoxStyles}
                  placeholder="Search"
                  onChange={(_, newValue) => this._onFilter(newValue)}
              />
        </div>
        {<ShimmeredDetailsListData items={this.state.items} columns={this.state.columns} actionKey={this.state.actionKey}/>}
        { this._dialog()}
      </div>
    );
  }

  private _onFilter = (text: string | undefined): void => {
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

  private _findRecord = () => {
    if (this.state.modalAction === 'A') {
      return {
        name: '',
        link: ''
      };
    } else if (this.state.modalAction === 'E') {
      return this.state.items && Array.isArray(this.state.items) && this.state.items.find((item) => item.key === this.state.actionKey);
    }
  }
  private _dialog = () => {
   
    const dialogContentProps = {
      type: DialogType.normal,
      title: this.state.modalAction === 'A' ? 'Add a resource' :
        this.state.modalAction === 'D' ? 'Are you sure you want to delete this resource?' : 'Share',
      closeButtonAriaLabel: 'Close',
    };
    const recordData = this._findRecord();
    return (
      <Dialog hidden={!this.state.isModalOpen}
        onDismiss={this._hideModal} modalProps={modelProps}
        dialogContentProps={dialogContentProps} className={ 'resource-list-items'}>
        {
        this.state.modalAction === 'A' || this.state.modalAction === 'E' ? (
            <>
              <div className={'area-first'}>
              <TextField label="Name"
                defaultValue={recordData && recordData.name}
                componentRef={this.inputName} styles={this._getStyles} required placeholder='Add descriptive name'
                  errorMessage={this.state.error.name} />
                </div>
              <TextField label="Link" defaultValue={recordData && recordData.link}
                componentRef={this.inputLink} styles={this._getStyles}
                placeholder='Add URL' errorMessage={this.state.error.link}
              />
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

  private _deleteHandler = () => {

    this._allItems = this._allItems && this._allItems.filter((item) => {
      return item.key !== this.state.actionKey
    });
    
    this.setState({
      items: [...this._allItems],
    });
    this._hideModal();
  }

  private checkInputV = (value: string|undefined): string | undefined => {
    if (!value) {
      return "Please enter valid name";
    }
    if (value !== undefined && value.trim() ==='' &&  value.length > 1024 ) {
      return "Please enter valid name";
    }
    return undefined;
  }
  private checkInputLink = (value: string|undefined): string | undefined => {
    let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!value) {
      return undefined;
    }
    if (value !== undefined && value.trim() !=='' && !regex.test(value)) {
        return "Please enter valid URL";
    }
    return undefined;
  }
  
  private _submitHandler=()=> {
    const name = this.checkInputV(this.inputName.current?.value);
    const link = this.checkInputLink(this.inputLink.current?.value);
    if (name === undefined && link === undefined) {
      this.setState({
        isModalOpen: false,
        error: {
          link: undefined,
          name: undefined
        }
      });
      this._addedItem({
        name: this.inputName.current?.value,
        link: this.inputLink.current?.value,
        added: Date.now(),
        owner: 'Tim oberio',
        type:'Link',
      });
      this.buttonRef.current?.focus();
    } else {
      
      this.setState({
        error: {
          link: link,
          name: name,
        },
      });
     }
    
  }

  private _addedItem=(items: any)=> {
    const keyItem = (new Date()).getTime();
    if (this.state.actionKey === 'add') {
      this._allItems.unshift(
        {
          key: keyItem,
          name: items.name,
          added: items.added,
          owner: items.owner,
          type: items.type,
          link: items.link,
          more: <div>
            <ActionButton title={'Share'} className={'hoverEffect shareButton'}
              onClick={(ev?: React.SyntheticEvent<any>) => { console.log(ev) }}>
              <FontIcon aria-label="share" className={[classNames.IconImg, classNames.share].join(' ')} iconName="Share" />
            </ActionButton >
            <IconButton aria-label="More" iconProps={moreIcon} menuProps={this._menuItems(keyItem)} title={'More'} className={'hoverEffect'} />
          </div>,

        }
      );
    } else {
      this._allItems = this._allItems.map((item) => {
        if (item.key === this.state.actionKey) {
          return {
            ...this._findRecord(),
            name: items.name,
            link: items.link
          }
        }
        return item;
      })
    }

    this.setState({
      items: [...this._allItems],
    });
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
          return item[key as SearchKey].toLowerCase().includes(SearchKey!.toLowerCase());
        });
    });
  }
  
  private _hideModal=()=> {
    this.setState({
      isModalOpen: false
    });
    this.buttonRef.current?.focus();
  }

  private _openModal = (action: string, key: any) => {
    this.setState({
      isModalOpen: true,
      modalAction: action,
      actionKey: key,
      error: {}
    });
    setTimeout(() => { this.inputName.current?.focus() }, 100);
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
