const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Event listener to unhide install button
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
  });
// Resets if event isnt fired, "unhiding" the button, intill its clicked and gets set to hidden 
butInstall.addEventListener('click', async () => {
    const event = window.defferedPrompt;
    if (!event) {
      return;
    }
    event.prompt() 
    window.defferedPrompt = null;
    butInstall.classList.toggle(`hidden`, true)
  });

// Renders process null so install prompt will not refire
window.addEventListener('appinstalled', (event) => {
    window.defferedPrompt = null;
  });