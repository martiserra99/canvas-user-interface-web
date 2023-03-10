---
nav: Events
title: Events
---

To create the events that the element type has to respond to, you have to use the `.events.set(name, func)` method of the element type, like so:

```javascript
elementType.events.set("clickOutside", function (element, signal, state) {
  // Code
})
```

The first argument is the name of the event, and the second argument is a function that will be used to check whether the event was triggered or not.

This function will be called every time that the `.signal(signal)` method of the element is called and it has three parameters. The first one is the element itself and the second one is the object that was passed in the `.signal(signal)` method. The third parameter will be explained later.

The function needs to return an object with these properties:

- **event**: It is a boolean that defines about whether the event was triggered or not. If it is `true` it means it was and if it is false it means it wasn't.
- **data**: It may be used when `event` is `true`, and it defines data about the event.

The following code shows how to create an event that is triggered when we click outside the element:

```javascript
elementType.events.set("clickOutside", function (element, signal, state) {
  if (signal.type === "mousedown") {
    const coords = signal.data
    if (outRectangle(coords, element.coords, element.size))
      return { event: true, data: coords }
    else return { event: false }
  }
  return { event: false }
})

const outRectangle = function (coords, rectangleCoords, rectangleSize) {
  return (
    (coords.x < rectangleCoords.x) |
    (coords.y < rectangleCoords.y) |
    (coords.x > rectangleCoords.x + rectangleSize.width) |
    (coords.y > rectangleCoords.y + rectangleSize.height)
  )
}
```

When creating an event, it may be needed to store some data for later use. To do that, we can use the `state` parameter. This parameter is used to store some data about the state of the element in relation to the event. It has these methods:

- **set(key, value)**: To set a key with a value.
- **get(key, value)**: To get the value of a key (second argument if not exists).
- **del(key)**: To delete a key.
- **has(key)**: To check whether the key exists or not.

The following code shows how to use the `state` parameter to create an event that is triggered when the same key is pressed twice:

```javascript
elementType.events.set("keyPressedTwice", function (element, signal, state) {
  if (signal.type === "keydown") {
    const key = signal.data
    const lastKey = state.get("lastKey", null)
    if (key === lastKey) {
      state.del("lastKey")
      return { event: true, data: key }
    }
    if (lastKey === null) state.set("lastKey", key)
    else state.del("lastKey")
  }
  return { event: false }
})
```
