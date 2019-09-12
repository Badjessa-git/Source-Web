export const leftPaneSection = [
    {
        id: 1,
        name: "Print Job Requests",
    },
    {
        id: 2,
        name: "Graphic Design Requests",
    },
    {
        id: 3,
        name: "Loan Requests",
    },
    {
        id: 4,
        name: "Resource Tracker",
    },
    {
        id: 5,
        name: "Training Videos",
    },
    {
        id: 6,
        name: "TODO Board",
    }
]

export const trelloLanes = {
    lanes: [
        {
            id: 'planning',
            title: 'TODO',
            label: '0/0',
            style: {width: 355},
            cards: [],
        },
        {
            id: 'doing',
            title: 'Doing',
            label: '0/0',
            style: {width: 355 },
            cards: [],
            disallowAddingCard: true,
        },
        {
            id: 'done',
            title: 'Done',
            label: '0/0',
            style: {width: 355 },
            cards: [],
            disallowAddingCard: true,
        }
    ]
}