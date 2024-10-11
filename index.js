require('dotenv').config();
const axios = require('axios');

async function getOrganizations(){
    try{
        const organizations = await axios.get(`https://www.eventbriteapi.com/v3/users/me/organizations`,{
            headers:{
                'Authorization': `Bearer ${process.env.API_KEY}`
            }

        })
        return organizations.data;
    }catch(error){
        console.log('error', error);
    } 
}

async function createEvent(organizationId, eventName, startDate, endDate, currency){
    try{
        const event = await axios.post(`https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/`,{
        event:{
            name:{
                html:eventName
            },
            start:{
                'timezone':'Europe/London',
                'utc':startDate
            },
            end:{
                'timezone':'Europe/London',
                'utc':endDate
            },
            currency
        }
    }, {
        headers:{
            'Authorization': `Bearer ${process.env.API_KEY}`
        }
    });
        return event.data;
    }catch(error){
        console.log('error', error);
    }
}

(async () => {
    const organizations = await getOrganizations();
    // console.log(organizations)
    const eventCreated = await createEvent(organizations.organizations[0].id, 'Coding with Amy', new Date(new Date().getTime()+15*60000).toISOString().replace(/\.\d{3}/,''), new Date(new Date().getTime()+30*60000).toISOString().replace(/\.\d{3}/,''), 'GBP');
    console.log(eventCreated);
})();

