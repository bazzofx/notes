So i like to think about it in scenarios because I dunno my brain just works better that way and sometimes things in js runtime memory and db and prototypes can get confusing

we have a user object in the db
{ "name": "jeremy", "likesCats": true }
unless this is changed by the code these properties always return these values

## scenario 1:
user.likesCats is run by the code so it checks if user has a property called likesCats. if not it will go up the prototype chain with user.__proto__ to check that objects property, (if it did, it would keeps going until it hits the end of the chain).

## scenario 2:
we pollute the Object.prototype with:
Object.prototype.likesDogsBetter = true
Object.prototype.likesCats = false

every object is impacted by this, and also every new object that is created. They'll all have these properies as long as they're missing it on the object themselves. If the object has the property defined already, it won't be impacted. We still pollute the prototype but the objects property that was set takes priority (essentially it's checked first and because it's there we don't check the prototype)

In your first question where you ask about the hidden property, if that property exists (even if it's not returned to you), the object is won't be impactd in this case.

## secnario 3:
we already had the property likesCats on our object
If the object already has this like in the setup, then the polluted property won't override it.
const user = { name: "Alex", likesCats: true }
Object.prototype.likesCats = false

user.likesCats
// this reutns true, because the property exists or is explicityly set so the proto isn't used


scenario 4:
So specifically your question why would polluting affect the user Alex (or in my example jeremy) with likesCats: false

It's not actually added to the object when you do prototype pollution, so if you dump the object you won't see likesCats: false. It only happens when you do certain functions that check the proto if a property can't be found.
E.g.
if (user.likesCats) // uses proto
Object.hasOwn(user, 'likesCats') // doesn't check the proto

There are a bunch of different ways to do this and they basically have different behaviour. 
