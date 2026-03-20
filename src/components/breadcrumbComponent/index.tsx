import { Breadcrumb } from "antd";
import { FC } from "react";


type BreadcrumbProps = {
    items: any;
};

const BreadcrumbComponent: FC<BreadcrumbProps> = ({ items }) => {
    return (
        <Breadcrumb
            separator=""
            items={items}
        />
    );
};

export default BreadcrumbComponent;
