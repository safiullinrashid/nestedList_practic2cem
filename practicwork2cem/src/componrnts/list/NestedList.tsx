import React, { useState } from 'react';
import './NestedList.css';

interface NestedListItem {
    id: number;
    title: string;
    isExpanded: boolean;
    isChecked: boolean;
    children: NestedListItem[];
}

const NestedList: React.FC = () => {
    const [data, setData] = useState<NestedListItem[]>([
        {
            id: 1,
            title: 'Элемент 1',
            isExpanded: false,
            isChecked: false,
            children: [
                { id: 2, title: 'Элемент 2', isExpanded: false, isChecked: false, children: [] },
                { id: 3, title: 'Элемент 3', isExpanded: false, isChecked: false, children: [] },
                {
                    id: 4,
                    title: 'Элемент 4',
                    isExpanded: false,
                    isChecked: false,
                    children: [
                        { id: 5, title: 'Элемент 5', isExpanded: false, isChecked: false, children: [] },
                        { id: 6, title: 'Элемент 6', isExpanded: false, isChecked: false, children: [] },
                        {
                            id: 7,
                            title: 'Элемент 7',
                            isExpanded: false,
                            isChecked: false,
                            children: [
                                { id: 8, title: 'Элемент 8', isExpanded: false, isChecked: false, children: [] },
                                { id: 9, title: 'Элемент 9', isExpanded: false, isChecked: false, children: [] },
                                {
                                    id: 10,
                                    title: 'Элемент 10',
                                    isExpanded: false,
                                    isChecked: false,
                                    children: [
                                        { id: 11, title: 'Элемент 11', isExpanded: false, isChecked: false, children: [] },
                                        { id: 12, title: 'Элемент 12', isExpanded: false, isChecked: false, children: [] },
                                        {
                                            id: 13,
                                            title: 'Элемент 13',
                                            isExpanded: false,
                                            isChecked: false,
                                            children: [
                                                { id: 14, title: 'Элемент 14', isExpanded: false, isChecked: false, children: [] },
                                                { id: 15, title: 'Элемент 15', isExpanded: false, isChecked: false, children: [] },
                                                {
                                                    id: 16,
                                                    title: 'Элемент 16',
                                                    isExpanded: false,
                                                    isChecked: false,
                                                    children: [
                                                        { id: 17, title: 'Элемент 17', isExpanded: false, isChecked: false, children: [] },
                                                        { id: 18, title: 'Элемент 18', isExpanded: false, isChecked: false, children: [] },
                                                        { id: 19, title: 'Элемент 19', isExpanded: false, isChecked: false, children: [] }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
    ]);

    const toggleExpand = (id: number, item: NestedListItem): NestedListItem => {
        if (item.id === id) {
            return { ...item, isExpanded: !item.isExpanded };
        } else {
            return {
                ...item,
                children: item.children.map((child) => toggleExpand(id, child)),
            };
        }
    };

    const toggleExpandRoot = (id: number) => {
        setData((prevData) =>
            prevData.map((item) => toggleExpand(id, item))
        );
    };

    const toggleCheckAllDescendants = (item: NestedListItem, checked: boolean): NestedListItem => {
        return {
            ...item,
            isChecked: checked,
            children: item.children.map((child) => toggleCheckAllDescendants(child, checked)),
        };
    };

    const toggleCheck = (id: number, checked: boolean, item: NestedListItem): NestedListItem => {
        if (item.id === id) {
            return toggleCheckAllDescendants(item, checked);
        } else {
            return {
                ...item,
                children: item.children.map((child) => toggleCheck(id, checked, child)),
            };
        }
    };

    const toggleCheckRoot = (id: number, checked: boolean) => {
        setData((prevData) =>
            prevData.map((item) => toggleCheck(id, checked, item))
        );
    };

    const renderItem = (item: NestedListItem) => (
        <div
            key={item.id}
            className={`nested-list-item ${item.isExpanded ? 'expanded' : ''}`}
        >
            <span onClick={() => toggleExpandRoot(item.id)}>
                {item.children.length > 0 ? (item.isExpanded ? '[-]' : '[+]') : ''}
            </span>
            <input
                type="checkbox"
                checked={item.isChecked}
                onChange={(e) => toggleCheckRoot(item.id, e.target.checked)}
            />
            {item.title}
            {item.isExpanded && (
                <div className="nested-list">
                    {item.children.map(renderItem)}
                </div>
            )}
        </div>
    );

    return <div className="nested-list">{data.map(renderItem)}</div>;
};

export default NestedList;










