const users=require('./users')

// users.newUser('davewebb','fishfosh')
// console.log(users)

users.newUser('dave','fish')
let u=users.getUsers()
console.log(u)
console.log(users.findUser('dave'))
console.log(users.findUser('jane'))


