# is-lockdown

is-lockdown is a small library to allow to tentatively detect whether a website viewer is running iOS with Lockdown Mode enabled (or at least available). The primary purpose of this library is to allow to dynamically adapt the styling of a webpage to facilitate browing for users with Lockdown Mode enabled, and therefore incentivize its use.

## Install

In order to install, download the `is-lockdown.js` file and place it at a directory of your choice in your web root. Then simply import the script withing a script tag:

```html
<script src="/js/is-lockdown.js" type="text/javascript"></script>
```

## How to use

Using is-lockdown is as simple as:

```javascript
if (isLockdown.isLockdownEnabled()) {
	// Here goes your code to adapt the website rendering.
	// ...
}
```
