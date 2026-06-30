function renderFooter() {
    const footerDiv = document.getElementById("footer");

    if (!footerDiv) {
        console.warn("Footer element not found");
        return;
    }

    footerDiv.innerHTML = `
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-column">
                    <h4>Company</h4>
                    <p>About</p>
                    <p>Careers</p>
                    <p>Press</p>
                </div>

                <div class="footer-column">
                    <h4>Support</h4>
                    <p>Account</p>
                    <p>Help Center</p>
                    <p>Contact</p>
                </div>

                <div class="footer-column">
                    <h4>Legal</h4>
                    <p>Terms</p>
                    <p>Privacy Policy</p>
                    <p>Licensing</p>
                </div>
            </div>

            <p>© 2026 Smart Clinic Management System</p>
        </footer>
    `;
}

document.addEventListener("DOMContentLoaded", renderFooter);