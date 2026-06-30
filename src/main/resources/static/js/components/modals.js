function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById("modalOverlay");

    if (!modal) {
        console.error("Modal not found:", modalId);
        return;
    }

    modal.style.display = "block";
    modal.style.visibility = "visible";
    modal.style.opacity = "1";

    if (overlay) {
        overlay.style.display = "block";
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById("modalOverlay");

    if (!modal) {
        console.error("Modal not found:", modalId);
        return;
    }

    modal.style.display = "none";
    modal.style.visibility = "hidden";
    modal.style.opacity = "0";

    if (overlay) {
        overlay.style.display = "none";
    }
}

window.openModal = openModal;
window.closeModal = closeModal;

export { openModal, closeModal };