 const apiUrl = "https://jsonplaceholder.typicode.com/todos";

const getTodos = () => {
    fetch(apiUrl+"?_limit=5")
    .then((res) => res.json())
    .then((data) => {
     data.forEach(element => {
        AddToDoToDom(element)

     })
})
}

function AddToDoToDom(element){
    const div = document.createElement("div")
        div.appendChild(document.createTextNode(element.title))
        div.classList.add("todo")
        div.setAttribute("data-id",element.id)
        document.querySelector("#todo-list").appendChild(div)

        if(element.completed){
            div.classList.add("done");
        }

}
 const createTodo = (e) => {
    e.preventDefault();
    const newTodo = {
        title: e.target.firstElementChild.value ,
        completed: false
    }
    fetch(apiUrl,{
        method:"POST",
        body:JSON.stringify(newTodo),
        headers: {
            'Content-type':"application/json"
        }
    }).then((res) => res.json())
      .then((data) => AddToDoToDom(data))
      
 }

const toggleCompleted = (e) => {
if(e.target.classList.contains("todo")){
    e.target.classList.toggle("done");
    updateTodo(e.target.dataset.id,e.target.classList.contains("done"))
}
   
}
const updateTodo = (id,completed) => {
    fetch(`${apiUrl}/${id}`,{
    method: "PUT",
    body:JSON.stringify({completed}),
    headers:{
        'Content-Type':"application/json"
    }
}).then((res) => res.json())
.then((data) => console.log(data))
}
getTodos();
document.querySelector("#todo-form").addEventListener("submit", createTodo)
document.querySelector("#todo-list").addEventListener("click", toggleCompleted)