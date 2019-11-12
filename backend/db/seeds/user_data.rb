require 'faker'

# User.create({
#     name: 'Icicle Seafoods',
#     username: 'Icicle Seafoods',
#     password: '1234',
#     role: 'donor',
#     phoneNum: '(206) 282-0988',
#     about: Faker::Lorem.paragraph(sentence_count: 45)
# })

#Driver 1 address = 888 Harrison St, Seattle, WA 98109 - milesFrom: 1.1
#Driver 2 address = 327 19th Ave E, Seattle, WA 98112 - milesFrom: 1.7
#Driver 3 address = 501 Denny Way, Seattle, WA 98109 - milesFrom: 0.6
User.create({
    name: 'Whole Foods Market',
    username: 'Whole Foods Market',
    password: '1234',
    role: 'donor',
    phoneNum: '(206) 621-9700',
    about: Faker::Lorem.paragraph(sentence_count: 45)
})

User.create({
    name: 'Knut Knutsen',
    username: 'Knut Knutsen',
    password: '1234',
    role: 'driver',
    phoneNum: '(206) 555-5555',
    about: 'I like lamp.'
})

User.create({
    name: 'Jane Doe',
    username: 'Jane Doe',
    password: '1234',
    role: 'driver',
    phoneNum: '(206) 555-6666',
    about: 'Glory to the Sundori.'
})

#
#This line starts real Food Bank seed data
#
User.create({
    name: 'Asian Counseling and Referral Services Food Bank',
    username: 'Asian Counseling and Referral Services Food Bank',
    password: '1234',
    role: 'food bank',
    about: 'The Asian Counseling & Referral Service (A.C.R.S.) Food Bank regularly distributes foods for Asian and Pacific Islander diets.',
    phoneNum: '(206) 292-5714',
    
});
User.create({
    name: 'Ballard Food Bank',
    username: 'Ballard Food Bank',
    password: '1234',
    role: 'food bank',
    about: 'Home delivery
    Weekend Food For Kids
    Community Connector
    Mail pick-up
    Emergency Rent
    Utility and ID assistance
    Hygiene bar',
    phoneNum: '(206) 789-7800',
    
});
User.create({
    name: 'Blessed Sacrament Food Bank',
    username: 'Blessed Sacrament Food Bank',
    password: '1234',
    role: 'food bank',
    about: 'Blessed Sacrament Food Bank has served the University District for over 47 years. We also serve a four course meal each Sunday 12:00pm - 2:00pm to which all are welcome. We have a shoe bank quarterly during food bank and our Sunday meal. We distribute toiletries regularly. Through our St. Vincent de Paul Conference we serve all in need of assistance within our parish boundaries or who are registered parishioners.',
    phoneNum: '(206) 547-2885',
    
});
User.create({
    name: 'Byrd Barr Place Food Bank',
    username: 'Byrd Barr Place Food Bank',
    password: '1234',
    role: 'food bank',
    about: 'Home Delivery: For elderly and verifiably homebound individuals. In order to receive this service, you must live within 98112, 98122, or 98102. If you or someone you know would benefit from having a food bag delivered one day per week, please call (206) 812-4970 to inquire about being placed on the list.',
    phoneNum: '(206) 812-4970',
   
});
User.create({
    name: 'Cherry Street Food Bank',
    username: 'Cherry Street Food Bank',
    password: '1234',
    role: 'food bank',
    about: 'Additional Services:
    Baby Cupboard
    Mobile Food Bank',
    phoneNum: '(206) 625-0755',
    
});
User.create({
    name: 'El Centro de la Raza',
    username: 'El Centro de la Raza',
    password: '1234',
    role: 'food bank',
    about: 'We like to feed people.',
    phoneNum: '(206) 957-4609',
    
});
User.create({
    name: 'FamilyWorks - Wallingford Food Bank',
    username: 'FamilyWorks - Wallingford Food Bank',
    password: '1234',
    role: 'food bank',
    about: 'The FamilyWorks Resource Center is a warm and inviting place where families and individuals are welcomed and encouraged to participate in programs designed to support and enhance a nurturing and vibrant community. Programs include:
    Parent/Child Playgroups
    Single Parent Activities
    Teen Parent Program
    Parenting Classes
    Life Skills Development
    Individual and Family Advocacy Program
    WIC',
    phoneNum: '(206) 694-6722',
    
});
User.create({
    name: 'FamilyWorks - Greenwood Food Bank',
    username: 'FamilyWorks - Greenwood Food Bank',
    password: '1234',
    role: 'food bank',
    about: 'The Greenwood Food Bank provides weekly groceries to people in need of food. The Greenwood Food Bank is a partnership between The Salvation Army and FamilyWorks that opened on April 20th, 2016.',
    phoneNum: '(206) 694-6722',
    
});
User.create({
    name: 'Giving Room Food Bank @ Epic Life Church',
    username: 'Giving Room Food Bank @ Epic Life Church',
    password: '1234',
    role: 'food bank',
    about: 'We like to feed people.',
    phoneNum: '(206) 552-9586',
    
});
User.create({
    name: 'Immanuel Community Services',
    username: 'Immanuel Community Services',
    password: '1234',
    role: 'food bank',
    about: 'Hygiene Center available for visitors to wash clothes, take a shower and spend a few hours in a warm, safe and dry environment. The Hygiene Center is open weekdays from 8:00 am to 2:00 pm
    Recovery Program Shelter available for adult men who are working to overcome addiction to drugs and/or alcohol.
    Community Lunch available on the last Sunday of every month at noon from Jan-May & Sept-Dec, and at 11:00am from Jun-Aug',
    phoneNum: '(206) 622-1930',
    
});
User.create({
    name: 'Jewish Family Service',
    username: 'Jewish Family Service',
    password: '1234',
    role: 'food bank',
    about: 'Kosher Food - Contact contactus@jfsseattle.org
    Resource and referrals with case manager
    Cooking and nutrition classes and information
    Once-monthly visits
    Both adult and baby diapers available (first-time users must present birth certificate for each child)
    No-cook bags for clients without cooking facilities',
    phoneNum: '(206) 461-3240',
    
});
User.create({
    name: 'North Helpline - Lake City Food Bank',
    username: 'North Helpline - Lake City Food Bank',
    password: '1234',
    role: 'food bank',
    about: 'No Cook Bags
    Baby Cupboard
    Eviction and Utility Shut Off Prevention
    Hygiene Supplies
    Mail Pick-up
    Referral Services
    Medical Clinic (Saturdays: 11:00am - 1:00pm)',
    phoneNum: '(206) 367-3477',
    
});
User.create({
    name: 'North Helpline - Bitter Lake Food Bank',
    username: 'North Helpline - Bitter Lake Food Bank',
    password: '1234',
    role: 'food bank',
    about: 'Since July 1, 2017 North Helpline operates a second food bank in the Bitter Lake neighborhood. We are excited about this opportunity to better serve our neighbors in Northwest Seattle.  In September, we scaled up distribution hours, and the food bank is now open every Saturday.',
    phoneNum: '(206) 367-3477',
    
});
User.create({
    name: 'Paradise of Praise',
    username: 'Paradise of Praise',
    password: '1234',
    role: 'food bank',
    about: 'We like to feed people.',
    phoneNum: '(206) 764-1053',
    
});
User.create({
    name: 'Phinney Ridge Food Bank',
    username: 'Phinney Ridge Food Bank',
    password: '1234',
    role: 'food bank',
    about: 'Anyone in need can call (206) 784-7964 on Monday between 1:00 and 3:00 p.m. to make an appointment. The appointments allows us to customize a healthy box of food to fit the needs of their family. We are also able to serve walk-ups. The food bank stocks a variety of food and personal care products for many different needs: low-sodium offerings, baby food, ethnic foods, pet food and a variety of foods designed people who are homeless.',
    phoneNum: '(206) 784-7964',
    
});
User.create({
    name: 'Pike Market Food Bank',
    username: 'Pike Market Food Bank',
    password: '1234',
    role: 'food bank',
    about: 'Home Delivery: Serves zip codes 98101, 98104, 98121.  Home delivery is intended for people who otherwise cannot access our food bank due to physical and/or mental limitations and is by referral of a health or housing professional only.',
    phoneNum: '(206) 626-6462',
    
});
User.create({
    name: 'Providence Regina House',
    username: 'Providence Regina House',
    password: '1234',
    role: 'food bank',
    about: 'Additional Information:
    Clothing Bank
    Baby Cupboard
    Toddler Bags',
    phoneNum: '(206) 763-9204',
    
});
User.create({
    name: 'Puget Sound Labor Agency',
    username: 'Puget Sound Labor Agency',
    password: '1234',
    role: 'food bank',
    about: 'Additional Information:
    No-cook Bags for homeless clientele
    Hygiene products distribution on the first two Friday\'s of every month
    Baby and Toddler program
    Diabetes/blood pressure screening twice a year
    Cellphone distribution last two Friday\'s of October and November every year',
    phoneNum: '(206) 448-9277',
    
});
User.create({
    name: 'Queen Anne Food Bank at Sacred Heart',
    username: 'Queen Anne Food Bank at Sacred Heart',
    password: '1234',
    role: 'food bank',
    about: 'Additional Information: 
    Meal Program- Monday-Thursday 8:30am - 11:30am. No eligibility requirements.
    Pack Program- Fridays 9:00am -11:00am. No eligibility requirements. Includes lunch and no-cook items.
    Farm Fresh Market- Fridays 11:00am - 12:30pm, June - October. No eligibility requirements.',
    phoneNum: '(206) 216-4102',
    
});
User.create({
    name: 'Rainier Valley Food Bank',
    username: 'Rainier Valley Food Bank',
    password: '1234',
    role: 'food bank',
    about: 'Additional Information:
    To-go bags for individuals and families without cooking facilities, five days a week (during office hours);
    Diapers distributed four days per month - 45 diapers per child per month (first-time users must present birth certificate for each child)',
    phoneNum: '(206) 723-4105',
    
});
User.create({
    name: 'Salvation Army Food Bank',
    username: 'Salvation Army Food Bank',
    password: '1234',
    role: 'food bank',
    about: 'Additional Information:
    Baby cupboard
    Hygeine kits for those experiencing homelessness
    Pet food
    Rental assistance
    Utility assistance
    Women\'s shelter
    Community advocacy program',
    phoneNum: '(206) 442-8377',
    
});
User.create({
    name: 'Seattle Indian Center',
    username: 'Seattle Indian Center',
    password: '1234',
    role: 'food bank',
    about: 'We like to feed people.',
    phoneNum: '(206) 329-8700',
    
});
User.create({
    name: 'St. Vincent de Paul Food Bank',
    username: 'St. Vincent de Paul Food Bank',
    password: '1234',
    role: 'food bank',
    about: 'Additional Information:
    Case management by appointment through Help Line only. Help Line number: 206-767-6449
    Clothing bank and health assessments during all food distribution hours
    Free Clothing, first come first served
    Mail pick up
    Baby cupboard when supplies exist
    Free haircuts for those experiencing homelessness (Fridays)
    Community Connectors',
    phoneNum: '(206) 686-5260',
    
});
User.create({
    name: "The Food Bank @ St. Mary's",
    username: "The Food Bank @ St. Mary's",
    password: '1234',
    role: 'food bank',
    about: 'Home Delivery: Seattle residents who live within a three mile radius of the food bank may be qualified. This program is designed to serve the elderly, disabled, and sick who are unable to get to the food bank and has no one available to come to the food bank for them. One must apply and be approved to receive Home Delivery as long as there is space available. Otherwise, they are put on a waiting list. Deliveries are made Wednesdays from 9:00am-5:00pm.
    Additional Information:
    Baby Corner
    Toddler Bags
    No Cook Bags
    Hygiene program
    Mobile Food Bank',
    phoneNum: '(206) 324-7100',
    
});
User.create({
    name: 'University District Food Bank',
    username: 'University District Food Bank',
    password: '1234',
    role: 'food bank',
    about: 'We like to feed people.',
    phoneNum: '(206) 523-7060',
    
});
User.create({
    name: 'West Seattle Food Bank',
    username: 'West Seattle Food Bank',
    password: '1234',
    role: 'food bank',
    about: 'Home Delivery: Serves West Seattle area home bound and disabled.

    Additional Information:

    Bookcase Program
    Baby Corner
    Community Connector
    Weekend food for students in need in Seattle Public Schools
    Mobile Food Bank',
    phoneNum: '(206) 932-9023',
    
});
User.create({
    name: 'White Center Food Bank',
    username: 'White Center Food Bank',
    password: '1234',
    role: 'food bank',
    about: 'Area Served: Residents in the community bordered by SW Myrtle St. (to the north, in West Seattle) to 140th St. SW (to the south, in burien) between Puget Sound and HWY 509.
    
    Additional Services Offered:

    Baby Pantry
    Mobile Food Bank Program
    Home Delivery Program
    After-Hours Bags & No-Cook Bags
    Community Garden
    ',
    phoneNum: '(206) 762-2848',
    
});
User.create({
    name: 'YWCA Central Area Food Bank',
    username: 'YWCA Central Area Food Bank',
    password: '1234',
    role: 'food bank',
    phoneNum: '(206) 957-2020',
    
});
User.create({
    name: 'John Doe',
    username: 'John Doe',
    password: '1234',
    role: 'driver',
    phoneNum: '(206) 555-6777',
    about: 'Glory to the Sundori.'
})