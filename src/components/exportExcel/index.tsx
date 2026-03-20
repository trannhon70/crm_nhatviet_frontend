import { FC, Fragment } from "react";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from "antd";

interface IProps {
    headers: string[],
    csvData?: any,
    fileName?: any
}

const ExportExcel: FC<IProps> = (props) => {
    const { headers, csvData, fileName } = props;
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    

    const exportToCSV = (headers: string[], csvData: any, fileName: any) => {
        const headerData = [Object.fromEntries(headers.map(header => [header, '']))];
        const ws = XLSX.utils.json_to_sheet(headerData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Fragment>
            <Button size="small" onClick={() => exportToCSV(headers, csvData, fileName)}>Excel mẫu</Button>
        </Fragment>
    );
}

export default ExportExcel;
