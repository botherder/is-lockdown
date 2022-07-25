# is-lockdown

is-lockdown is a small library to allow to tentatively detect whether a website viewer is running iOS with [Lockdown Mode](https://www.apple.com/newsroom/2022/07/apple-expands-commitment-to-protect-users-from-mercenary-spyware/) enabled (or at least available). The primary purpose of this library is to allow to dynamically adapt the styling of a webpage to facilitate browing for users with Lockdown Mode enabled, and therefore incentivize its use. You can find [here](https://www.sevarg.net/2022/07/20/ios16-lockdown-mode-browser-analysis/) an interesting breakdown of features changes in Lockdown Mode.

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

For example, a common issue is the unavailability of custom webfonts for Lockdown Mode users. For example, FontAwesome icons will not render correctly. An easy solution is to just hide all FontAwesome icons all together for Lockdown Mode users only:

```javascript
if (isLockdown.isLockdownEnabled()) {
    $(".fa, .fab, .far, .fas").hide();
}
````
