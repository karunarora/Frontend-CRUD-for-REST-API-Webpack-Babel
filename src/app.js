import{ http } from './http';
import{ ui } from './ui'

//Get post on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//listen for add post
document.querySelector('.post-submit').addEventListener('click',submitPost);

//listen for delete
document.querySelector('#post').addEventListener('click', deletePost);

//listen for edit state
document.querySelector('#post').addEventListener('click', enableEdit);

//listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

//get post
function getPosts(){
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err=>console.log(err));
}

//add post
function submitPost(){
    const title = document.querySelector('#title').value,
            body = document.querySelector('#body').value,
            id = document.querySelector('#id').value;

            //validate input
            if(title === '' || body === ''){
                ui.showAlert('Please fill in all fields', 'alert alert-danger')
            }else{
                const data = {
                    title,
                    body
                }
                //check for id
                if(id === ''){
                    //create post
                    //create post
                http.post('http://localhost:3000/posts', data)
                .then(data => {
                    ui.showAlert('Post added', 'alert alert-success');
                    ui.clearFields();
                    getPosts();
                })
                .catch(err => console.log(err));

                }else{
                    //put request(update post)
                http.put(`http://localhost:3000/posts/${id}`, data)
                .then(data => {
                    ui.showAlert('Post Updated', 'alert alert-success');
                    ui.changeFormState('add')
                    getPosts();
                })
                .catch(err => console.log(err));
                }
                
            
                
            }

    
}

//delete post
function deletePost(e){

    
    e.preventDefault();

    if(e.target.parentElement.classList.contains('delete')){
        const id = e.target.parentElement.dataset.id;
        if(confirm('Are you sure?')){
            http.delete(`http://localhost:3000/posts/${id}`)
            .then(data=>{
                ui.showAlert('Post Removed', 'alert alert-success');
                getPosts();
            })
            .catch(err => console.log(err));
        }
    }

}

//enable edit state

function enableEdit(e){

    if(e.target.parentElement.classList.contains('edit')){
       const id = e.target.parentElement.dataset.id;

       const body = e.target.parentElement.previousElementSibling.textContent;
       const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
       
       const data = {
           id,
           title,
           body
       }

       //fill the form with current post
       ui.fillForm(data);
       
    }
    e.preventDefault();
}

//cancel edit state
function cancelEdit(e){
    if(e.target.classList.contains('post-cancel')){
        ui.changeFormState('add');
    }
    e.preventDefault();
}