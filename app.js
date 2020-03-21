// tiger listing
const $tigerList = document.querySelector('.tiger-list')

fetch('http://localhost:3000/tigers', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${localStorage.getItem('token')}`
    }
}).then(response => response.json())
    .then(({ tigers }) => {
        // above is a way to destructure, usually you'd have response above here 
        // and then below, in this case it would be response.tigers.map...
        tigers
        .map(tigerToLi)
        .forEach(appendItemToList($tigerList))
    })

function tigerToLi(tiger){
    const $li = document.createElement('li')
    $li.textContent = tiger.name
    return $li
}

function appendItemToList($list){
    // initially this function had a dependency on $tigersList. If we wanted to require this in another
    // file or utility, it wouldn't know what $tigerList is. So to make this work we can create a closure
    return ($li) => $list.append($li)
    // this inner function above is what's going to be iteraed over by whatever enumerable/applicable being used
    // this function is now completely incapsulated
}


// user sign up
const $userSignupForm = document.querySelector('.signup')

$userSignupForm.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const user = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
    }

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        const $message = document.querySelector('.signup .message')
        $message.textContent = 'Welcome!'
    })
})


// user login
const $userLoginForm = document.querySelector('.login')

$userLoginForm.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const user = {
        username: formData.get('username'),
        password: formData.get('password')
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => response.json())
    .then(response => {
        localStorage.setItem('token', response.token)
        checkLoginStatus()

        const $message = document.querySelector('.login .message')
        $message.textContent = 'Logged In!'
    })
})

function checkLoginStatus(){
    const $loginStatus = document.querySelector('.login-status span')
    $loginStatus.textContent = localStorage.getItem("token")
    ? "Yes!"
    : "No"
}
checkLoginStatus()


// logout
const $logout = document.querySelector('.logout')
$logout.addEventListener('click', event => {
    localStorage.removeItem('token')
    checkLoginStatus()
})


// add tigers
const $tigerForm = document.querySelector('.tiger-form')
$tigerForm.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const tiger = {
        name: formData.get('name')
    }

    fetch('http://localhost:3000/tigers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(tiger)
    }).then(response => response.json())
    .then(response => {
        const $li = tigerToLi(response)
        appendItemToList($tigerList)($li)
    })
})