import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, render, screen } from '@testing-library/react';
import FilterGroup from './FilterGroup';

describe('<FilterGroup />', () => {
    let container = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    })

    it("should render using the prop values", () => {
        const group = {
            title: "Test Group",
            values: [
                {
                    key: "value 1",
                    doc_count: 25
                },
                {
                    key: "value 2",
                    doc_count: 25
                }
            ],
            fieldName: "test_name"
        };

        const parameters = {
            test_name: "value 1"
        }

        act(() => {
            render(
                <FilterGroup 
                    groupObj={group} 
                    paramObj={parameters} 
                    onChange={() => null} />
                , container
            );
        })
        
        expect(screen.getByText(group.title, {exact: false}))
            .toBeInTheDocument();
    })

    it("should render as many inputs as items in props.group.values", () => {
        const group = {
            title: "Test Group",
            values: [
                {
                    key: "value 1",
                    doc_count: 25
                },
                {
                    key: "value 2",
                    doc_count: 25
                }
            ],
            fieldName: "test_name"
        };

        const parameters = {
            test_name: "value 1"
        }

        act(() => {
            render(
                <FilterGroup 
                    groupObj={group} 
                    paramObj={parameters} 
                    onChange={() => null}/>
                , container
            );
        })

        for (let val of group.values) {
            let label = `${val.key} (${val.doc_count})`;
            expect(screen.getByRole('checkbox', { name: label }))
                .toBeInTheDocument();
        }
    })

    it("should automatically check checkboxes using search parameter values",
        () => {
            const group = {
                title: "Test Group",
                values: [
                    {
                        "key": "value 1",
                        "doc_count": 25
                    },
                    {
                        "key": "value 2",
                        "doc_count": 25
                    }
                ],
                fieldName: "test_name"
            };
    
            const parameters = {
                test_name: "value 1"
            }

            const label = "value 1 (25)";
    
            act(() => {
                render(
                    <FilterGroup 
                        groupObj={group} 
                        paramObj={parameters}
                        onChange={() => null} />
                    , container
                );
            });
            
            expect(screen.getByRole('checkbox', { checked: true, name: label }))
                .toBeInTheDocument();
    })
});
