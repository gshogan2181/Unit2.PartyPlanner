const eventAPI = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT"
const events = [];
async function getEvents() {
    try{
        const response = await fetch(eventAPI+"/events");
        const data = await response.json();
        for (let index =  0 ; index < data.data.length; index++) {
            events.push(data.data[index]);
        }
        events.forEach(element => {
            createEventsElements(element);
        });
        console.log(events);
    }catch(err){
        console.log(err);
    }
};

getEvents();
render();
function render(){
}
function createEventsElements(event){
    // Create a new <article> element
    const articleElement = document.createElement("article");
    // You can set attributes and content for the <article> if needed
    articleElement.id = event.id;
    
    // Create an <h2> element
    const h2Element = document.createElement("h2");
    h2Element.textContent = `Event Name: ${event.name}`; 
    articleElement.appendChild(h2Element);
    const pDate = document.createElement("p");
    pDate.textContent = `Date :  ${new Intl.DateTimeFormat('en-US',
        { year: 'numeric', month: 'short', day: 'numeric' })
        .format(new Date(event.date))}`;
    articleElement.appendChild(pDate);
    const pLocation = document.createElement("p");
    pLocation.textContent = `Location :  ${event.location}`;
    articleElement.appendChild(pLocation);
    const pDescription = document.createElement("p");
    pDescription.textContent = `Description :  ${event.description}`;
    articleElement.appendChild(pDescription);
    const button = document.createElement("button");
    button.textContent = "Delete";
    button.addEventListener("click",async function(){
        try{
            const response = await fetch(eventAPI+"/events/"+event.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const responseData = await response.json();
            console.log('Server response:', responseData);
        } catch (error) {
            console.error('Error:', error.message);
        }
        document.getElementById(event.id).remove();
    });
    articleElement.appendChild(button);
    document.body.appendChild(articleElement);
}
// get form data
document.getElementById('myForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevents the default form submission

    // Get form data
    var formData = {};
    var formElements = this.elements;
    formData.name = formElements.fname.value;
    formData.date = new Date(formElements.fdate.value).toISOString();
    formData.location = formElements.flocation.value;
    formData.description = formElements.fdescription.value;
    // Send data to the server using fetch
    try {
        const response = await fetch(eventAPI+"/events", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log('Server response:', responseData);
    } catch (error) {
        console.error('Error:', error.message);
    }

    // Log form data to the console
    console.log(formData);
});
