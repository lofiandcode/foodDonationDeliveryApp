Donor.create({
    name: 'Icicle Seafoods',
    about: 'I like fish.',
    address: '4019 21st Ave W, Seattle, WA 98199',
    phoneNum: '(206) 282-0988',
    donations: [{
        type: 'Bread',
        quantity: 18,
        units: 'loaves'
    }, {
        type: 'Potatoes',
        quantity: 100,
        units: 'lbs'
    }],
    accommodations: 'none',
    hours: { 
        monday: {
            available: true,
            start: 800,
            end: 1700
        },
        tuesday: {
            available: true,
            start: 800,
            end: 1700
        },
        wednesday: {
            available: true,
            start: 800,
            end: 1700
        },
        thursday: {
            available: true,
            start: 800,
            end: 1700
        },
        friday: {
            available: true,
            start: 800,
            end: 1700
        },
        saturday: {
            available: false,
            start: 0,
            end: 0
        },
        sunday: {
            available: false,
            start: 0,
            end: 0
        }
    }
    
})