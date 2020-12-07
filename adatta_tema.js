matcher = window.matchMedia('(prefers-color-scheme: dark)');

const lightIcon = document.querySelector('link#light-icon');
const darkIcon = document.querySelector('link#dark-icon');

function onUpdate() {
    if (matcher.matches) {
        lightIcon.remove();
        document.head.append(darkIcon);
    } else {
        document.head.append(lightIcon);
        darkIcon.remove();
    }
}

matcher.addListener(onUpdate);
onUpdate();