import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import {
  DataTable,
  DataTableExpandedRows,
  DataTableRowToggleEvent,
  DataTableRowGroupHeaderTemplateType,
} from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { ColorPicker } from "primereact/colorpicker";
import { Button } from "primereact/button";
import { Chips, ChipsChangeEvent } from "primereact/chips";
import { DropdownData } from "../DropdownComponent/models/dropdown.model";
interface Props {
  loading?: boolean;
  columns: ColumnConfig[];
  data: any[];
  paginator?: boolean;
  totalRecords?: number;
  editable?: boolean;
  onRowEditComplete?: (rowData: any) => void;
  reorderableColumnsDynamicDataTable?: boolean;
  reorderableRowsDynamicDataTable?: boolean;
  onRowReorderDynamicDataTable?: undefined | ((e: any) => void);
  filter?: boolean;
  sortFieldName?: string;
  sortOrderValue?: 0 | 1 | -1;
  rowGroupMode?: "subheader" | "rowgroup" | "rowspan";
  groupRowsByValue?: string;
  sortModeValue?: "multiple" | "single";
  expandableRowGroupsValue?: boolean;
  headerTemplateActive?: DataTableRowGroupHeaderTemplateType<any[]>;
  showDateFilter?: boolean;
  showInputFilter?: boolean;
  onApplyDateFilter?: (dateRange: [string | null, string | null]) => void;
  onApplySearchFilter?: (value: string | null) => void;
  headerTemplateForTable?: JSX.Element;
  filterDisplayValue?: "menu" | "row";
}

export interface ColumnConfig {
  fieldType?: string;
  field: string;
  header: string;
  editable?: boolean;
  isSwitch?: boolean;
  fieldOptions?: DropdownData[];
  filter?: boolean;
  filterPlaceHolder?: string;
  body?: (op: any) => string | JSX.Element;
}

function DynamicDataTable({
  loading,
  columns,
  data,
  paginator,
  totalRecords,
  editable,
  onRowEditComplete,
  reorderableColumnsDynamicDataTable = false,
  reorderableRowsDynamicDataTable = false,
  onRowReorderDynamicDataTable = undefined,
  filter,
  sortFieldName,
  sortOrderValue = 1,
  rowGroupMode,
  groupRowsByValue,
  sortModeValue,
  expandableRowGroupsValue = false,
  headerTemplateActive,
  headerTemplateForTable,
  filterDisplayValue,
  showDateFilter = false,
  onApplyDateFilter,
  onApplySearchFilter,
  showInputFilter = false,
}: Props): JSX.Element {
  const [optionsSelect, setOptionsSelect] = useState<any | null>();
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<
    any[] | DataTableExpandedRows
  >();
  useEffect(() => {
    void generateOptionsSelects();
  }, []);

  const generateOptionsSelects = (): any => {
    const selects: any = {};
    for (let i = 0; i < columns?.length; i++) {
      const column = columns[i];
      if (
        column.fieldType === "multiSelect" &&
        column.fieldOptions &&
        column.fieldOptions?.length > 0
      ) {
        selects[column.field] = column.fieldOptions;
      }
    }
    setOptionsSelect(selects);
  };
  const inputTextEditor = (options: any): JSX.Element => {
    return (
      <div className="grid justify-content-center">
        <InputText
          type="text"
          value={options.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            options.editorCallback(e.target.value)
          }
        />
      </div>
    );
  };

  const switchEditor = (options: any): JSX.Element => {
    return (
      <span className="p-float-label">
        <InputSwitch
          id={options.rowData.id}
          checked={options.value}
          onChange={(e) => options.editorCallback(e.value)}
        />
      </span>
    );
  };

  // TODO:Sigue en verificacion
  const dropdownEditor = (options: any): JSX.Element => {
    const dropdownOptions = columns.find(
      (column) => column.field === options.field
    )?.fieldOptions;
    return (
      <>
        <Dropdown
          filter
          optionLabel="name"
          value={options.value}
          options={dropdownOptions}
          onChange={(e: DropdownChangeEvent) => options.editorCallback(e.value)}
          style={{ width: "100%" }}
          placeholder="Elije una opción"
        />
      </>
    );
  };

  const colorPickerEditor = (options: any): JSX.Element => {
    return (
      <ColorPicker
        name={options.field}
        value={options.value}
        onChange={(e) => {
          options.editorCallback(e.value);
        }}
      />
    );
  };
  const chipsEditorComponent = (options: any): JSX.Element => {
    return (
      <div className="card p-fluid">
        <Chips
          value={options.value}
          onChange={(e: ChipsChangeEvent) => options.editorCallback(e.value)}
        />
      </div>
    );
  };
  const multiSelectEditor = (options: any): JSX.Element => {
    const markingIds = options.rowData.markings?.map(
      (marking: { idMarking: any }) => marking.idMarking
    );

    const filterValue = optionsSelect[options.field].filter(
      (val: DropdownData) => markingIds?.includes(+val.code)
    );

    return (
      <div className="grid justify-content-center">
        <MultiSelect
          options={optionsSelect[options.field]}
          value={filterValue}
          onChange={(e: MultiSelectChangeEvent) => {
            options.editorCallback(
              e.value?.map((marking: { code: any }) => ({
                idMarking: +marking.code,
              }))
            );
          }}
          placeholder="Select options"
          filter
          filterPlaceholder="Buscar"
          maxSelectedLabels={1}
          optionLabel="name"
          selectedItemsLabel="{0} marcaciones"
        />
      </div>
    );
  };
  const multiselectRolesComponent = (options: any): JSX.Element => {
    let roles: string[] = [];
    if (options.rowData.roles && typeof options.rowData.roles === "string") {
      roles = options.rowData.roles?.split(",");
    } else {
      roles = options.rowData.roles;
    }
    const multiSelectOptions = columns.find(
      (column) => column.field === options.field
    )?.fieldOptions;
    const defaultValues = multiSelectOptions?.filter((option: DropdownData) =>
      roles?.includes(option.name)
    );
    return (
      <MultiSelect
        options={multiSelectOptions}
        optionLabel="name"
        placeholder="Selecciona los roles"
        maxSelectedLabels={3}
        className="w-full md:w-20rem"
        value={defaultValues}
        onChange={(e: MultiSelectChangeEvent) => {
          options.editorCallback(
            e.value?.map((role: DropdownData) => role.name)
          );
        }}
      />
    );
  };
  const showSearchInput = data ? data?.length > 5 : false;

  const header = (
    <div className="grid table-header">
      <div className="col-6 justify-content-start">
        {headerTemplateForTable}
      </div>
      <div className="col-6">
        {filter && (
          <div className="">
            {showSearchInput && (
              <span className="p-input-icon-left">
                <InputText
                  type="search"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setGlobalFilter(e.target.value);
                  }}
                  placeholder="Buscar..."
                />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const editorMap: Record<string, (options: any) => JSX.Element | null> = {
    text: inputTextEditor,
    switch: switchEditor,
    dropdown: dropdownEditor,
    multiSelect: multiSelectEditor,
    colorPicker: colorPickerEditor,
    multiselectRole: multiselectRolesComponent,
    chips: chipsEditorComponent,
  };

  const getEditorByFieldType = (
    column: ColumnConfig
  ): ((options: any) => JSX.Element | null) | undefined => {
    return editorMap[column.fieldType ?? "text"];
  };

  const filterClearTemplate = (options: any): JSX.Element => {
    return (
      <Button
        type="button"
        label="Limpiar"
        onClick={options.filterClearCallback}
        severity="secondary"
      ></Button>
    );
  };
  const filterApplyTemplate = (options: any): JSX.Element => {
    return (
      <Button
        type="button"
        label="Aplicar"
        onClick={options.filterApplyCallback}
        severity="success"
      ></Button>
    );
  };

  return (
    <DataTable
      loading={loading}
      value={data}
      paginator={paginator && data?.length > 5}
      header={header}
      globalFilter={globalFilter}
      rows={paginator ? 5 : data?.length}
      rowsPerPageOptions={[5, 25, 50, 100]}
      totalRecords={totalRecords}
      editMode="row"
      onRowEditComplete={onRowEditComplete}
      className=""
      stripedRows
      size="small"
      reorderableColumns={reorderableColumnsDynamicDataTable}
      reorderableRows={reorderableRowsDynamicDataTable}
      onRowReorder={onRowReorderDynamicDataTable}
      emptyMessage="No hay datos para mostrar"
      rowGroupMode={rowGroupMode}
      groupRowsBy={groupRowsByValue}
      sortMode={sortModeValue}
      sortField={sortFieldName}
      sortOrder={sortOrderValue}
      expandableRowGroups={expandableRowGroupsValue}
      expandedRows={expandedRows}
      onRowToggle={(e: DataTableRowToggleEvent) => {
        setExpandedRows(e.data);
      }}
      rowGroupHeaderTemplate={headerTemplateActive ?? null}
      filterDisplay={filterDisplayValue}
    >
      {reorderableRowsDynamicDataTable && (
        <Column
          className="text-right"
          headerStyle={{ width: "1%" }}
          rowReorder
        />
      )}
      {columns?.map((column) => (
        <Column
          showFilterOperator={false}
          showFilterMatchModes={false}
          showAddButton={false}
          filterMatchMode="contains"
          filterApply={filterApplyTemplate}
          filterClear={filterClearTemplate}
          key={column.field}
          field={column.field}
          header={column.header}
          filterField={column.filter ? column.field : undefined}
          filter={column.filter}
          filterPlaceholder={column.filterPlaceHolder}
          editor={
            column.editable ? getEditorByFieldType(column ?? "text") : undefined
          }
          body={
            column.body
              ? (op) => {
                  if (column.body) {
                    return column.body(op);
                  }
                }
              : undefined
          }
          className="w-8rem overflow-hidden text-overflow-ellipsis"
        />
      ))}
      {editable && <Column rowEditor headerStyle={{ width: "2%" }} />}
    </DataTable>
  );
}

export default DynamicDataTable;
