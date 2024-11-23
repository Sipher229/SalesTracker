const allLinks = [
    {
        name: 'Sales',
        children: [
            {
                name: 'My Sales',
                url: 'mysales',
            },
            {
                name: 'New Sale',
                url: 'newsale',
            },

        ]
    },
    {
        name: 'Campaigns',
        children: [
            {
                name: 'Add Campaign',
                url: 'addcampaign',
            },
            {
                name: 'All Campaigns',
                url: 'allcampaigns',
            },
            
        ]
    },
    {
        name: 'Goals',
        children: [
            {
                name: 'Add Goal',
                url: 'addgoal',
            },
            {
                name: 'All Goals',
                url: 'allgoals',
            },
        ]
    },
    {
        name: 'Employees',
        children: [
            {
                name: 'Add Employee',
                url: '/layout/addemployee',
            },
            {
                name: 'My Team',
                url: '/layout/myteam',
            },
            {
                name: 'Employees',
                url: '/layout/allemployees',
            },
            
        ]
    }
]

export default allLinks